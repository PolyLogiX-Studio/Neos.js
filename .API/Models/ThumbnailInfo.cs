// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.ThumbnailInfo
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class ThumbnailInfo
  {
    public const int MAX_THUMBNAIL_LIFETIME_MINUTES = 10;

    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "key")]
    [JsonPropertyName("key")]
    public string Key { get; set; }
  }
}
