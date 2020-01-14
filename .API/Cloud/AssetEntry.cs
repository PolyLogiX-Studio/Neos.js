// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.AssetEntry`1
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class AssetEntry<E> where E : class, new()
  {
    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    [JsonIgnore]
    [JsonIgnore]
    public string AssetHash
    {
      get
      {
        if (this.OwnerId == null || !this.OwnerId.StartsWith("A-"))
          throw new Exception("OwnerId is invalid, cannot extract asset hash from it");
        return this.OwnerId.Substring("A-".Length);
      }
      set
      {
        this.OwnerId = "A-" + value;
      }
    }

    [JsonProperty(PropertyName = "entry")]
    [JsonPropertyName("entry")]
    public E Entry { get; set; }

    [JsonProperty(PropertyName = "computeLock")]
    [JsonPropertyName("computeLock")]
    public ComputationLock ComputeLock { get; set; }
  }
}
