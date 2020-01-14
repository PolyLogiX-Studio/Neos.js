// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.CloudVariable
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class CloudVariable
  {
    [JsonProperty("ownerId")]
    [JsonPropertyName("ownerId")]
    public string VariableOwnerId { get; set; }

    [JsonProperty("path")]
    [JsonPropertyName("path")]
    public string Path { get; set; }

    [JsonProperty("value")]
    [JsonPropertyName("value")]
    public string Value { get; set; }

    public void GetDefinitionPath(out string ownerId, out string subpath)
    {
      CloudVariable.GetDefinitionPath(this.Path, out ownerId, out subpath);
    }

    public static void GetDefinitionPath(string path, out string ownerId, out string subpath)
    {
      int length = path.IndexOf('.');
      ownerId = path.Substring(0, length);
      subpath = path.Substring(length + 1);
    }
  }
}
