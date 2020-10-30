const { AccountType } = require('./AccountType');
const { NeosAccount } = require('./NeosAccount');
class UserPatreonData {
  constructor($b) {
    if (!$b) $b = {};
    this.MIN_WORLD_ACCESS_CENTS = 600;
    this.ACTIVATION_LENGTH = 40;
    this.Email = $b.email;
    this.IsPatreonSupporter = $b.isPatreonSupporter;
    this.LastPatreonPledgeCents = $b.lastPatreonPledgeCents;
    this.LastTotalCents = $b.lastTotalCents;
    this.RewardMultiplier = $b.rewardMultiplier || null;
    this.RewardType = $b.rewardType;
    this.CustomTier = $b.customTier;
    /** @deprecated */
    this.LastPlusActivationTime = $b.lastPlusActivationTime || null;
    this.LastActivationTime = $b.lastActivationTime;
    /** @deprecated */
    this.LastPlusPledgeAmount = $b.lastPlusPledgeAmount || null;
    this.LastPaidPledgeAmount = $b.lastPaidPledgeAmount;
  }
  /**
   * @deprecated
   * @param {Date} value
   * @memberof UserPatreonData
   */
  set LastPlusActivationTime(value) {
    this.LastActivationTime = value || this.LastActivationTime;
  }
  get LastPlusActivationTime() {
    return this.LastActivationTime;
  }
  /**
   * @deprecated
   * @memberof UserPatreonData
   */
  set LastPlusPledgeAmount(value) {
    this.LastPaidPledgeAmount = value;
  }
  get LastPlusPledgeAmount() {
    return this.LastPaidPledgeAmount;
  }
  /**
   * @returns {AccountType}
   * @readonly
   * @memberof UserPatreonData
   */
  get AccountName() {
    if (this.CustomTier != null) return this.CustomTier;
    return NeosAccount.AccountName(this.CurrentAccountType);
  }
  /**
   * @returns {AccountType}
   * @readonly
   * @memberof UserPatreonData
   */
  get CurrentAccountType() {
    if (
      new Date(new Date() - this.LastActivationTime).getSeconds() /
        (1000 * 3600 * 24) <=
      40.0
    )
      return UserPatreonData.GetAccountType(this.LastPaidPledgeAmount);
    return AccountType.Normal;
  }
  get PledgedAccountType() {
    return UserPatreonData.GetAccountType(this.LastPatreonPledgeCents);
  }
  /**
   *
   * @public
   * @param {number} currentTotalCents
   * @param {Out<Boolean>} extendedPlus
   *
   * @memberof UserPatreonData
   */
  UpdatePatreonStatus(currentTotalCents, extendedPlus) {
    extendedPlus.Out = false;
    let num = currentTotalCents - this.LastTotalCents;
    if (num <= 0) {
      if (this.LastActivationTime.getFullYear() > 2016) return false;
      num = this.LastPaidPledgeAmount;
    }
    if (num > 0) {
      this.LastActivationTime = new Date();
      this.LastPaidPledgeAmount = num;
      extendedPlus.Out = true;
    }
    this.LastTotalCents = currentTotalCents;
    return true;
  }
  /**
   *
   * @private
   * @param {number} cents
   * @memberof UserPatreonData
   * @returns {AccountType}
   */
  GetAccountType(cents) {
    for (var type = AccountType.Anorak; type >= AccountType.Normal; type--) {
      if (cents >= NeosAccount.MinCents(type)) return type;
    }
    return AccountType.Normal;
  }
  get HasPledgesEnoughForPlus() {
    return (
      Math.max(this.LastPatreonPledgeCents, this.LastPaidPledgeAmount) >
      NeosAccount.MinCents(AccountType.BladeRunner)
    );
  }
  get HasPledgedEnoughForWorlds() {
    return (
      Math.max(this.LastPatreonPledgeCents, this.LastPaidPledgeAmount) >= 600
    );
  }
}
module.exports = {
  UserPatreonData,
};
