// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.UserStatus
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class UserStatus
  {
    public static int STATUS_RESET_SECONDS
    {
      get
      {
        return 120;
      }
    }

    public static int REMOVED_STATUS_KEEP_SECONDS
    {
      get
      {
        return 300;
      }
    }

    [JsonProperty(PropertyName = "onlineStatus")]
    [JsonPropertyName("onlineStatus")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public OnlineStatus OnlineStatus { get; set; }

    [JsonProperty(PropertyName = "lastStatusChange")]
    [JsonPropertyName("lastStatusChange")]
    public DateTime LastStatusChange { get; set; }

    [JsonProperty(PropertyName = "currentSessionId")]
    [JsonPropertyName("currentSessionId")]
    public string CurrentSessionId { get; set; }

    [JsonProperty(PropertyName = "compatibilityHash")]
    [JsonPropertyName("compatibilityHash")]
    public string CompatibilityHash { get; set; }

    [JsonProperty(PropertyName = "neosVersion")]
    [JsonPropertyName("neosVersion")]
    public string NeosVersion { get; set; }

    [JsonProperty(PropertyName = "publicRSAKey")]
    [JsonPropertyName("publicRSAKey")]
    public RSAParametersData PublicRSAKey { get; set; }

    public SessionInfo CurrentSession
    {
      get
      {
        List<SessionInfo> activeSessions = this.ActiveSessions;
        if (activeSessions == null)
          return (SessionInfo) null;
        return activeSessions.FirstOrDefault<SessionInfo>((Func<SessionInfo, bool>) (s => s.SessionId == this.CurrentSessionId));
      }
    }

    [JsonProperty(PropertyName = "activeSessions")]
    [JsonPropertyName("activeSessions")]
    public List<SessionInfo> ActiveSessions { get; set; }

    public bool IsSame(UserStatus other)
    {
      if (other == null || this.OnlineStatus != other.OnlineStatus || this.CurrentSessionId != other.CurrentSessionId)
        return false;
      List<SessionInfo> activeSessions1 = this.ActiveSessions;
      // ISSUE: explicit non-virtual call
      int num1 = activeSessions1 != null ? __nonvirtual (activeSessions1.Count) : 0;
      List<SessionInfo> activeSessions2 = this.ActiveSessions;
      // ISSUE: explicit non-virtual call
      int num2 = activeSessions2 != null ? __nonvirtual (activeSessions2.Count) : 0;
      List<SessionInfo> activeSessions3 = other.ActiveSessions;
      // ISSUE: explicit non-virtual call
      int num3 = activeSessions3 != null ? __nonvirtual (activeSessions3.Count) : 0;
      if (num2 != num3)
        return false;
      for (int index = 0; index < num1; ++index)
      {
        if (!this.ActiveSessions[index].IsSame(other.ActiveSessions[index]))
          return false;
      }
      return true;
    }

    public void SortSessions()
    {
      if (this.ActiveSessions == null)
        return;
      this.ActiveSessions.Sort((Comparison<SessionInfo>) ((a, b) =>
      {
        if (a.SessionId == this.CurrentSessionId)
          return -1;
        if (b.SessionId == this.CurrentSessionId)
          return 1;
        if (a.AwaySince.HasValue && b.AwaySince.HasValue)
          return a.AwaySince.Value.CompareTo(b.AwaySince.Value);
        return a.SessionId.CompareTo(b.SessionId);
      }));
    }
  }
}
