// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.SessionUpdate
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
