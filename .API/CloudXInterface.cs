// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.CloudXInterface
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using BaseX;
using CodeX;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace CloudX.Shared
{
  public class CloudXInterface
  {
    public static int DEFAULT_RETRIES = 5;
    public static int UPLOAD_DEGREE_OF_PARALLELISM = 16;
    public static bool DEBUG_UPLOAD = false;
    private static readonly HttpMethod PATCH_METHOD = new HttpMethod("PATCH");
    public static float[] storageUpdateDelays = new float[4]
    {
      1f,
      5f,
      15f,
      30f
    };
    private static readonly MediaTypeHeaderValue JSON_MEDIA_TYPE = new MediaTypeHeaderValue("application/json")
    {
      CharSet = "utf-8"
    };
    protected object lockobj = new object();
    private List<Membership> _groupMemberships = new List<Membership>();
    private Dictionary<string, Member> _groupMemberInfos = new Dictionary<string, Member>();
    private Dictionary<string, Group> _groups = new Dictionary<string, Group>();
    public Dictionary<System.Type, Dictionary<Uri, CloudResult>> cachedRecords = new Dictionary<System.Type, Dictionary<Uri, CloudResult>>();
    public const int SESSION_EXTEND_INTERVAL = 3600;
    public static Action<string> ProfilerBeginSampleCallback;
    public static Action ProfilerEndSampleCallback;
    public static Func<MemoryStream> MemoryStreamAllocator;
    public static bool USE_CDN;
    private const string CLOUDX_PRODUCTION_NEOS_API = "https://cloudx.azurewebsites.net";
    private const string CLOUDX_STAGING_NEOS_API = "https://cloudx-staging.azurewebsites.net";
    private const string CLOUDX_NEOS_BLOB = "https://cloudxstorage.blob.core.windows.net/";
    private const string CLOUDX_NEOS_CDN = "https://cloudx.azureedge.net/";
    private const string LOCAL_NEOS_API = "http://localhost:60612";
    private const string LOCAL_NEOS_BLOB = "http://127.0.0.1:10000/devstoreaccount1/";
    private UserSession _currentSession;
    private User _currentUser;
    private RSACryptoServiceProvider _cryptoProvider;
    private AuthenticationHeaderValue _currentAuthenticationHeader;
    private DateTime _lastSessionUpdate;
    private DateTime _lastServerStatsUpdate;

    [Conditional("PROFILE")]
    private void ProfilerBeginSample(string name)
    {
      Action<string> beginSampleCallback = CloudXInterface.ProfilerBeginSampleCallback;
      if (beginSampleCallback == null)
        return;
      beginSampleCallback(name);
    }

    [Conditional("PROFILE")]
    private void ProfilerEndSample()
    {
      Action endSampleCallback = CloudXInterface.ProfilerEndSampleCallback;
      if (endSampleCallback == null)
        return;
      endSampleCallback();
    }

    public static CloudXInterface.CloudEndpoint CLOUD_ENDPOINT { get; set; } = CloudXInterface.CloudEndpoint.Production;

    public static string NEOS_API
    {
      get
      {
        switch (CloudXInterface.CLOUD_ENDPOINT)
        {
          case CloudXInterface.CloudEndpoint.Production:
            return "https://cloudx.azurewebsites.net";
          case CloudXInterface.CloudEndpoint.Staging:
            return "https://cloudx-staging.azurewebsites.net";
          case CloudXInterface.CloudEndpoint.Local:
            return "http://localhost:60612";
          default:
            throw new Exception("Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.ToString());
        }
      }
    }

    public static string NEOS_BLOB
    {
      get
      {
        switch (CloudXInterface.CLOUD_ENDPOINT)
        {
          case CloudXInterface.CloudEndpoint.Production:
          case CloudXInterface.CloudEndpoint.Staging:
            return CloudXInterface.NEOS_CLOUD_BLOB;
          case CloudXInterface.CloudEndpoint.Local:
            return CloudXInterface.NEOS_CLOUD_BLOB;
          default:
            throw new Exception("Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.ToString());
        }
      }
    }

    public static string NEOS_ASSETS
    {
      get
      {
        return CloudXInterface.NEOS_BLOB + "assets/";
      }
    }

    public static string NEOS_ASSETS_CDN
    {
      get
      {
        return "https://cloudx.azureedge.net/assets/";
      }
    }

    public static string NEOS_ASSETS_BLOB
    {
      get
      {
        return "https://cloudxstorage.blob.core.windows.net/assets/";
      }
    }

    public static string NEOS_THUMBNAILS
    {
      get
      {
        return "https://cloudxstorage.blob.core.windows.net/thumbnails/";
      }
    }

    public static string NEOS_INSTALL
    {
      get
      {
        return "https://cloudx.azureedge.net/install/";
      }
    }

    public static string NEOS_CLOUD_BLOB
    {
      get
      {
        return !CloudXInterface.USE_CDN ? "https://cloudxstorage.blob.core.windows.net/" : "https://cloudx.azureedge.net/";
      }
    }

    public HttpClient HttpClient { get; private set; }

    public RSAParameters PublicKey { get; private set; }

    public ServerStatus ServerStatus
    {
      get
      {
        if ((DateTime.UtcNow - this.LastServerStateFetch).TotalSeconds >= 60.0)
          return ServerStatus.NoInternet;
        if ((DateTime.UtcNow - this.LastServerUpdate).TotalSeconds >= 60.0)
          return ServerStatus.Down;
        return this.ServerResponseTime > 250L ? ServerStatus.Slow : ServerStatus.Good;
      }
    }

    public long ServerResponseTime { get; private set; }

    public DateTime LastServerUpdate { get; private set; }

    public DateTime LastServerStateFetch { get; private set; }

    public User CurrentUser
    {
      get
      {
        return this._currentUser;
      }
      set
      {
        if (value == this._currentUser)
          return;
        this._currentUser = value;
        Action<User> userUpdated = this.UserUpdated;
        if (userUpdated == null)
          return;
        userUpdated(this._currentUser);
      }
    }

    public UserSession CurrentSession
    {
      get
      {
        return this._currentSession;
      }
      private set
      {
        if (value == this._currentSession)
          return;
        lock (this.lockobj)
        {
          if (this._currentSession?.SessionToken != value?.SessionToken)
            this._lastSessionUpdate = DateTime.UtcNow;
          this._currentSession = value;
          this._currentAuthenticationHeader = value != null ? new AuthenticationHeaderValue("neos", value.UserId + ":" + value.SessionToken) : (AuthenticationHeaderValue) null;
          this.OnSessionUpdated();
          try
          {
            Action<UserSession> sessionChanged = this.SessionChanged;
            if (sessionChanged == null)
              return;
            sessionChanged(this._currentSession);
          }
          catch (Exception ex)
          {
            UniLog.Error(string.Format("Exception in SessionChanged. CurrentSession: {0}.\n", (object) this.CurrentSession) + ex?.ToString(), true);
          }
        }
      }
    }

    public IEnumerable<Membership> CurrentUserMemberships
    {
      get
      {
        return (IEnumerable<Membership>) this._groupMemberships;
      }
    }

    public IEnumerable<Group> CurrentUserGroupInfos
    {
      get
      {
        return this._groups.Select<KeyValuePair<string, Group>, Group>((Func<KeyValuePair<string, Group>, Group>) (p => p.Value));
      }
    }

    public IEnumerable<Member> CurrentUserMemberInfos
    {
      get
      {
        return this._groupMemberInfos.Select<KeyValuePair<string, Member>, Member>((Func<KeyValuePair<string, Member>, Member>) (p => p.Value));
      }
    }

    public Group TryGetCurrentUserGroupInfo(string groupId)
    {
      Group group;
      this._groups.TryGetValue(groupId, out group);
      return group;
    }

    public Member TryGetCurrentUserGroupMemberInfo(string groupId)
    {
      Member member;
      this._groupMemberInfos.TryGetValue(groupId, out member);
      return member;
    }

    public bool IsCurrentUserMemberOfGroup(string groupId)
    {
      return this.TryGetCurrentUserGroupMemberInfo(groupId) != null;
    }

    public Membership TryGetCurrentUserGroupMembership(string groupId)
    {
      return this._groupMemberships.FirstOrDefault<Membership>((Func<Membership, bool>) (m => m.GroupId == groupId));
    }

    public event Action<UserSession> SessionChanged;

    public event Action<User> UserUpdated;

    public event Action<IEnumerable<Membership>> MembershipsUpdated;

    public event Action<Group> GroupUpdated;

    public event Action<Member> GroupMemberUpdated;

    protected virtual void OnLogin()
    {
    }

    protected virtual void OnLogout()
    {
    }

    protected virtual void OnSessionUpdated()
    {
    }

    public FriendManager Friends { get; private set; }

    public MessageManager Messages { get; private set; }

    public TransactionManager Transactions { get; private set; }

    public CloudXInterface()
    {
      this.HttpClient = new HttpClient();
      this.HttpClient.Timeout = Timeout.InfiniteTimeSpan;
      this.Friends = new FriendManager(this);
      this.Messages = new MessageManager(this);
      this.Transactions = new TransactionManager(this);
    }

    public virtual void Update()
    {
      lock (this.lockobj)
      {
        if (this.CurrentSession != null)
        {
          if ((DateTime.UtcNow - this._lastSessionUpdate).TotalSeconds >= 3600.0)
          {
            Task.Run<CloudResult>(new Func<Task<CloudResult>>(this.ExtendSession));
            this._lastSessionUpdate = DateTime.UtcNow;
          }
        }
      }
      if ((DateTime.UtcNow - this._lastServerStatsUpdate).TotalSeconds >= 10.0)
      {
        Task.Run((Func<Task>) (async () =>
        {
          CloudResult<ServerStatistics> cloudResult = await this.GetServerStatistics().ConfigureAwait(false);
          if (cloudResult.IsOK)
          {
            this.ServerResponseTime = cloudResult.Entity.ResponseTimeMilliseconds;
            this.LastServerUpdate = cloudResult.Entity.LastUpdate;
          }
          this.LastServerStateFetch = DateTime.UtcNow;
        }));
        this._lastServerStatsUpdate = DateTime.UtcNow;
      }
      this.Friends.Update();
      this.Messages.Update();
    }

    public bool HasPotentialAccess(string ownerId)
    {
      switch (IdUtil.GetOwnerType(ownerId))
      {
        case OwnerType.Machine:
          return true;
        case OwnerType.User:
          return ownerId == this.CurrentUser.Id;
        case OwnerType.Group:
          lock (this.lockobj)
            return this.CurrentUserMemberships.Any<Membership>((Func<Membership, bool>) (m => m.GroupId == ownerId));
        default:
          return false;
      }
    }

    private void SetMemberships(IEnumerable<Membership> memberships)
    {
      lock (this.lockobj)
      {
        this._groupMemberships.Clear();
        this._groupMemberships.AddRange(memberships);
        this.RunMembershipsUpdated();
      }
    }

    private void ClearMemberships()
    {
      lock (this.lockobj)
      {
        if (this._groupMemberships.Count == 0)
          return;
        this._groupMemberships.Clear();
        this.RunMembershipsUpdated();
      }
    }

    private void AddMembership(Membership membership)
    {
      lock (this.lockobj)
      {
        this._groupMemberships.Add(membership);
        this.RunMembershipsUpdated();
      }
    }

    private async Task RunMembershipsUpdated()
    {
      foreach (Membership groupMembership in this._groupMemberships)
        await this.UpdateGroupInfo(groupMembership.GroupId);
      Action<IEnumerable<Membership>> membershipsUpdated = this.MembershipsUpdated;
      if (membershipsUpdated == null)
        return;
      membershipsUpdated((IEnumerable<Membership>) this._groupMemberships);
    }

    public static Uri NeosDBToHttp(Uri neosdb, bool forceCDN = false, bool forceCloudBlob = false)
    {
      string str1 = CloudXInterface.NeosDBSignature(neosdb);
      string str2 = CloudXInterface.NeosDBQuery(neosdb);
      string str3 = str1;
      if (str2 != null)
        str3 = str3 + "/" + str2;
      if (CloudXInterface.IsLegacyNeosDB(neosdb))
        return new Uri("https://neoscloud.blob.core.windows.net/assets/" + str3);
      return new Uri((forceCDN ? CloudXInterface.NEOS_ASSETS_CDN : (forceCloudBlob ? "https://cloudxstorage.blob.core.windows.net/" : CloudXInterface.NEOS_ASSETS)) + str3);
    }

    public static Uri FilterNeosURL(Uri assetURL)
    {
      if (assetURL.Scheme == "neosdb" && assetURL.Segments.Length >= 2 && assetURL.Segments[1].Contains("."))
        assetURL = new Uri("neosdb:///" + Path.GetFileNameWithoutExtension(assetURL.Segments[1]) + assetURL.Query);
      return assetURL;
    }

    public static string NeosDBFilename(Uri neosdb)
    {
      return neosdb.Segments[1] + neosdb.Query;
    }

    public static string NeosDBSignature(Uri neosdb)
    {
      return Path.GetFileNameWithoutExtension(neosdb.Segments[1]);
    }

    public static string NeosDBQuery(Uri neosdb)
    {
      if (string.IsNullOrWhiteSpace(neosdb.Query))
        return (string) null;
      return neosdb.Query.Substring(1);
    }

    public static Uri NeosThumbnailIdToHttp(string id)
    {
      return new Uri(CloudXInterface.NEOS_THUMBNAILS + id);
    }

    public static Uri TryFromString(string url)
    {
      if (url == null)
        return (Uri) null;
      if (Uri.IsWellFormedUriString(url, UriKind.Absolute))
        return new Uri(url);
      return (Uri) null;
    }

    public static bool IsLegacyNeosDB(Uri uri)
    {
      if (uri.Scheme != "neosdb")
        return false;
      return Path.GetFileNameWithoutExtension(uri.Segments[1]).Length < 30;
    }

    public Task<CloudResult<T>> GET<T>(string resource, TimeSpan? timeout = null) where T : class, new()
    {
      return this.RunRequest<T>((Func<HttpRequestMessage>) (() => this.CreateRequest(resource, HttpMethod.Get)), timeout);
    }

    public Task<CloudResult<T>> POST<T>(
      string resource,
      object entity,
      TimeSpan? timeout = null)
      where T : class, new()
    {
      return this.RunRequest<T>((Func<HttpRequestMessage>) (() =>
      {
        HttpRequestMessage request = this.CreateRequest(resource, HttpMethod.Post);
        this.AddBody(request, entity);
        return request;
      }), timeout);
    }

    public Task<CloudResult<T>> POST_File<T>(
      string resource,
      string filePath,
      string fileMIME = null,
      IProgressIndicator progressIndicator = null)
      where T : class, new()
    {
      return this.RunRequest<T>((Func<HttpRequestMessage>) (() =>
      {
        HttpRequestMessage request = this.CreateRequest(resource, HttpMethod.Post);
        this.AddFileToRequest(request, filePath, fileMIME, progressIndicator);
        return request;
      }), new TimeSpan?(TimeSpan.FromMinutes(60.0)));
    }

    public Task<CloudResult<T>> PUT<T>(
      string resource,
      object entity,
      TimeSpan? timeout = null)
      where T : class, new()
    {
      return this.RunRequest<T>((Func<HttpRequestMessage>) (() =>
      {
        HttpRequestMessage request = this.CreateRequest(resource, HttpMethod.Put);
        this.AddBody(request, entity);
        return request;
      }), timeout);
    }

    public Task<CloudResult<T>> PATCH<T>(
      string resource,
      object entity,
      TimeSpan? timeout = null)
      where T : class, new()
    {
      return this.RunRequest<T>((Func<HttpRequestMessage>) (() =>
      {
        HttpRequestMessage request = this.CreateRequest(resource, CloudXInterface.PATCH_METHOD);
        this.AddBody(request, entity);
        return request;
      }), timeout);
    }

    public Task<CloudResult<T>> DELETE<T>(string resource, TimeSpan? timeout = null) where T : class, new()
    {
      return this.RunRequest<T>((Func<HttpRequestMessage>) (() => this.CreateRequest(resource, HttpMethod.Delete)), timeout);
    }

    public Task<CloudResult> GET(string resource, TimeSpan? timeout = null)
    {
      return this.RunRequest((Func<HttpRequestMessage>) (() => this.CreateRequest(resource, HttpMethod.Get)), timeout);
    }

    public Task<CloudResult> POST(string resource, object entity, TimeSpan? timeout = null)
    {
      return this.RunRequest((Func<HttpRequestMessage>) (() =>
      {
        HttpRequestMessage request = this.CreateRequest(resource, HttpMethod.Post);
        this.AddBody(request, entity);
        return request;
      }), timeout);
    }

    public Task<CloudResult> POST_File(
      string resource,
      string filePath,
      string fileMIME = null,
      IProgressIndicator progressIndicator = null)
    {
      return this.RunRequest((Func<HttpRequestMessage>) (() =>
      {
        HttpRequestMessage request = this.CreateRequest(resource, HttpMethod.Post);
        this.AddFileToRequest(request, filePath, fileMIME, progressIndicator);
        return request;
      }), new TimeSpan?(TimeSpan.FromMinutes(60.0)));
    }

    public Task<CloudResult> PUT(string resource, object entity, TimeSpan? timeout = null)
    {
      return this.RunRequest((Func<HttpRequestMessage>) (() =>
      {
        HttpRequestMessage request = this.CreateRequest(resource, HttpMethod.Put);
        this.AddBody(request, entity);
        return request;
      }), timeout);
    }

    public Task<CloudResult> PATCH(
      string resource,
      object entity,
      TimeSpan? timeout = null)
    {
      return this.RunRequest((Func<HttpRequestMessage>) (() =>
      {
        HttpRequestMessage request = this.CreateRequest(resource, CloudXInterface.PATCH_METHOD);
        this.AddBody(request, entity);
        return request;
      }), timeout);
    }

    public Task<CloudResult> DELETE(string resource, TimeSpan? timeout = null)
    {
      return this.RunRequest((Func<HttpRequestMessage>) (() => this.CreateRequest(resource, HttpMethod.Delete)), timeout);
    }

    private void AddFileToRequest(
      HttpRequestMessage request,
      string filePath,
      string mime = null,
      IProgressIndicator progressIndicator = null)
    {
      FileStream fileStream = System.IO.File.OpenRead(filePath);
      StreamProgressWrapper streamProgressWrapper = new StreamProgressWrapper((Stream) fileStream, progressIndicator, (Action<Stream, IProgressIndicator>) null, new long?());
      MultipartFormDataContent multipartFormDataContent = new MultipartFormDataContent();
      StreamContent streamContent = new StreamContent((Stream) streamProgressWrapper, 32768);
      if (mime != null)
        streamContent.Headers.ContentType = MediaTypeHeaderValue.Parse(mime);
      streamContent.Headers.ContentLength = new long?(fileStream.Length);
      multipartFormDataContent.Add((HttpContent) streamContent, "file", Path.GetFileName(filePath));
      request.Content = (HttpContent) multipartFormDataContent;
    }

    private HttpRequestMessage CreateRequest(string resource, HttpMethod method)
    {
      HttpRequestMessage httpRequestMessage = new HttpRequestMessage(method, CloudXInterface.NEOS_API + "/" + resource);
      if (this.CurrentSession != null)
        httpRequestMessage.Headers.Authorization = this._currentAuthenticationHeader;
      return httpRequestMessage;
    }

    private void AddBody(HttpRequestMessage message, object entity)
    {
      Func<MemoryStream> memoryStreamAllocator = CloudXInterface.MemoryStreamAllocator;
      MemoryStream memoryStream = (memoryStreamAllocator != null ? memoryStreamAllocator() : (MemoryStream) null) ?? new MemoryStream();
      using (Utf8JsonWriter utf8JsonWriter = new Utf8JsonWriter((Stream) memoryStream, new JsonWriterOptions()))
      {
        Utf8JsonWriter writer = utf8JsonWriter;
        object obj = entity;
        System.Type inputType = entity?.GetType();
        if ((object) inputType == null)
          inputType = typeof (object);
        System.Text.Json.JsonSerializer.Serialize(writer, obj, inputType, (JsonSerializerOptions) null);
      }
      memoryStream.Seek(0L, SeekOrigin.Begin);
      StreamContent streamContent = new StreamContent((Stream) memoryStream);
      streamContent.Headers.ContentType = CloudXInterface.JSON_MEDIA_TYPE;
      message.Content = (HttpContent) streamContent;
    }

    private async Task<CloudResult> RunRequest(
      Func<HttpRequestMessage> requestSource,
      TimeSpan? timeout)
    {
      return (CloudResult) await this.RunRequest<string>(requestSource, timeout).ConfigureAwait(false);
    }

    private async Task<CloudResult<T>> RunRequest<T>(
      Func<HttpRequestMessage> requestSource,
      TimeSpan? timeout)
      where T : class
    {
      HttpRequestMessage request = (HttpRequestMessage) null;
      HttpResponseMessage result = (HttpResponseMessage) null;
      Exception exception = (Exception) null;
      int remainingRetries = CloudXInterface.DEFAULT_RETRIES;
      int delay = 0;
      do
      {
        try
        {
          request = requestSource();
          CancellationTokenSource cancellationTokenSource = new CancellationTokenSource(timeout ?? TimeSpan.FromSeconds(30.0));
          result = await this.HttpClient.SendAsync(request, cancellationTokenSource.Token).ConfigureAwait(false);
        }
        catch (Exception ex)
        {
          exception = ex;
        }
        if (result == null)
        {
          UniLog.Log(string.Format("Exception running {0} request to {1}. Remaining retries: {2}.\n", (object) request.Method, (object) request.RequestUri, (object) remainingRetries) + exception?.ToString(), false);
          request.Dispose();
          request = (HttpRequestMessage) null;
          await Task.Delay(delay).ConfigureAwait(false);
          delay += 250;
        }
      }
      while (result == null && remainingRetries-- > 0);
      if (result == null)
      {
        if (exception == null)
          throw new Exception("Failed to get response. Exception is null");
        throw exception;
      }
      T entity = default (T);
      string content = (string) null;
      if (result.IsSuccessStatusCode)
      {
        if (typeof (T) == typeof (string))
        {
          content = await result.Content.ReadAsStringAsync().ConfigureAwait(false);
          entity = content as T;
        }
        else
        {
          try
          {
            long? contentLength = result.Content.Headers.ContentLength;
            long num = 0;
            if (contentLength.GetValueOrDefault() > num & contentLength.HasValue)
            {
              using (Stream responseStream = await result.Content.ReadAsStreamAsync().ConfigureAwait(false))
                entity = await System.Text.Json.JsonSerializer.DeserializeAsync<T>(responseStream, (JsonSerializerOptions) null, new CancellationToken()).ConfigureAwait(false);
            }
          }
          catch (Exception ex)
          {
            UniLog.Log(string.Format("Exception deserializing {0} response from {1}:{2}\nException:\n", (object) typeof (T), (object) request.Method, (object) request.RequestUri) + ex?.ToString(), false);
          }
          finally
          {
          }
        }
      }
      else
        content = await result.Content.ReadAsStringAsync();
      CloudResult<T> cloudResult = new CloudResult<T>(entity, result.StatusCode, content);
      result.Dispose();
      request.Dispose();
      return cloudResult;
    }

    public async Task<CloudResult<UserSession>> Login(
      string credential,
      string password,
      string sessionToken,
      string secretMachineId,
      bool rememberMe,
      string recoverCode)
    {
      CloudXInterface cloudXinterface = this;
      cloudXinterface.Logout(false);
      LoginCredentials credentials = new LoginCredentials();
      credentials.Password = password;
      credentials.RecoverCode = recoverCode;
      credentials.SessionToken = sessionToken;
      credentials.SecretMachineId = secretMachineId;
      credentials.RememberMe = rememberMe;
      if (credential.StartsWith("U-"))
        credentials.OwnerId = credential;
      else if (credential.Contains("@"))
        credentials.Email = credential;
      else
        credentials.Username = credential;
      Task<CloudXInterface.CryptoData> cryptoProviderTask = Task.Run<CloudXInterface.CryptoData>((Func<CloudXInterface.CryptoData>) (() =>
      {
        RSACryptoServiceProvider provider = new RSACryptoServiceProvider(2048);
        return new CloudXInterface.CryptoData(provider, provider.ExportParameters(false));
      }));
      CloudResult<UserSession> result = await cloudXinterface.POST<UserSession>("api/userSessions", (object) credentials, new TimeSpan?());
      if (result.IsOK)
      {
        CloudXInterface.CryptoData cryptoData = await cryptoProviderTask.ConfigureAwait(false);
        cloudXinterface._cryptoProvider = cryptoData.provider;
        cloudXinterface.PublicKey = cryptoData.parameters;
        cloudXinterface.CurrentSession = result.Entity;
        cloudXinterface.CurrentUser = new User()
        {
          Id = cloudXinterface.CurrentSession.UserId,
          Email = credentials.Email,
          Username = credentials.Username
        };
        cloudXinterface.UpdateCurrentUserInfo();
        cloudXinterface.UpdateCurrentUserMemberships();
        cloudXinterface.Friends.Update();
        cloudXinterface.OnLogin();
      }
      else
        UniLog.Warning("Error logging in: " + result.State.ToString() + "\n" + result.Content, false);
      return result;
    }

    public async Task<CloudResult> ExtendSession()
    {
      return await this.PATCH("api/userSessions", (object) null, new TimeSpan?());
    }

    public async Task<CloudResult<User>> Register(
      string username,
      string email,
      string password)
    {
      this.Logout(false);
      return await this.POST<User>("/api/users", (object) new User()
      {
        Username = username,
        Email = email,
        Password = password
      }, new TimeSpan?());
    }

    public async Task<CloudResult> RequestRecoveryCode(string email)
    {
      return await this.POST("/api/users/requestlostpassword", (object) new User()
      {
        Email = email
      }, new TimeSpan?());
    }

    public async Task<CloudResult<User>> UpdateCurrentUserInfo()
    {
      switch (this.CurrentUser?.Id)
      {
        case null:
          throw new Exception("No current user!");
        default:
          CloudResult<User> user = await this.GetUser(this.CurrentUser.Id);
          User entity = user.Entity;
          if (user.IsOK && this.CurrentUser != null && this.CurrentUser.Id == entity.Id)
          {
            this.CurrentUser = entity;
            UserPatreonData patreonData = this.CurrentUser.PatreonData;
            int num;
            if ((patreonData != null ? (patreonData.IsPatreonSupporter ? 1 : 0) : 0) == 0)
            {
              List<string> tags = this.CurrentUser.Tags;
              // ISSUE: explicit non-virtual call
              num = tags != null ? (__nonvirtual (tags.Contains(UserTags.NeosTeam)) ? 1 : 0) : 0;
            }
            else
              num = 1;
            CloudXInterface.USE_CDN = num != 0;
          }
          return user;
      }
    }

    public async Task<CloudResult<User>> GetUser(string userId)
    {
      return await this.GET<User>("api/users/" + userId, new TimeSpan?());
    }

    public async Task<CloudResult<User>> GetUserByName(string username)
    {
      return await this.GET<User>("api/users/" + username + "?byUsername=true", new TimeSpan?());
    }

    public async Task<CloudResult<List<User>>> GetUsers(string searchName)
    {
      return await this.GET<List<User>>("api/users?name=" + Uri.EscapeDataString(searchName), new TimeSpan?());
    }

    public async Task<CloudResult<User>> GetUserCached(string userId)
    {
      return await this.GetUser(userId);
    }

    public void Logout(bool manualLogOut)
    {
      this.OnLogout();
      if (this.CurrentSession != null && !this.CurrentSession.RememberMe | manualLogOut)
      {
        string _userId = this.CurrentSession.UserId;
        string _sessionToken = this.CurrentSession.SessionToken;
        Task.Run<CloudResult>((Func<Task<CloudResult>>) (async () => await this.DELETE("api/userSessions/" + _userId + "/" + _sessionToken, new TimeSpan?())));
      }
      this._cryptoProvider?.Dispose();
      this._cryptoProvider = (RSACryptoServiceProvider) null;
      this.PublicKey = new RSAParameters();
      this.CurrentSession = (UserSession) null;
      this.CurrentUser = (User) null;
      this.ClearMemberships();
      this.Friends.Reset();
      CloudXInterface.USE_CDN = false;
    }

    public byte[] SignHash(byte[] hash)
    {
      return this._cryptoProvider.SignHash(hash, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
    }

    public async Task<CloudResult<R>> FetchRecordCached<R>(Uri recordUri) where R : class, IRecord, new()
    {
      lock (this.cachedRecords)
      {
        Dictionary<Uri, CloudResult> dictionary;
        if (!this.cachedRecords.TryGetValue(typeof (R), out dictionary))
        {
          dictionary = new Dictionary<Uri, CloudResult>();
          this.cachedRecords.Add(typeof (R), dictionary);
        }
        CloudResult cloudResult;
        if (dictionary.TryGetValue(recordUri, out cloudResult))
          return (CloudResult<R>) cloudResult;
      }
      CloudResult<R> cloudResult1 = await this.FetchRecord<R>(recordUri).ConfigureAwait(false);
      lock (this.cachedRecords)
      {
        Dictionary<Uri, CloudResult> cachedRecord = this.cachedRecords[typeof (R)];
        cachedRecord.Remove(recordUri);
        cachedRecord.Add(recordUri, (CloudResult) cloudResult1);
      }
      return cloudResult1;
    }

    public Task<CloudResult<R>> FetchRecord<R>(Uri recordUri) where R : class, IRecord, new()
    {
      string ownerId;
      string recordId;
      if (RecordUtil.ExtractRecordID(recordUri, out ownerId, out recordId))
        return this.FetchRecord<R>(ownerId, recordId);
      string recordPath;
      if (RecordUtil.ExtractRecordPath(recordUri, out ownerId, out recordPath))
        return this.FetchRecordAtPath<R>(ownerId, recordPath);
      throw new ArgumentException("Uri is not a record URI");
    }

    public Task<CloudResult<R>> FetchRecord<R>(string ownerId, string recordId) where R : class, IRecord, new()
    {
      return this.GET<R>("api/" + CloudXInterface.GetOwnerPath(ownerId) + "/" + ownerId + "/records/" + recordId, new TimeSpan?());
    }

    public Task<CloudResult<R>> FetchRecordAtPath<R>(string ownerId, string path) where R : class, IRecord, new()
    {
      return this.GET<R>("api/" + CloudXInterface.GetOwnerPath(ownerId) + "/" + ownerId + "/records/root/" + path, new TimeSpan?());
    }

    public Task<CloudResult<List<R>>> GetRecords<R>(
      string ownerId,
      string tag = null,
      string path = null)
      where R : class, IRecord, new()
    {
      string ownerPath = CloudXInterface.GetOwnerPath(ownerId);
      string str = "";
      if (tag != null)
        str = "?tag=" + Uri.EscapeDataString(tag);
      if (path != null)
        str = "?path=" + Uri.EscapeDataString(path);
      return this.GET<List<R>>("api/" + ownerPath + "/" + ownerId + "/records" + str, new TimeSpan?());
    }

    public Task<CloudResult<List<R>>> FindRecords<R>(SearchParameters search) where R : class, IRecord, new()
    {
      return this.POST<List<R>>("api/records/search", (object) search, new TimeSpan?());
    }

    public Task<CloudResult<CloudMessage>> UpsertRecord<R>(R record) where R : class, IRecord, new()
    {
      string resource;
      switch (IdUtil.GetOwnerType(record.OwnerId))
      {
        case OwnerType.User:
          resource = "api/users/" + record.OwnerId + "/records/" + record.RecordId;
          break;
        case OwnerType.Group:
          resource = "api/groups/" + record.OwnerId + "/records/" + record.RecordId;
          break;
        default:
          throw new Exception("Invalid record owner");
      }
      return this.PUT<CloudMessage>(resource, (object) record, new TimeSpan?());
    }

    public Task<CloudResult<RecordPreprocessStatus>> PreprocessRecord<R>(
      R record)
      where R : class, IRecord, new()
    {
      string resource;
      switch (IdUtil.GetOwnerType(record.OwnerId))
      {
        case OwnerType.User:
          resource = "api/users/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess";
          break;
        case OwnerType.Group:
          resource = "api/groups/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess";
          break;
        default:
          throw new Exception("Invalid record owner");
      }
      return this.POST<RecordPreprocessStatus>(resource, (object) record, new TimeSpan?());
    }

    public Task<CloudResult<RecordPreprocessStatus>> GetPreprocessStatus(
      RecordPreprocessStatus status)
    {
      return this.GetPreprocessStatus(status.OwnerId, status.RecordId, status.PreprocessId);
    }

    public Task<CloudResult<RecordPreprocessStatus>> GetPreprocessStatus(
      string ownerId,
      string recordId,
      string id)
    {
      string resource;
      switch (IdUtil.GetOwnerType(ownerId))
      {
        case OwnerType.User:
          resource = "api/users/" + ownerId + "/records/" + recordId + "/preprocess/" + id;
          break;
        case OwnerType.Group:
          resource = "api/groups/" + ownerId + "/records/" + recordId + "/preprocess/" + id;
          break;
        default:
          throw new Exception("Invalid record owner");
      }
      return this.GET<RecordPreprocessStatus>(resource, new TimeSpan?());
    }

    public Task<CloudResult> DeleteRecord(IRecord record)
    {
      return this.DeleteRecord(record.OwnerId, record.RecordId);
    }

    public async Task<CloudResult> DeleteRecord(string ownerId, string recordId)
    {
      CloudResult result = await this.DELETE("api/users/" + ownerId + "/records/" + recordId, new TimeSpan?()).ConfigureAwait(false);
      await this.UpdateStorage(ownerId).ConfigureAwait(false);
      return result;
    }

    public Task<CloudResult> AddTag(string ownerId, string recordId, string tag)
    {
      switch (IdUtil.GetOwnerType(ownerId))
      {
        case OwnerType.User:
          return this.PUT("api/users/" + ownerId + "/records/" + recordId + "/tags", (object) tag, new TimeSpan?());
        case OwnerType.Group:
          return this.PUT("api/groups/" + ownerId + "/records/" + recordId + "/tags", (object) tag, new TimeSpan?());
        default:
          throw new Exception("Invalid record owner");
      }
    }

    public async Task UpdateStorage(string ownerId)
    {
      if (this.CurrentUser == null)
        return;
      OwnerType ownerType = IdUtil.GetOwnerType(ownerId);
      string _signedUserId = this.CurrentUser.Id;
      float[] numArray = CloudXInterface.storageUpdateDelays;
      for (int index = 0; index < numArray.Length; ++index)
      {
        ConfiguredTaskAwaitable configuredTaskAwaitable = Task.Delay(TimeSpan.FromSeconds((double) numArray[index])).ConfigureAwait(false);
        await configuredTaskAwaitable;
        if (this.CurrentUser?.Id != _signedUserId)
          return;
        if (ownerType == OwnerType.User)
        {
          CloudResult<User> cloudResult = await this.UpdateCurrentUserInfo().ConfigureAwait(false);
        }
        else
        {
          configuredTaskAwaitable = this.UpdateGroupInfo(ownerId).ConfigureAwait(false);
          await configuredTaskAwaitable;
        }
      }
      numArray = (float[]) null;
    }

    public async Task<CloudResult<AssetInfo>> FetchGlobalAssetInfo(
      string hash)
    {
      return await this.GET<AssetInfo>("api/assets/" + hash.ToLower(), new TimeSpan?());
    }

    public async Task<CloudResult<AssetInfo>> FetchUserAssetInfo(string hash)
    {
      return await this.FetchAssetInfo(this.CurrentUser.Id, hash);
    }

    public async Task<CloudResult<AssetInfo>> FetchAssetInfo(
      string ownerId,
      string hash)
    {
      switch (IdUtil.GetOwnerType(ownerId))
      {
        case OwnerType.User:
          return await this.GET<AssetInfo>("api/users/" + ownerId + "/assets/" + hash, new TimeSpan?());
        case OwnerType.Group:
          return await this.GET<AssetInfo>("api/groups/" + ownerId + "/assets/" + hash, new TimeSpan?());
        default:
          throw new Exception("Invalid ownerId");
      }
    }

    public async Task<CloudResult<AssetInfo>> RegisterAssetInfo(
      AssetInfo assetInfo)
    {
      switch (IdUtil.GetOwnerType(assetInfo.OwnerId))
      {
        case OwnerType.User:
          return await this.PUT<AssetInfo>("api/users/" + assetInfo.OwnerId + "/assets/" + assetInfo.AssetHash, (object) assetInfo, new TimeSpan?());
        case OwnerType.Group:
          return await this.PUT<AssetInfo>("api/groups/" + assetInfo.OwnerId + "/assets/" + assetInfo.AssetHash, (object) assetInfo, new TimeSpan?());
        default:
          throw new Exception("Invalid ownerId");
      }
    }

    private string GetAssetBaseURL(string ownerId, string hash, string variant)
    {
      hash = hash.ToLower();
      string str = hash;
      if (variant != null)
        str = str + "&" + variant;
      switch (IdUtil.GetOwnerType(ownerId))
      {
        case OwnerType.User:
          return "api/users/" + ownerId + "/assets/" + str;
        case OwnerType.Group:
          return "api/groups/" + ownerId + "/assets/" + str;
        default:
          throw new Exception("Invalid ownerId");
      }
    }

    public async Task<CloudResult<AssetUploadData>> UploadAsset(
      string ownerId,
      string signature,
      string variant,
      string assetPath,
      int retries = 5,
      IProgressIndicator progressIndicator = null)
    {
      ConfiguredTaskAwaitable<CloudResult<AssetUploadData>> configuredTaskAwaitable = this.BeginUploadAsset(ownerId, signature, variant, assetPath, retries, progressIndicator, new long?()).ConfigureAwait(false);
      CloudResult<AssetUploadData> cloudResult = await configuredTaskAwaitable;
      if (!cloudResult.IsOK)
        return cloudResult;
      configuredTaskAwaitable = this.WaitForAssetFinishProcessing(cloudResult.Entity).ConfigureAwait(false);
      return await configuredTaskAwaitable;
    }

    private void EnqueueChunk(
      string baseUrl,
      string fileName,
      CloudXInterface.UploadChunkBuffer buffer,
      List<CloudXInterface.UploadChunkBuffer> processingBuffers)
    {
      buffer.task = this.RunRequest((Func<HttpRequestMessage>) (() =>
      {
        HttpRequestMessage request = this.CreateRequest(baseUrl + "/" + buffer.chunk.ToString(), HttpMethod.Post);
        request.Content = (HttpContent) new MultipartFormDataContent()
        {
          {
            (HttpContent) new ByteArrayContent(buffer.data, 0, buffer.length)
            {
              Headers = {
                ContentLength = new long?((long) buffer.length)
              }
            },
            "file",
            fileName
          }
        };
        return request;
      }), new TimeSpan?(TimeSpan.FromMinutes(4.0)));
      processingBuffers.Add(buffer);
    }

    private async Task<CloudXInterface.UploadChunkBuffer> TakeFinishedBuffer(
      List<CloudXInterface.UploadChunkBuffer> buffers)
    {
      List<Task> tasks = Pool.BorrowList<Task>();
      for (int index = 0; index < buffers.Count; ++index)
      {
        if (buffers[index].task != null)
        {
          if (CloudXInterface.DEBUG_UPLOAD)
            UniLog.Log(string.Format("Adding task from chunk {0}: {1}, IsCompleted: {2}, IsCanceled: {3}, IsFaulted: {4}", (object) buffers[index].chunk, (object) buffers[index].task.Id, (object) buffers[index].task.IsCompleted, (object) buffers[index].task.IsCanceled, (object) buffers[index].task.IsFaulted), false);
          tasks.Add((Task) buffers[index].task);
        }
      }
      if (CloudXInterface.DEBUG_UPLOAD)
        UniLog.Log("Waiting for any task to finish. Count: " + tasks.Count.ToString(), false);
      Task task = await Task.WhenAny((IEnumerable<Task>) tasks).ConfigureAwait(false);
      if (CloudXInterface.DEBUG_UPLOAD)
        UniLog.Log("Task finished, checking buffers", false);
      Pool.Return<Task>(ref tasks);
      CloudXInterface.UploadChunkBuffer uploadChunkBuffer;
      using (List<CloudXInterface.UploadChunkBuffer>.Enumerator enumerator = buffers.GetEnumerator())
      {
        CloudXInterface.UploadChunkBuffer current;
        do
        {
          if (enumerator.MoveNext())
          {
            current = enumerator.Current;
            if (CloudXInterface.DEBUG_UPLOAD)
              UniLog.Log(string.Format("Buffer Task {0} from chunk {1}. IsCompleted: {2}. IsCanceled: {3}. IsFaulted: {4}", (object) current.task?.Id, (object) current.chunk, (object) current.task?.IsCompleted, (object) current.task?.IsCanceled, (object) current.task?.IsFaulted), false);
          }
          else
            goto label_20;
        }
        while (current.task == null || !current.task.IsCompleted);
        buffers.Remove(current);
        uploadChunkBuffer = current;
        goto label_21;
      }
label_20:
      throw new Exception("No Finished Buffer Available");
label_21:
      return uploadChunkBuffer;
    }

    public async Task<CloudResult<AssetUploadData>> BeginUploadAsset(
      string ownerId,
      string signature,
      string variant,
      string assetPath,
      int retries = 5,
      IProgressIndicator progressIndicator = null,
      long? bytes = null)
    {
      string fileName = Path.GetFileName(assetPath);
      CloudResult<AssetUploadData> cloudResult;
      using (FileStream stream = System.IO.File.OpenRead(assetPath))
        cloudResult = await this.BeginUploadAsset(ownerId, signature, variant, (Stream) stream, fileName, retries, progressIndicator, bytes);
      return cloudResult;
    }

    public async Task<CloudResult<AssetUploadData>> BeginUploadAsset(
      string ownerId,
      string signature,
      string variant,
      Stream fileStream,
      string fileName,
      int retries = 5,
      IProgressIndicator progressIndicator = null,
      long? bytes = null)
    {
      string baseUrl = this.GetAssetBaseURL(ownerId, signature, variant) + "/chunks";
      CloudResult<AssetUploadData> assetUploadResult = await this.POST<AssetUploadData>(baseUrl + (!bytes.HasValue ? "" : string.Format("?bytes={0}", (object) bytes.Value)), (object) null, new TimeSpan?()).ConfigureAwait(false);
      if (CloudXInterface.DEBUG_UPLOAD)
        UniLog.Log("Initiate Chunk Upload: " + assetUploadResult?.ToString(), false);
      if (assetUploadResult.IsError)
        return assetUploadResult;
      AssetUploadData assetUpload = assetUploadResult.Entity;
      List<CloudXInterface.UploadChunkBuffer> freeBuffers = Pool.BorrowList<CloudXInterface.UploadChunkBuffer>();
      List<CloudXInterface.UploadChunkBuffer> processingBuffers = Pool.BorrowList<CloudXInterface.UploadChunkBuffer>();
      for (int index = 0; index < MathX.Min(assetUpload.TotalChunks, CloudXInterface.UPLOAD_DEGREE_OF_PARALLELISM); ++index)
        freeBuffers.Add(new CloudXInterface.UploadChunkBuffer()
        {
          data = new byte[assetUpload.ChunkSize]
        });
      Stopwatch s = Stopwatch.StartNew();
      int enqueuedChunks = 0;
      int uploadedChunks = 0;
      while (uploadedChunks < assetUpload.TotalChunks)
      {
        bool flag;
        if (freeBuffers.Count > 0 && enqueuedChunks < assetUpload.TotalChunks)
        {
          CloudXInterface.UploadChunkBuffer last = freeBuffers.TakeLast<CloudXInterface.UploadChunkBuffer>();
          int num = fileStream.Read(last.data, 0, last.data.Length);
          last.chunk = enqueuedChunks;
          last.length = num;
          if (CloudXInterface.DEBUG_UPLOAD)
            UniLog.Log(string.Format("Enqueuing chunk {0}.", (object) enqueuedChunks), false);
          this.EnqueueChunk(baseUrl, fileName, last, processingBuffers);
          ++enqueuedChunks;
          flag = freeBuffers.Count == 0;
        }
        else
          flag = true;
        if (flag)
        {
          if (CloudXInterface.DEBUG_UPLOAD)
            UniLog.Log("Waiting for finished buffer", false);
          CloudXInterface.UploadChunkBuffer buffer = await this.TakeFinishedBuffer(processingBuffers).ConfigureAwait(false);
          if (CloudXInterface.DEBUG_UPLOAD)
            UniLog.Log(string.Format("Got finished buffer {0}: ", (object) buffer.chunk) + buffer?.task?.ToString(), false);
          if (buffer.task.IsCanceled)
          {
            if (CloudXInterface.DEBUG_UPLOAD)
              UniLog.Log(string.Format("Task is cancelled, enqueuing chunk {0} again", (object) buffer.chunk), false);
            this.EnqueueChunk(baseUrl, fileName, buffer, processingBuffers);
          }
          else
          {
            CloudResult cloudResult = await buffer.task.ConfigureAwait(false);
            if (CloudXInterface.DEBUG_UPLOAD)
              UniLog.Log(string.Format("Chunk {0} result: ", (object) buffer.chunk) + cloudResult?.ToString(), false);
            if (cloudResult.IsError)
              return new CloudResult<AssetUploadData>((AssetUploadData) null, cloudResult.State, cloudResult.Content);
            buffer.task = (Task<CloudResult>) null;
            freeBuffers.Add(buffer);
            ++uploadedChunks;
            float percent = (float) uploadedChunks / (float) assetUpload.TotalChunks;
            progressIndicator?.UpdateProgress(percent, "Upload", string.Format("Chunk {0} out of {1}", (object) uploadedChunks, (object) assetUpload.TotalChunks));
            buffer = (CloudXInterface.UploadChunkBuffer) null;
          }
        }
      }
      s.Stop();
      UniLog.Log(string.Format("Asset {0} uploaded in {1}. Average rate: {2}/s", (object) fileName, (object) s.Elapsed, (object) UnitFormatting.FormatBytes((double) assetUpload.TotalBytes / s.Elapsed.TotalSeconds, 2)), false);
      Pool.Return<CloudXInterface.UploadChunkBuffer>(ref processingBuffers);
      Pool.Return<CloudXInterface.UploadChunkBuffer>(ref freeBuffers);
      CloudResult cloudResult1 = await this.PATCH(baseUrl, (object) null, new TimeSpan?()).ConfigureAwait(false);
      return !cloudResult1.IsError ? assetUploadResult : new CloudResult<AssetUploadData>((AssetUploadData) null, cloudResult1.State, cloudResult1.Content);
    }

    public async Task<CloudResult<AssetUploadData>> WaitForAssetFinishProcessing(
      AssetUploadData assetUpload)
    {
      string baseUrl = this.GetAssetBaseURL(assetUpload.OwnerId, assetUpload.Signature, assetUpload.Variant) + "/chunks";
      CloudResult<AssetUploadData> cloudResult;
      while (true)
      {
        cloudResult = await this.GET<AssetUploadData>(baseUrl, new TimeSpan?()).ConfigureAwait(false);
        if (!cloudResult.IsError && (cloudResult.Entity.UploadState != UploadState.Uploaded && cloudResult.Entity.UploadState != UploadState.Failed))
          await Task.Delay(250).ConfigureAwait(false);
        else
          break;
      }
      return cloudResult;
    }

    public Task<CloudResult<ThumbnailInfo>> UploadThumbnail(string path)
    {
      return this.POST_File<ThumbnailInfo>("api/thumbnails", path, "image/webp", (IProgressIndicator) null);
    }

    public Task<CloudResult> ExtendThumbnailLifetime(ThumbnailInfo thumbnail)
    {
      return this.PATCH("api/thumbnails", (object) thumbnail, new TimeSpan?());
    }

    public Task<CloudResult> DeleteThumbnail(ThumbnailInfo thumbnail)
    {
      return this.DELETE("api/thumbnails/" + thumbnail.Id + "/" + thumbnail.Key, new TimeSpan?());
    }

    public async Task<CloudResult<Group>> GetGroup(string groupId)
    {
      return await this.GET<Group>("api/groups/" + groupId, new TimeSpan?());
    }

    public async Task<CloudResult<Group>> GetGroupCached(string groupId)
    {
      return await this.GetGroup(groupId);
    }

    public async Task<CloudResult<Group>> CreateGroup(Group group)
    {
      return await this.POST<Group>("api/groups", (object) group, new TimeSpan?());
    }

    public async Task<CloudResult> AddGroupMember(Member member)
    {
      return await this.POST("api/groups/" + member.GroupId + "/members", (object) member, new TimeSpan?());
    }

    public async Task<CloudResult> DeleteGroupMember(Member member)
    {
      return await this.DELETE("api/groups/" + member.GroupId + "/members/" + member.UserId, new TimeSpan?());
    }

    public async Task<CloudResult<Member>> GetGroupMember(
      string groupId,
      string userId)
    {
      return await this.GET<Member>("api/groups/" + groupId + "/members/" + userId, new TimeSpan?());
    }

    public async Task<CloudResult<List<Member>>> GetGroupMembers(
      string groupId)
    {
      return await this.GET<List<Member>>("api/groups/" + groupId + "/members", new TimeSpan?());
    }

    public async Task<CloudResult> UpdateCurrentUserMemberships()
    {
      CloudResult<List<Membership>> groupMemeberships = await this.GetUserGroupMemeberships();
      if (groupMemeberships.IsOK)
        this.SetMemberships((IEnumerable<Membership>) groupMemeberships.Entity);
      return (CloudResult) groupMemeberships;
    }

    public async Task<CloudResult<List<Membership>>> GetUserGroupMemeberships()
    {
      return await this.GetUserGroupMemeberships(this.CurrentUser.Id);
    }

    public async Task<CloudResult<List<Membership>>> GetUserGroupMemeberships(
      string userId)
    {
      return await this.GET<List<Membership>>("api/users/" + userId + "/memberships", new TimeSpan?());
    }

    public async Task UpdateGroupInfo(string groupId)
    {
      Task<CloudResult<Group>> group = this.GetGroup(groupId);
      Task<CloudResult<Member>> memberTask = this.GetGroupMember(groupId, this.CurrentUser.Id);
      CloudResult<Group> groupResult = await group;
      CloudResult<Member> cloudResult = await memberTask;
      lock (this.lockobj)
      {
        if (groupResult.IsOK)
        {
          this._groups.Remove(groupId);
          this._groups.Add(groupId, groupResult.Entity);
          Action<Group> groupUpdated = this.GroupUpdated;
          if (groupUpdated != null)
            groupUpdated(groupResult.Entity);
        }
        if (!cloudResult.IsOK)
          return;
        this._groupMemberInfos.Remove(groupId);
        this._groupMemberInfos.Add(groupId, cloudResult.Entity);
        Action<Member> groupMemberUpdated = this.GroupMemberUpdated;
        if (groupMemberUpdated == null)
          return;
        groupMemberUpdated(cloudResult.Entity);
      }
    }

    public async Task<CloudResult<Submission>> UpsertSubmission(
      string groupId,
      string ownerId,
      string recordId,
      bool feature = false)
    {
      return await this.PUT<Submission>("api/groups/" + groupId + "/submissions", (object) new Submission()
      {
        GroupId = groupId,
        TargetRecordId = new RecordId(ownerId, recordId),
        Featured = feature
      }, new TimeSpan?());
    }

    public async Task<CloudResult> DeleteSubmission(
      string groupId,
      string submissionId)
    {
      return await this.DELETE("api/groups/" + groupId + "/submissions/" + submissionId, new TimeSpan?());
    }

    private static string GetOwnerPath(string ownerId)
    {
      switch (IdUtil.GetOwnerType(ownerId))
      {
        case OwnerType.User:
          return "users";
        case OwnerType.Group:
          return "groups";
        default:
          throw new Exception("Invalid owner type: " + ownerId);
      }
    }

    public async Task<CloudResult<CloudVariableDefinition>> UpsertVariableDefinition(
      CloudVariableDefinition definition)
    {
      return await this.PUT<CloudVariableDefinition>("api/" + CloudXInterface.GetOwnerPath(definition.DefinitionOwnerId) + "/" + definition.DefinitionOwnerId + "/vardefs/" + definition.Subpath, (object) definition, new TimeSpan?());
    }

    public async Task<CloudResult> DeleteVariableDefinition(
      string ownerId,
      string subpath)
    {
      return await this.DELETE("api/" + CloudXInterface.GetOwnerPath(ownerId) + "/" + ownerId + "/vardefs/" + subpath, new TimeSpan?());
    }

    public async Task<CloudResult<T>> ReadGlobalVariable<T>(string path)
    {
      return await this.ReadVariable<T>("GLOBAL", path);
    }

    public async Task<CloudResult<T>> ReadVariable<T>(string ownerId, string path)
    {
      CloudXInterface cloudXinterface = this;
      string resource;
      if (ownerId == "GLOBAL")
        resource = "api/globalvars/" + path;
      else
        resource = "api/" + CloudXInterface.GetOwnerPath(ownerId) + "/" + ownerId + "/vars/" + path;
      CloudResult<CloudVariable> cloudResult = await cloudXinterface.GET<CloudVariable>(resource, new TimeSpan?()).ConfigureAwait(false);
      if (cloudResult.IsOK)
      {
        switch (cloudResult.Entity?.Value)
        {
          case null:
            break;
          default:
            return new CloudResult<T>(JsonConvert.DeserializeObject<T>(cloudResult.Entity.Value, new JsonSerializerSettings()
            {
              Error = new EventHandler<Newtonsoft.Json.Serialization.ErrorEventArgs>(cloudXinterface.SerializationErrorHandler)
            }), cloudResult.State, cloudResult.Content);
        }
      }
      return new CloudResult<T>(default (T), cloudResult.State, cloudResult.Content);
    }

    private void SerializationErrorHandler(object sender, Newtonsoft.Json.Serialization.ErrorEventArgs error)
    {
      UniLog.Error("Deserialization error: " + error.ErrorContext.Error.Message, true);
      error.ErrorContext.Handled = true;
    }

    public async Task<CloudResult> WriteVariable<T>(
      string ownerId,
      string path,
      T value)
    {
      return await this.PUT("api/" + CloudXInterface.GetOwnerPath(ownerId) + "/" + ownerId + "/vars/" + path, (object) new CloudVariable()
      {
        Value = JsonConvert.SerializeObject((object) (T) value)
      }, new TimeSpan?());
    }

    public async Task<CloudResult> DeleteVariable(string ownerId, string path)
    {
      return await this.DELETE("api/" + CloudXInterface.GetOwnerPath(ownerId) + "/vars/" + path, new TimeSpan?());
    }

    public async Task<CloudResult<T>> ReadVariable<T>(string path)
    {
      return await this.ReadVariable<T>(this.CurrentUser.Id, path);
    }

    public async Task<CloudResult> WriteVariable<T>(string path, T value)
    {
      return await this.WriteVariable<T>(this.CurrentUser.Id, path, value);
    }

    public async Task<CloudResult> DeleteVariable(string path)
    {
      return await this.DeleteVariable(this.CurrentUser.Id, path);
    }

    public async Task<CloudResult> LogVisit(Visit visit)
    {
      return await this.POST("api/visits", (object) visit, new TimeSpan?());
    }

    public async Task<CloudResult<NeosSession>> CreateNeosSession(
      NeosSession session)
    {
      return await this.POST<NeosSession>("api/neosSessions", (object) session, new TimeSpan?());
    }

    public async Task<CloudResult<NeosSession>> PatchNeosSession(
      NeosSession session)
    {
      return await this.PATCH<NeosSession>("api/neosSessions", (object) session, new TimeSpan?());
    }

    public async Task<CloudResult<UserStatus>> GetStatus(string userId)
    {
      return await this.GET<UserStatus>("api/users/" + userId + "/status", new TimeSpan?());
    }

    public async Task<CloudResult> UpdateStatus(UserStatus status)
    {
      return await this.UpdateStatus(this.CurrentUser.Id, status);
    }

    public async Task<CloudResult> UpdateStatus(string userId, UserStatus status)
    {
      return await this.PUT("api/users/" + userId + "/status", (object) status, new TimeSpan?());
    }

    public async Task<CloudResult> UpdateProfile(UserProfile profile)
    {
      this.CurrentUser.Profile = profile;
      return await this.UpdateProfile(this.CurrentUser.Id, profile);
    }

    public async Task<CloudResult> UpdateProfile(string userId, UserProfile profile)
    {
      return await this.PUT("api/users/" + userId + "/profile", (object) profile, new TimeSpan?());
    }

    public async Task<CloudResult<List<Friend>>> GetFriends(
      DateTime? lastStatusUpdate = null)
    {
      return await this.GetFriends(this.CurrentUser.Id, lastStatusUpdate);
    }

    public async Task<CloudResult<List<Friend>>> GetFriends(
      string userId,
      DateTime? lastStatusUpdate = null)
    {
      string str = (string) null;
      if (lastStatusUpdate.HasValue)
        str = str + "?lastStatusUpdate=" + lastStatusUpdate.Value.ToUniversalTime().ToString("o");
      return await this.GET<List<Friend>>("api/users/" + userId + "/friends" + str, new TimeSpan?());
    }

    public async Task<CloudResult> UpsertFriend(Friend friend)
    {
      if (string.IsNullOrWhiteSpace(friend.OwnerId))
        throw new ArgumentException("friend.OwnerId");
      if (string.IsNullOrWhiteSpace(friend.FriendUserId))
        throw new ArgumentException("friend.FriendUserId");
      return await this.PUT("api/users/" + friend.OwnerId + "/friends/" + friend.FriendUserId, (object) friend, new TimeSpan?());
    }

    public async Task<CloudResult> DeleteFriend(Friend friend)
    {
      if (string.IsNullOrWhiteSpace(friend.OwnerId))
        throw new ArgumentException("friend.OwnerId");
      if (string.IsNullOrWhiteSpace(friend.FriendUserId))
        throw new ArgumentException("friend.FriendUserId");
      return await this.DELETE("api/users/" + friend.OwnerId + "/friends/" + friend.FriendUserId, new TimeSpan?());
    }

    public async Task<CloudResult<Message>> SendMessage(Message message)
    {
      return await this.POST<Message>("api/users/" + message.RecipientId + "/messages", (object) message, new TimeSpan?());
    }

    public async Task<CloudResult<List<Message>>> GetUnreadMessages(
      DateTime? fromTime = null)
    {
      return await this.GetMessages(fromTime, -1, (string) null, true);
    }

    public async Task<CloudResult<List<Message>>> GetMessageHistory(
      string user,
      int maxItems = 100)
    {
      return await this.GetMessages(new DateTime?(), maxItems, user, false);
    }

    public async Task<CloudResult<List<Message>>> GetMessages(
      DateTime? fromTime,
      int maxItems,
      string user,
      bool unreadOnly)
    {
      StringBuilder stringBuilder = new StringBuilder();
      stringBuilder.Append(string.Format("?maxItems={0}", (object) maxItems));
      if (fromTime.HasValue)
        stringBuilder.Append("&fromTime=" + fromTime.Value.ToUniversalTime().ToString("o"));
      if (user != null)
        stringBuilder.Append("&user=" + user);
      if (unreadOnly)
        stringBuilder.Append("&unread=true");
      return await this.GET<List<Message>>(string.Format("api/users/{0}/messages{1}", (object) this.CurrentUser.Id, (object) stringBuilder), new TimeSpan?());
    }

    public async Task<CloudResult> MarkMessagesRead(List<string> messageIds)
    {
      return await this.PATCH("api/users/" + this.CurrentUser.Id + "/messages", (object) messageIds, new TimeSpan?());
    }

    public async Task<CloudResult> MarkMessagesRead(List<Message> messages)
    {
      return await this.MarkMessagesRead(messages.Select<Message, string>((Func<Message, string>) (m => m.Id)).ToList<string>());
    }

    public Task<CloudResult> UpdateSessions(SessionUpdate update)
    {
      return this.PUT("api/sessions", (object) update, new TimeSpan?());
    }

    public Task<CloudResult<SessionInfo>> GetSession(string sessionId)
    {
      return this.GET<SessionInfo>("api/sessions/" + sessionId, new TimeSpan?());
    }

    public Task<CloudResult<List<SessionInfo>>> GetSessions(
      DateTime? updatedSince = null,
      bool includeEnded = false,
      string compatibilityHash = null,
      string name = null,
      string hostName = null,
      string hostId = null,
      int? minActiveUsers = null,
      bool includeEmptyHeadless = true)
    {
      StringBuilder stringBuilder1 = new StringBuilder();
      if (updatedSince.HasValue)
      {
        StringBuilder stringBuilder2 = stringBuilder1;
        DateTime universalTime = updatedSince.Value;
        universalTime = universalTime.ToUniversalTime();
        string str = "&updatedSince=" + Uri.EscapeDataString(universalTime.ToString("o"));
        stringBuilder2.Append(str);
      }
      if (includeEnded)
        stringBuilder1.Append("&includeEnded=true");
      if (compatibilityHash != null)
        stringBuilder1.Append("&compatibilityHash=" + Uri.EscapeDataString(compatibilityHash));
      if (name != null)
        stringBuilder1.Append("&name=" + Uri.EscapeDataString(name));
      if (hostName != null)
        stringBuilder1.Append("&hostName=" + Uri.EscapeDataString(hostName));
      if (hostId != null)
        stringBuilder1.Append("&hostId=" + Uri.EscapeDataString(hostId));
      if (minActiveUsers.HasValue)
        stringBuilder1.Append(string.Format("&minActiveUsers={0}", (object) minActiveUsers.Value));
      stringBuilder1.Append("&includeEmptyHeadless=" + (includeEmptyHeadless ? "true" : "false"));
      if (stringBuilder1.Length > 0)
        stringBuilder1[0] = '?';
      return this.GET<List<SessionInfo>>("api/sessions" + stringBuilder1.ToString(), new TimeSpan?());
    }

    public Task<CloudResult> SendTransaction(CreditTransaction transaction)
    {
      return this.POST("api/transactions/" + transaction.Token, (object) transaction, new TimeSpan?());
    }

    public Task<CloudResult> RequestDepositAddress()
    {
      return this.GET("api/users/" + this.CurrentUser.Id + "/despositAddress", new TimeSpan?());
    }

    public Task<CloudResult<SugarCube>> GetSugarCube(
      string batchId,
      int sequenceNumber)
    {
      return this.GET<SugarCube>(string.Format("api/kofi/sugarcube/{0}/{1}", (object) batchId, (object) sequenceNumber), new TimeSpan?());
    }

    public async Task<Stream> GatherAsset(string signature)
    {
      try
      {
        return await this.HttpClient.GetStreamAsync(CloudXInterface.NEOS_ASSETS + signature).ConfigureAwait(false);
      }
      catch (HttpRequestException ex)
      {
        return (Stream) null;
      }
    }

    public Task<CloudResult<List<T>>> GetAssetMetadata<T>(List<string> hashes) where T : class, IAssetMetadata, new()
    {
      System.Type type1 = typeof (T);
      if (type1 == typeof (BitmapMetadata))
        return this.POST<List<T>>("api/assets/bitmapMetadata", (object) hashes, new TimeSpan?());
      System.Type type2 = type1;
      throw new Exception("Unsupported metadata type: " + ((object) type2 != null ? type2.ToString() : (string) null));
    }

    public async Task<CloudResult<IAssetMetadata>> GetAssetMetadata(
      AssetVariantType variantType,
      string hash)
    {
      if (variantType == AssetVariantType.Texture)
        return (await this.GetAssetMetadata<BitmapMetadata>(hash).ConfigureAwait(false)).AsResult<IAssetMetadata>();
      throw new Exception("Unsupported metadata type: " + variantType.ToString());
    }

    public Task<CloudResult<T>> GetAssetMetadata<T>(string hash) where T : class, IAssetMetadata, new()
    {
      System.Type type1 = typeof (T);
      if (type1 == typeof (BitmapMetadata))
        return this.GET<T>("api/assets/" + hash + "/bitmapMetadata", new TimeSpan?());
      System.Type type2 = type1;
      throw new Exception("Unsupported metadata type: " + ((object) type2 != null ? type2.ToString() : (string) null));
    }

    public Task<CloudResult<List<string>>> RequestAssetVariant(
      string hash,
      IAssetVariantDescriptor descriptor)
    {
      TextureVariantDescriptor variantDescriptor = descriptor as TextureVariantDescriptor;
      if ((object) variantDescriptor != null)
        return this.POST<List<string>>("api/assets/" + hash + "/bitmapVariant/" + variantDescriptor.VariantIdentifier, (object) null, new TimeSpan?());
      System.Type type = descriptor.GetType();
      throw new Exception("Unsupported variant descriptor: " + ((object) type != null ? type.ToString() : (string) null));
    }

    public Task<CloudResult<List<string>>> GetAvailableVariants(Uri neosDbUrl)
    {
      return this.GetAvailableVariants(CloudXInterface.NeosDBSignature(neosDbUrl));
    }

    public Task<CloudResult<List<string>>> GetAvailableVariants(string hash)
    {
      return this.GET<List<string>>("api/assets/" + hash + "/variants", new TimeSpan?());
    }

    public Task<CloudResult> StoreAssetMetadata(IAssetMetadata metadata)
    {
      BitmapMetadata bitmapMetadata = metadata as BitmapMetadata;
      if (bitmapMetadata != null)
        return this.PUT("api/assets/" + metadata.AssetIdentifier + "/bitmapMetadata", (object) bitmapMetadata, new TimeSpan?());
      System.Type type = metadata.GetType();
      throw new Exception("Unsupported metadata type: " + ((object) type != null ? type.ToString() : (string) null));
    }

    public Task<CloudResult<BitmapMetadata>> GetBitmapMetadata(
      string hash)
    {
      return this.GET<BitmapMetadata>("api/assets/" + hash + "/bitmapMetadata", new TimeSpan?());
    }

    public Task<CloudResult<List<BitmapMetadata>>> GetBitmapMetadata(
      List<string> hashes)
    {
      return this.POST<List<BitmapMetadata>>("api/assets/bitmapMetadata", (object) hashes, new TimeSpan?());
    }

    public Task<CloudResult> StoreBitmapMetadata(
      string hash,
      BitmapMetadata metadata)
    {
      return this.PUT("api/assets/" + hash + "/bitmapMetadata", (object) metadata, new TimeSpan?());
    }

    public Task<CloudResult<ExternalQueueObject<AssetVariantComputationTask>>> GetAssetComputationTask()
    {
      return this.GET<ExternalQueueObject<AssetVariantComputationTask>>(string.Format("api/processing/assetComputations?computeVersion={0}", (object) AssetUtil.COMPUTE_VERSION), new TimeSpan?());
    }

    public async Task<CloudResult> ExtendAssetComputationTask(
      ExternalQueueObject<AssetVariantComputationTask> task)
    {
      CloudResult cloudResult = await this.PATCH("api/processing/assetComputations", (object) task, new TimeSpan?());
      if (cloudResult.IsOK)
        task.PopReceipt = cloudResult.Content;
      return cloudResult;
    }

    public Task<CloudResult> FinishAssetComputation(
      ExternalQueueObject<AssetVariantComputationTask> task)
    {
      return this.DELETE("api/processing/assetComputations/" + task.Id + "?popReceipt=" + task.PopReceipt, new TimeSpan?());
    }

    public Task<CloudResult> FinishVariantComputation(string hash, string variantId)
    {
      return this.POST("api/processing/assetComputations/" + hash + "/" + variantId, (object) null, new TimeSpan?());
    }

    public Task<CloudResult> Ping()
    {
      return this.GET("api/testing/ping", new TimeSpan?());
    }

    public async Task<CloudResult<ServerStatistics>> GetServerStatistics()
    {
      try
      {
        using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "https://cloudxstorage.blob.core.windows.net/install/ServerResponse"))
        {
          HttpResponseMessage httpResponseMessage = await this.HttpClient.SendAsync(request).ConfigureAwait(false);
          if (!httpResponseMessage.IsSuccessStatusCode)
            return new CloudResult<ServerStatistics>((ServerStatistics) null, httpResponseMessage.StatusCode, (string) null);
          long? contentLength = httpResponseMessage.Content.Headers.ContentLength;
          long num = 0;
          if (!(contentLength.GetValueOrDefault() > num & contentLength.HasValue))
            return (CloudResult<ServerStatistics>) null;
          using (Stream responseStream = await httpResponseMessage.Content.ReadAsStreamAsync().ConfigureAwait(false))
            return new CloudResult<ServerStatistics>(await System.Text.Json.JsonSerializer.DeserializeAsync<ServerStatistics>(responseStream, (JsonSerializerOptions) null, new CancellationToken()).ConfigureAwait(false), HttpStatusCode.OK, (string) null);
        }
      }
      catch (Exception ex)
      {
        return (CloudResult<ServerStatistics>) null;
      }
    }

    public async Task<int> GetOnlineUserCount()
    {
      CloudResult cloudResult = await this.GET("api/stats/onlineUsers", new TimeSpan?());
      int result;
      return !cloudResult.IsOK || !int.TryParse(cloudResult.Content, out result) ? -1 : result;
    }

    public enum CloudEndpoint
    {
      Production,
      Staging,
      Local,
    }

    private readonly struct CryptoData
    {
      public readonly RSACryptoServiceProvider provider;
      public readonly RSAParameters parameters;

      public CryptoData(RSACryptoServiceProvider provider, RSAParameters parameters)
      {
        this.provider = provider;
        this.parameters = parameters;
      }
    }

    private class UploadChunkBuffer
    {
      public int chunk = -1;
      public int length = -1;
      public byte[] data;
      public Task<CloudResult> task;
    }
  }
}
