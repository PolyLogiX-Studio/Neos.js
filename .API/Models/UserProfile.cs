// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.UserProfile
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class UserProfile
  {
    public static int MAX_SHOWCASE_ITEMS
    {
      get
      {
        return 6;
      }
    }

    [JsonProperty(PropertyName = "iconUrl")]
    [JsonPropertyName("iconUrl")]
    public string IconUrl { get; set; }

    [JsonProperty(PropertyName = "backgroundUrl")]
    [JsonPropertyName("backgroundUrl")]
    public string BackgroundUrl { get; set; }

    [JsonProperty(PropertyName = "tagline")]
    [JsonPropertyName("tagline")]
    public string Tagline { get; set; }

    [JsonProperty(PropertyName = "description")]
    [JsonPropertyName("description")]
    public string Description { get; set; }

    [JsonProperty(PropertyName = "profileWorldUrl")]
    [JsonPropertyName("profileWorldUrl")]
    public string ProfileWorldUrl { get; set; }

    [JsonProperty(PropertyName = "showcaseItems")]
    [JsonPropertyName("showcaseItems")]
    public List<string> ShowcaseItems { get; set; }

    [JsonProperty(PropertyName = "tokenOptOut")]
    [JsonPropertyName("tokenOptOut")]
    public List<string> TokenOptOut { get; set; }

    [JsonIgnore]
    [JsonIgnore]
    public bool IsValid
    {
      get
      {
        List<string> showcaseItems = this.ShowcaseItems;
        return (showcaseItems != null ? __nonvirtual (showcaseItems.Count) : 0) <= UserProfile.MAX_SHOWCASE_ITEMS;
      }
    }

    public bool AcceptsToken(string token)
    {
      return this.TokenOptOut == null || !this.TokenOptOut.Any<string>((Func<string, bool>) (s => s.Equals(token, StringComparison.InvariantCultureIgnoreCase)));
    }
  }
}
