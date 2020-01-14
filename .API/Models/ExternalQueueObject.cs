// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.ExternalQueueObject`1
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class ExternalQueueObject<T>
  {
    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "popReceipt")]
    [JsonPropertyName("popReceipt")]
    public string PopReceipt { get; set; }

    [JsonProperty(PropertyName = "object")]
    [JsonPropertyName("object")]
    public T Object { get; set; }
  }
}
