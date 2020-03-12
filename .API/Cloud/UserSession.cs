// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.UserSession
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class UserSession
  {
    [JsonProperty(PropertyName = "userId")]
    [JsonPropertyName("userId")]
    public string UserId { get; set; }

    [JsonProperty(PropertyName = "token")]
    [JsonPropertyName("token")]
    public string SessionToken { get; set; }

    [JsonProperty(PropertyName = "created")]
    [JsonPropertyName("created")]
    public DateTime SessionCreated { get; set; }

    [JsonProperty(PropertyName = "expire")]
    [JsonPropertyName("expire")]
    public DateTime SessionExpire { get; set; }

    [NullOnExternal]
    [JsonProperty(PropertyName = "secretMachineId")]
    [JsonPropertyName("secretMachineId")]
    public string SecretMachineId { get; set; }

    [JsonProperty(PropertyName = "rememberMe")]
    [JsonPropertyName("rememberMe")]
    public bool RememberMe { get; set; }

    [JsonIgnore]
    public bool IsExpired
    {
      get
      {
        return DateTime.UtcNow > this.SessionExpire.ToUniversalTime();
      }
    }
  }
}
