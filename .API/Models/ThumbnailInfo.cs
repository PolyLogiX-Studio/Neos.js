// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.ThumbnailInfo
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
