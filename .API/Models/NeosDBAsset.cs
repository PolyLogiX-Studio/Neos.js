// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.NeosDBAsset
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  [Serializable]
  public class NeosDBAsset
  {
    [JsonProperty(PropertyName = "hash")]
    [JsonPropertyName("hash")]
    public string Hash { get; set; }

    [JsonProperty(PropertyName = "bytes")]
    [JsonPropertyName("bytes")]
    public long Bytes { get; set; }
  }
}
