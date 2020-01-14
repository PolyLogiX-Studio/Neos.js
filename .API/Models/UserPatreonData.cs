// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.UserPatreonData
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class UserPatreonData
  {
    public const int MIN_WORLD_ACCESS_CENTS = 600;
    public const int ACTIVATION_LENGTH = 40;

    [NullOnExternal]
    [JsonProperty(PropertyName = "email")]
    [JsonPropertyName("email")]
    public string Email { get; set; }

    [JsonProperty(PropertyName = "isPatreonSupporter")]
    [JsonPropertyName("isPatreonSupporter")]
    public bool IsPatreonSupporter { get; set; }

    [JsonProperty(PropertyName = "lastPatreonPledgeCents")]
    [JsonPropertyName("lastPatreonPledgeCents")]
    public int LastPatreonPledgeCents { get; set; }

    [JsonProperty(PropertyName = "lastTotalCents")]
    [JsonPropertyName("lastTotalCents")]
    public int LastTotalCents { get; set; }

    [JsonProperty(PropertyName = "rewardMultiplier")]
    [JsonPropertyName("rewardMultiplier")]
    public double? RewardMultiplier { get; set; }

    [JsonProperty(PropertyName = "rewardType")]
    [JsonPropertyName("rewardType")]
    public string RewardType { get; set; }

    [JsonProperty(PropertyName = "customTier")]
    [JsonPropertyName("customTier")]
    public string CustomTier { get; set; }

    [Obsolete]
    [JsonProperty(PropertyName = "lastPlusActivationTime")]
    [JsonPropertyName("lastPlusActivationTime")]
    public DateTime LastPlusActivationTime
    {
      get
      {
        return this.LastActivationTime;
      }
      set
      {
        this.LastActivationTime = value;
      }
    }

    [JsonProperty(PropertyName = "lastActivationTime")]
    [JsonPropertyName("lastActivationTime")]
    public DateTime LastActivationTime { get; set; }

    [Obsolete]
    [JsonProperty(PropertyName = "lastPlusPledgeAmount")]
    [JsonPropertyName("lastPlusPledgeAmount")]
    public int LastPlusPledgeAmount
    {
      get
      {
        return this.LastPaidPledgeAmount;
      }
      set
      {
        this.LastPaidPledgeAmount = value;
      }
    }

    [JsonProperty(PropertyName = "lastPaidPledgeAmount")]
    [JsonPropertyName("lastPaidPledgeAmount")]
    public int LastPaidPledgeAmount { get; set; }

    public string AccountName
    {
      get
      {
        if (this.CustomTier != null)
          return this.CustomTier;
        return NeosAccount.AccountName(this.CurrentAccountType);
      }
    }

    public AccountType CurrentAccountType
    {
      get
      {
        if ((DateTime.UtcNow - this.LastActivationTime).TotalDays <= 40.0)
          return UserPatreonData.GetAccountType(this.LastPaidPledgeAmount);
        return AccountType.Normal;
      }
    }

    public AccountType PledgedAccountType
    {
      get
      {
        return UserPatreonData.GetAccountType(this.LastPatreonPledgeCents);
      }
    }

    public bool UpdatePatreonStatus(int currentTotalCents, out bool extendedPlus)
    {
      extendedPlus = false;
      int num = currentTotalCents - this.LastTotalCents;
      if (num <= 0)
      {
        if (this.LastActivationTime.Year > 2016)
          return false;
        num = this.LastPaidPledgeAmount;
      }
      if (num > 0)
      {
        this.LastActivationTime = DateTime.UtcNow;
        this.LastPaidPledgeAmount = num;
        extendedPlus = true;
      }
      this.LastTotalCents = currentTotalCents;
      return true;
    }

    private static AccountType GetAccountType(int cents)
    {
      for (AccountType type = AccountType.Anorak; type >= AccountType.Normal; --type)
      {
        if (cents >= NeosAccount.MinCents(type))
          return type;
      }
      return AccountType.Normal;
    }

    [JsonIgnore]
    [JsonIgnore]
    public bool HasPledgedEnoughForPlus
    {
      get
      {
        return Math.Max(this.LastPatreonPledgeCents, this.LastPaidPledgeAmount) >= NeosAccount.MinCents(AccountType.BladeRunner);
      }
    }

    [JsonIgnore]
    [JsonIgnore]
    public bool HasPledgedEnoughForWorlds
    {
      get
      {
        return Math.Max(this.LastPatreonPledgeCents, this.LastPaidPledgeAmount) >= 600;
      }
    }
  }
}
