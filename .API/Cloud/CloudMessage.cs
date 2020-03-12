// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.CloudMessage
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class CloudMessage
  {
    [JsonProperty(PropertyName = "Message")]
    [JsonPropertyName("Message")]
    public string Message { get; set; }

    public static string ExtractMessage(string content)
    {
      try
      {
        return JsonConvert.DeserializeObject<CloudMessage>(content)?.Message ?? content;
      }
      catch
      {
        return content;
      }
    }
  }
}
