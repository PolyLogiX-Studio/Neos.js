// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.MessageManager
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using BaseX;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudX.Shared
{
  public class MessageManager
  {
    public static float UPDATE_PERIOD_SECONDS = 1f;
    public static float UPDATE_TIMEOUT_SECONDS = 10f;
    private object _messagesLock = new object();
    private Dictionary<string, MessageManager.UserMessages> _messages = new Dictionary<string, MessageManager.UserMessages>();
    private DateTime lastRequest;
    private DateTime? lastUnreadMessage;
    private volatile bool _unreadCountDirty;
    private bool _waitingForRequest;

    public static int MAX_READ_HISTORY
    {
      get
      {
        return 100;
      }
    }

    public static int MAX_UNREAD_HISTORY
    {
      get
      {
        return 500;
      }
    }

    public CloudXInterface Cloud { get; private set; }

    public bool InitialMessagesFetched { get; private set; }

    public int UnreadCount { get; private set; }

    public MessageManager(CloudXInterface cloud)
    {
      this.Cloud = cloud;
    }

    internal void Update()
    {
      if (this.Cloud.CurrentUser == null)
        return;
      if (this._unreadCountDirty)
      {
        this._unreadCountDirty = false;
        lock (this._messagesLock)
          this.UnreadCount = this._messages.Sum<KeyValuePair<string, MessageManager.UserMessages>>((Func<KeyValuePair<string, MessageManager.UserMessages>, int>) (m => m.Value.UnreadCount));
        Action<int> messageCountChanged = this.UnreadMessageCountChanged;
        if (messageCountChanged != null)
          messageCountChanged(this.UnreadCount);
      }
      if ((DateTime.Now - this.lastRequest).TotalSeconds < (this._waitingForRequest ? (double) MessageManager.UPDATE_TIMEOUT_SECONDS : (double) MessageManager.UPDATE_PERIOD_SECONDS))
        return;
      this.lastRequest = DateTime.Now;
      this._waitingForRequest = true;
      Task.Run((Func<Task>) (async () =>
      {
        CloudResult<List<Message>> cloudResult1 = await this.Cloud.GetUnreadMessages(this.lastUnreadMessage).ConfigureAwait(false);
        this._waitingForRequest = false;
        if (!cloudResult1.IsOK)
          return;
        HashSet<Message> hashSet = Pool.BorrowHashSet<Message>();
        lock (this._messagesLock)
        {
          foreach (Message message in cloudResult1.Entity)
          {
            this.lastUnreadMessage = this.lastUnreadMessage.HasValue ? new DateTime?(MathX.Max(this.lastUnreadMessage.Value, message.LastUpdateTime)) : new DateTime?(message.LastUpdateTime);
            if (!this.GetUserMessages(message.SenderId).AddMessage(message))
              hashSet.Add(message);
          }
        }
        bool flag1 = false;
        foreach (Message message in cloudResult1.Entity)
        {
          if (!hashSet.Contains(message))
          {
            if (this.InitialMessagesFetched && message.MessageType == MessageType.CreditTransfer)
            {
              TransactionMessage content = message.ExtractContent<TransactionMessage>();
              bool flag2 = content.RecipientId == this.Cloud.CurrentUser.Id;
              User currentUser = this.Cloud.CurrentUser;
              if (currentUser.Credits != null && currentUser.Credits.ContainsKey(content.Token))
                currentUser.Credits[content.Token] += flag2 ? content.Amount : -content.Amount;
              flag1 = true;
            }
            Action<Message> onMessageReceived = this.OnMessageReceived;
            if (onMessageReceived != null)
              onMessageReceived(message);
            Friend friend = this.Cloud.Friends.GetFriend(message.SenderId);
            if (friend != null)
              friend.LatestMessageTime = MathX.Max(DateTime.UtcNow, message.SendTime);
          }
        }
        Pool.Return<Message>(ref hashSet);
        this.MarkUnreadCountDirty();
        this.InitialMessagesFetched = true;
        if (!flag1)
          return;
        await Task.Delay(10);
        CloudResult<User> cloudResult2 = await this.Cloud.UpdateCurrentUserInfo();
      }));
    }

    internal void MarkUnreadCountDirty()
    {
      this._unreadCountDirty = true;
    }

    internal void Reset()
    {
      lock (this._messagesLock)
      {
        this._messages.Clear();
        this.lastUnreadMessage = new DateTime?();
        this.InitialMessagesFetched = false;
      }
    }

    public MessageManager.UserMessages GetUserMessages(string userId)
    {
      lock (this._messagesLock)
      {
        MessageManager.UserMessages userMessages1;
        if (this._messages.TryGetValue(userId, out userMessages1))
          return userMessages1;
        MessageManager.UserMessages userMessages2 = new MessageManager.UserMessages(userId, this);
        this._messages.Add(userId, userMessages2);
        return userMessages2;
      }
    }

    public void GetAllUserMessages(List<MessageManager.UserMessages> list)
    {
      lock (this._messagesLock)
      {
        foreach (KeyValuePair<string, MessageManager.UserMessages> message in this._messages)
          list.Add(message.Value);
      }
    }

    public event Action<Message> OnMessageReceived;

    public event Action<int> UnreadMessageCountChanged;

    public class UserMessages
    {
      private HashSet<string> _messageIds = new HashSet<string>();
      private object _lock = new object();
      private Task<CloudResult<List<Message>>> _historyLoadTask;
      private bool _historyLoaded;

      public MessageManager Manager { get; private set; }

      public CloudXInterface Cloud
      {
        get
        {
          return this.Manager.Cloud;
        }
      }

      public string UserId { get; private set; }

      public List<Message> Messages { get; private set; } = new List<Message>();

      public int UnreadCount { get; private set; }

      public UserMessages(string userId, MessageManager manager)
      {
        this.UserId = userId;
        this.Manager = manager;
      }

      public void MarkAllRead()
      {
        List<string> ids = (List<string>) null;
        lock (this._lock)
        {
          if (this.UnreadCount == 0)
            return;
          ids = new List<string>();
          foreach (Message message in this.Messages)
          {
            if (!message.IsSent && !message.ReadTime.HasValue)
            {
              message.ReadTime = new DateTime?(DateTime.UtcNow);
              ids.Add(message.Id);
            }
          }
          this.UnreadCount = 0;
        }
        Task.Run<CloudResult>((Func<Task<CloudResult>>) (async () => await this.Cloud.MarkMessagesRead(ids)));
        this.Manager.MarkUnreadCountDirty();
      }

      public Message CreateTextMessage(string text)
      {
        return new Message()
        {
          MessageType = MessageType.Text,
          Content = text
        };
      }

      public Message CreateInviteMessage(SessionInfo sessionInfo)
      {
        Message message = new Message();
        message.Id = Message.GenerateId();
        message.SendTime = DateTime.UtcNow;
        message.MessageType = MessageType.SessionInvite;
        message.SetContent<SessionInfo>(sessionInfo);
        return message;
      }

      public async Task<CloudResult<Message>> SendInviteMessage(
        SessionInfo sessionInfo)
      {
        return await this.SendMessage(this.CreateInviteMessage(sessionInfo));
      }

      public Message AddSentTransactionMessage(string token, Decimal amount, string comment)
      {
        Message message = new Message()
        {
          Id = Message.GenerateId(),
          OwnerId = this.Cloud.CurrentUser.Id,
          RecipientId = this.UserId
        };
        message.SenderId = message.OwnerId;
        message.SendTime = DateTime.UtcNow;
        message.MessageType = MessageType.CreditTransfer;
        message.SetContent<TransactionMessage>(new TransactionMessage()
        {
          Token = token,
          Amount = amount,
          Comment = comment,
          RecipientId = this.UserId
        });
        lock (this._lock)
          this.Messages.Add(message);
        return message;
      }

      public async Task<CloudResult<Message>> SendMessage(Message message)
      {
        if (message.Id == null)
          message.Id = Message.GenerateId();
        message.RecipientId = this.UserId;
        message.SenderId = this.Cloud.CurrentUser.Id;
        message.OwnerId = message.SenderId;
        message.SendTime = DateTime.UtcNow;
        lock (this._lock)
          this.Messages.Add(message);
        Friend friend = this.Cloud.Friends.GetFriend(message.RecipientId);
        if (friend != null)
          friend.LatestMessageTime = DateTime.UtcNow;
        return await this.Cloud.SendMessage(message).ConfigureAwait(false);
      }

      public async Task<CloudResult<Message>> SendTextMessage(string text)
      {
        return await this.SendMessage(this.CreateTextMessage(text)).ConfigureAwait(false);
      }

      public async Task EnsureHistory()
      {
        if (this._historyLoaded)
          return;
        bool isFirstRequest = false;
        lock (this._lock)
        {
          if (this._historyLoaded)
            return;
          if (this._historyLoadTask == null)
          {
            isFirstRequest = true;
            this._historyLoadTask = this.Cloud.GetMessageHistory(this.UserId, MessageManager.MAX_READ_HISTORY);
          }
        }
        CloudResult<List<Message>> cloudResult = await this._historyLoadTask.ConfigureAwait(false);
        if (!isFirstRequest)
          return;
        if (!cloudResult.IsOK)
        {
          this._historyLoadTask = (Task<CloudResult<List<Message>>>) null;
        }
        else
        {
          lock (this._lock)
          {
            this.Messages = cloudResult.Entity;
            this.Messages.Reverse();
            this.UnreadCount = this.Messages.Count<Message>((Func<Message, bool>) (m => !m.ReadTime.HasValue));
            this._historyLoaded = true;
          }
        }
      }

      internal bool AddMessage(Message message)
      {
        lock (this._lock)
        {
          if (this._messageIds.Contains(message.Id))
            return false;
          this.Messages.Add(message);
          this._messageIds.Add(message.Id);
          if (message.IsReceived && !message.ReadTime.HasValue)
            ++this.UnreadCount;
          while (this.Messages.Count > MessageManager.MAX_UNREAD_HISTORY || this.Messages.Count > MessageManager.MAX_READ_HISTORY && (this.Messages[0].IsSent || this.Messages[0].ReadTime.HasValue))
          {
            this._messageIds.Remove(this.Messages[0].Id);
            this.Messages.RemoveAt(0);
          }
          return true;
        }
      }

      public void GetMessages(List<Message> messages)
      {
        lock (this._lock)
          messages.AddRange((IEnumerable<Message>) this.Messages);
      }
    }
  }
}
