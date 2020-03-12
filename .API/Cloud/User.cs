// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.User
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class User
  {
    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "username")]
    [JsonPropertyName("username")]
    public string Username { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "email")]
    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonProperty(PropertyName = "registrationDate")]
    [JsonPropertyName("registrationDate")]
    public DateTime RegistrationDate { get; set; }

    [JsonProperty(PropertyName = "quotaBytes")]
    [JsonPropertyName("quotaBytes")]
    public long QuotaBytes { get; set; } = -1;

    [JsonProperty(PropertyName = "usedBytes")]
    [JsonPropertyName("usedBytes")]
    public long UsedBytes { get; set; } = -1;

    [JsonProperty(PropertyName = "isVerified")]
    [JsonPropertyName("isVerified")]
    public bool IsVerified { get; set; }

    [JsonProperty(PropertyName = "accountBanExpiration")]
    [JsonPropertyName("accountBanExpiration")]
    public DateTime AccountBanExpiration { get; set; }

    [JsonProperty(PropertyName = "publicBanExpiration")]
    [JsonPropertyName("publicBanExpiration")]
    public DateTime PublicBanExpiration { get; set; }

    [JsonProperty(PropertyName = "spectatorBanExpiration")]
    [JsonPropertyName("spectatorBanExpiration")]
    public DateTime SpectatorBanExpiration { get; set; }

    [JsonProperty(PropertyName = "muteBanExpiration")]
    [JsonPropertyName("muteBanExpiration")]
    public DateTime MuteBanExpiration { get; set; }

    [JsonIgnore]
    public bool IsAccountBanned
    {
      get
      {
        return DateTime.UtcNow < this.AccountBanExpiration;
      }
    }

    [JsonIgnore]
    public bool IsPublicBanned
    {
      get
      {
        return DateTime.UtcNow < this.PublicBanExpiration;
      }
    }

    [JsonIgnore]
    public bool IsSpectatorBanned
    {
      get
      {
        return DateTime.UtcNow < this.SpectatorBanExpiration;
      }
    }

    [JsonIgnore]
    public bool IsMuteBanned
    {
      get
      {
        return DateTime.UtcNow < this.MuteBanExpiration;
      }
    }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "password")]
    [JsonPropertyName("password")]
    public string Password { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "recoverCode")]
    [JsonPropertyName("recoverCode")]
    public string RecoverCode { get; set; }

    [JsonProperty(PropertyName = "tags")]
    [JsonPropertyName("tags")]
    public List<string> Tags { get; set; }

    [JsonProperty(PropertyName = "patreonData")]
    [JsonPropertyName("patreonData")]
    public UserPatreonData PatreonData { get; set; }

    [JsonProperty(PropertyName = "credits")]
    [JsonPropertyName("credits")]
    public Dictionary<string, Decimal> Credits { get; set; }

    [JsonProperty(PropertyName = "NCRdepositAddress")]
    [JsonPropertyName("NCRdepositAddress")]
    public string NCRDepositAddress { get; set; }

    [JsonProperty(PropertyName = "referralId")]
    [JsonPropertyName("referralId")]
    public string ReferralId { get; set; }

    [JsonProperty(PropertyName = "referrerUserId")]
    [JsonPropertyName("referrerUserId")]
    public string ReferrerUserId { get; set; }

    [JsonIgnore]
    public AccountType CurrentAccountType
    {
      get
      {
        UserPatreonData patreonData = this.PatreonData;
        if (patreonData == null)
          return AccountType.Normal;
        return patreonData.CurrentAccountType;
      }
    }

    [JsonIgnore]
    public string AccountName
    {
      get
      {
        return this.PatreonData?.AccountName ?? NeosAccount.AccountName(AccountType.Normal);
      }
    }

    [JsonProperty(PropertyName = "profile")]
    [JsonPropertyName("profile")]
    public UserProfile Profile { get; set; }

    [JsonIgnore]
    public bool IsPasswordValid
    {
      get
      {
        return this.Password != null && this.Password.Length >= 8 && this.Password.Count<char>((Func<char, bool>) (c => char.IsDigit(c))) != 0 && (this.Password.Count<char>((Func<char, bool>) (c => char.IsLetter(c))) != 0 && this.Password.Count<char>((Func<char, bool>) (c => char.IsLower(c))) != 0) && this.Password.Count<char>((Func<char, bool>) (c => char.IsUpper(c))) != 0;
      }
    }

    [JsonIgnore]
    public bool IsUsernameValid
    {
      get
      {
        if (this.Username != null)
          return this.Username.Length > 0;
        return false;
      }
    }
  }
}
