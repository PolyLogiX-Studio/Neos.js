// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.FriendManager
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
  public class FriendManager
  {
    public static float UPDATE_PERIOD_SECONDS = 5f;
    private Dictionary<string, Friend> friends = new Dictionary<string, Friend>();
    private Dictionary<string, SessionInfo> _friendSessions = new Dictionary<string, SessionInfo>();
    private object _lock = new object();
    private DateTime? lastStatusUpdate;
    private DateTime lastRequest;
    private bool _friendsChanged;

    public CloudXInterface Cloud { get; private set; }

    public int FriendRequestCount { get; private set; }

    public FriendManager(CloudXInterface cloud)
    {
      this.Cloud = cloud;
    }

    public int FriendCount
    {
      get
      {
        return this.friends.Count;
      }
    }

    public void GetFriends(List<Friend> list)
    {
      lock (this._lock)
      {
        foreach (KeyValuePair<string, Friend> friend in this.friends)
          list.Add(friend.Value);
      }
    }

    public void ForeachFriend(Action<Friend> action)
    {
      lock (this._lock)
      {
        foreach (KeyValuePair<string, Friend> friend in this.friends)
          action(friend.Value);
      }
    }

    public int GetFriendSessions(List<SessionInfo> sessions)
    {
      lock (this._lock)
      {
        foreach (KeyValuePair<string, SessionInfo> friendSession in this._friendSessions)
          sessions.Add(friendSession.Value);
        return this._friendSessions.Count;
      }
    }

    public void ForeachFriendSession(Action<SessionInfo> action)
    {
      lock (this._lock)
      {
        foreach (KeyValuePair<string, SessionInfo> friendSession in this._friendSessions)
          action(friendSession.Value);
      }
    }

    public Friend GetFriend(string friendId)
    {
      lock (this._lock)
      {
        Friend friend;
        if (this.friends.TryGetValue(friendId, out friend))
          return friend;
      }
      return (Friend) null;
    }

    public Friend FindFriend(Predicate<Friend> predicate)
    {
      lock (this._lock)
      {
        foreach (KeyValuePair<string, Friend> friend in this.friends)
        {
          if (predicate(friend.Value))
            return friend.Value;
        }
      }
      return (Friend) null;
    }

    public bool IsFriend(string userId)
    {
      lock (this._lock)
      {
        Friend friend;
        if (this.friends.TryGetValue(userId, out friend))
          return friend.FriendStatus == FriendStatus.Accepted;
        return false;
      }
    }

    public void AddFriend(string friendId)
    {
      this.AddFriend(new Friend()
      {
        FriendUserId = friendId,
        FriendUsername = friendId.Substring(2),
        FriendStatus = FriendStatus.Accepted
      });
    }

    public void AddFriend(Friend friend)
    {
      friend.OwnerId = this.Cloud.CurrentUser.Id;
      friend.FriendStatus = FriendStatus.Accepted;
      this.Cloud.UpsertFriend(friend);
      lock (this._lock)
        this.AddedOrUpdated(friend);
    }

    public void RemoveFriend(Friend friend)
    {
      friend.OwnerId = this.Cloud.CurrentUser.Id;
      friend.FriendStatus = FriendStatus.Ignored;
      this.Cloud.DeleteFriend(friend);
      lock (this._lock)
        this.Removed(friend);
    }

    public void IgnoreRequest(Friend friend)
    {
      friend.OwnerId = this.Cloud.CurrentSession.UserId;
      friend.FriendStatus = FriendStatus.Ignored;
      this.Cloud.UpsertFriend(friend);
      lock (this._lock)
        this.AddedOrUpdated(friend);
    }

    public event Action<Friend> FriendAdded;

    public event FriendManager.FriendUpdate FriendUpdated;

    public event Action<Friend> FriendRemoved;

    public event Action FriendsChanged;

    public event Action<int> FriendRequestCountChanged;

    private void AddedOrUpdated(Friend friend)
    {
      Friend old;
      if (!this.friends.TryGetValue(friend.FriendUserId, out old))
      {
        this.friends.Add(friend.FriendUserId, friend);
        Action<Friend> friendAdded = this.FriendAdded;
        if (friendAdded != null)
          friendAdded(friend);
      }
      else
      {
        this.friends[friend.FriendUserId] = friend;
        FriendManager.FriendUpdate friendUpdated = this.FriendUpdated;
        if (friendUpdated != null)
          friendUpdated(friend, old);
      }
      this._friendsChanged = true;
    }

    private void Removed(Friend friend)
    {
      this.friends.Remove(friend.FriendUserId);
      Action<Friend> friendRemoved = this.FriendRemoved;
      if (friendRemoved != null)
        friendRemoved(friend);
      this._friendsChanged = true;
    }

    internal void Reset()
    {
      foreach (KeyValuePair<string, Friend> friend in this.friends)
      {
        Action<Friend> friendRemoved = this.FriendRemoved;
        if (friendRemoved != null)
          friendRemoved(friend.Value);
      }
      this.friends.Clear();
      this.lastStatusUpdate = new DateTime?();
      this.lastRequest = new DateTime();
    }

    internal void Update()
    {
      if (this._friendsChanged)
      {
        this._friendsChanged = false;
        int num;
        lock (this._lock)
        {
          num = this.friends.Count<KeyValuePair<string, Friend>>((Func<KeyValuePair<string, Friend>, bool>) (f =>
          {
            if (f.Value.FriendStatus == FriendStatus.Requested)
              return f.Value.FriendUserId != this.Cloud.CurrentUser.Id;
            return false;
          }));
          this._friendSessions.Clear();
          foreach (KeyValuePair<string, Friend> friend in this.friends)
          {
            if (friend.Value.UserStatus?.ActiveSessions != null)
            {
              foreach (SessionInfo activeSession in friend.Value.UserStatus.ActiveSessions)
              {
                if (activeSession.AccessLevel == SessionAccessLevel.Friends && !this._friendSessions.ContainsKey(activeSession.SessionId))
                  this._friendSessions.Add(activeSession.SessionId, activeSession);
              }
            }
          }
        }
        if (num != this.FriendRequestCount)
        {
          this.FriendRequestCount = num;
          Action<int> requestCountChanged = this.FriendRequestCountChanged;
          if (requestCountChanged != null)
            requestCountChanged(this.FriendRequestCount);
        }
        Action friendsChanged = this.FriendsChanged;
        if (friendsChanged != null)
          friendsChanged();
      }
      if (this.Cloud.CurrentUser == null || (DateTime.Now - this.lastRequest).TotalSeconds < (double) FriendManager.UPDATE_PERIOD_SECONDS)
        return;
      this.lastRequest = DateTime.Now;
      Task.Run((Func<Task>) (async () =>
      {
        CloudResult<List<Friend>> friends = await this.Cloud.GetFriends(this.lastStatusUpdate);
        if (!friends.IsOK)
          return;
        lock (this._lock)
        {
          foreach (Friend friend in friends.Entity)
          {
            if (friend.UserStatus != null)
              this.lastStatusUpdate = new DateTime?(MathX.Max(this.lastStatusUpdate.GetValueOrDefault(), friend.UserStatus.LastStatusChange));
            this.AddedOrUpdated(friend);
          }
        }
      }));
    }

    public delegate void FriendUpdate(Friend updated, Friend old);
  }
}
