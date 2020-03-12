// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.Membership
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class Membership
  {
    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string UserId { get; set; }

    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string GroupId { get; set; }

    [JsonProperty(PropertyName = "groupName")]
    [JsonPropertyName("groupName")]
    public string GroupName { get; set; }
  }
}
