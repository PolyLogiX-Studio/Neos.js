// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.SessionUpdate
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class SessionUpdate
  {
    [JsonProperty(PropertyName = "hostedSessions")]
    [JsonPropertyName("hostedSessions")]
    public List<SessionInfo> HostedSessions { get; set; }

    [JsonProperty(PropertyName = "removedSessions")]
    [JsonPropertyName("removedSessions")]
    public List<string> RemovedSessions { get; set; }
  }
}
