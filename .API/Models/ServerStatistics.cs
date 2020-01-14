// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.ServerStatistics
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class ServerStatistics
  {
    [JsonProperty(PropertyName = "lastUpdate")]
    [JsonPropertyName("lastUpdate")]
    public DateTime LastUpdate { get; set; }

    [JsonProperty(PropertyName = "responseTimeMilliseconds")]
    [JsonPropertyName("responseTimeMilliseconds")]
    public long ResponseTimeMilliseconds { get; set; }
  }
}
