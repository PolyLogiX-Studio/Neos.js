// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.CloudVariable
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
