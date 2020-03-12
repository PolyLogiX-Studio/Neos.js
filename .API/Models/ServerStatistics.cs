// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.ServerStatistics
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
