// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.PicturePatreon
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class PicturePatreon
  {
    [JsonProperty(PropertyName = "name")]
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonProperty(PropertyName = "pictureUrl")]
    [JsonPropertyName("pictureUrl")]
    public string PictureURL { get; set; }

    public PicturePatreon(string name, string url)
    {
      this.Name = name;
      this.PictureURL = url;
    }
  }
}
