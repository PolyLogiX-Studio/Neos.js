// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.PicturePatreon
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
