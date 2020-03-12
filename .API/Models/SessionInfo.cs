// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.SessionInfo
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using BaseX;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class SessionInfo
  {
    [JsonProperty(PropertyName = "name")]
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonProperty(PropertyName = "description")]
    [JsonPropertyName("description")]
    public string Description { get; set; }

    [JsonProperty(PropertyName = "tags")]
    [JsonPropertyName("tags")]
    public HashSet<string> Tags { get; set; }

    [JsonProperty(PropertyName = "sessionId")]
    [JsonPropertyName("sessionId")]
    public string SessionId { get; set; }

    [JsonProperty(PropertyName = "hostUserId")]
    [JsonPropertyName("hostUserId")]
    public string HostUserId { get; set; }

    [JsonProperty(PropertyName = "hostMachineId")]
    [JsonPropertyName("hostMachineId")]
    public string HostMachineId { get; set; }

    [JsonProperty(PropertyName = "hostUsername")]
    [JsonPropertyName("hostUsername")]
    public string HostUsername { get; set; }

    [JsonProperty(PropertyName = "compatibilityHash")]
    [JsonPropertyName("compatibilityHash")]
    public string CompatibilityHash { get; set; }

    [JsonProperty(PropertyName = "neosVersion")]
    [JsonPropertyName("neosVersion")]
    public string NeosVersion { get; set; }

    [JsonProperty(PropertyName = "headlessHost")]
    [JsonPropertyName("headlessHost")]
    public bool HeadlessHost { get; set; }

    [Obsolete]
    [JsonProperty(PropertyName = "url")]
    [JsonPropertyName("url")]
    public string LegacySessionURL { get; set; }

    [JsonProperty(PropertyName = "sessionURLs")]
    [JsonPropertyName("sessionURLs")]
    public List<string> SessionURLs { get; set; }

    [JsonProperty(PropertyName = "sessionUsers")]
    [JsonPropertyName("sessionUsers")]
    public List<SessionUser> SessionUsers { get; set; }

    public List<Uri> GetSessionURLs()
    {
      if (this.SessionURLs != null)
        return this.SessionURLs.Where<string>((Func<string, bool>) (str => Uri.IsWellFormedUriString(str, UriKind.Absolute))).Select<string, Uri>((Func<string, Uri>) (str => new Uri(str))).ToList<Uri>();
      List<Uri> uriList = new List<Uri>();
      if (this.LegacySessionURL != null)
        uriList.Add(new Uri(this.LegacySessionURL));
      return uriList;
    }

    [JsonProperty(PropertyName = "thumbnail")]
    [JsonPropertyName("thumbnail")]
    public string Thumbnail { get; set; }

    [JsonProperty(PropertyName = "joinedUsers")]
    [JsonPropertyName("joinedUsers")]
    public int JoinedUsers { get; set; }

    [JsonProperty(PropertyName = "activeUsers")]
    [JsonPropertyName("activeUsers")]
    public int ActiveUsers { get; set; }

    [JsonProperty(PropertyName = "maxUsers")]
    [JsonPropertyName("maxUsers")]
    public int MaximumUsers { get; set; }

    [JsonProperty(PropertyName = "mobileFriendly")]
    [JsonPropertyName("mobileFriendly")]
    public bool MobileFriendly { get; set; }

    [JsonProperty(PropertyName = "sessionBeginTime")]
    [JsonPropertyName("sessionBeginTime")]
    public DateTime SessionBeginTime { get; set; }

    [JsonProperty(PropertyName = "lastUpdate")]
    [JsonPropertyName("lastUpdate")]
    public DateTime LastUpdate { get; set; }

    [JsonProperty(PropertyName = "awaySince")]
    [JsonPropertyName("awaySince")]
    public DateTime? AwaySince { get; set; }

    [JsonProperty(PropertyName = "accessLevel")]
    [JsonPropertyName("accessLevel")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public SessionAccessLevel AccessLevel { get; set; }

    [JsonIgnore]
    [JsonIgnore]
    public bool IsLAN { get; set; }

    public bool HasEnded
    {
      get
      {
        if (this.SessionURLs == null || this.SessionURLs.Count == 0)
          return this.LegacySessionURL == null;
        return false;
      }
    }

    public void SetEnded()
    {
      this.LegacySessionURL = (string) null;
      this.SessionURLs = (List<string>) null;
    }

    public bool IsSame(SessionInfo other)
    {
      if (!(this.Name == other.Name) || !(this.Description == other.Description) || (!this.Tags.IsSame<string>(other.Tags) || !(this.SessionId == other.SessionId)) || (!(this.HostUserId == other.HostUserId) || !(this.HostMachineId == other.HostMachineId) || (!(this.HostUsername == other.HostUsername) || !(this.CompatibilityHash == other.CompatibilityHash))) || (!(this.NeosVersion == other.NeosVersion) || this.HeadlessHost != other.HeadlessHost || (!(this.LegacySessionURL == other.LegacySessionURL) || !this.SessionURLs.ElementWiseEquals<string>((IList<string>) other.SessionURLs)) || (!this.SessionUsers.ElementWiseEquals<SessionUser>((IList<SessionUser>) other.SessionUsers) || !(this.Thumbnail == other.Thumbnail) || (this.JoinedUsers != other.JoinedUsers || this.ActiveUsers != other.ActiveUsers))) || (this.MaximumUsers != other.MaximumUsers || this.MobileFriendly != other.MobileFriendly || (this.IsLAN != other.IsLAN || this.AccessLevel != other.AccessLevel)))
        return false;
      DateTime? awaySince1 = this.AwaySince;
      DateTime? awaySince2 = other.AwaySince;
      if (awaySince1.HasValue != awaySince2.HasValue)
        return false;
      if (!awaySince1.HasValue)
        return true;
      return awaySince1.GetValueOrDefault() == awaySince2.GetValueOrDefault();
    }
  }
}
