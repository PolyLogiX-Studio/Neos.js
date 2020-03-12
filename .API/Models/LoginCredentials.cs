// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.LoginCredentials
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class LoginCredentials
  {
    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    [JsonProperty(PropertyName = "username")]
    [JsonPropertyName("username")]
    public string Username { get; set; }

    [JsonProperty(PropertyName = "email")]
    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonProperty(PropertyName = "password")]
    [JsonPropertyName("password")]
    public string Password { get; set; }

    [JsonProperty(PropertyName = "recoverCode")]
    [JsonPropertyName("recoverCode")]
    public string RecoverCode { get; set; }

    [JsonProperty(PropertyName = "sessionCode")]
    [JsonPropertyName("sessionCode")]
    public string SessionToken { get; set; }

    [JsonProperty(PropertyName = "secretMachineId")]
    [JsonPropertyName("secretMachineId")]
    public string SecretMachineId { get; set; }

    [JsonProperty(PropertyName = "rememberMe")]
    [JsonPropertyName("rememberMe")]
    public bool RememberMe { get; set; }

    public void Preprocess()
    {
      this.Username = this.Username?.Trim();
      this.Email = this.Email?.Trim()?.ToLower();
    }

    [JsonIgnore]
    public bool IsPasswordValid
    {
      get
      {
        return CryptoHelper.IsValidPassword(this.Password);
      }
    }
  }
}
