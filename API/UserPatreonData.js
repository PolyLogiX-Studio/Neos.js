const { AccountType } = require("./AccountType");
const { NeosAccount } = require("./NeosAccount");
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
	UpdatePatreonStatus(
		currentTotalUnits,
		currencyRate,
		findMatchingPledge,
		extendedPlus
	) {
		extendedPlus.Out = false;
		let flag = false;
		if (this.LastTotalUnits == 0 && this.LastTotalCents > 0) {
			this.LastTotalUnits = this.LastTotalCents;
			flag = true;
		}
		let num1 = currentTotalUnits - this.LastTotalUnits;
		//TODO Approximate Currency Rate
		let num2 = num1 + (this.ExternalCents - this.LastExternalCents);
		if (num2 <= 0) {
			if (this.LastActivationTime > 2016) return flag;
			num2 = this.LastPaidPledgeAmount;
		}
		if (num2 <= 0) return flag;
		this.LastActivationTime = new Date();
		this.LastPaidPledgeAmount = num2;
		extendedPlus.Out = true;
		this.LastTotalCents += num2;
		this.LastTotalUnits = currentTotalUnits;
		this.LastExternalCents = this.ExternalCents;
		this.UpdateMetadata();
		return true;
	}
	UpdateMetadata() {
		this.HasSupported = this.LastTotalCents > 0;
		this.LastIsAnorak = this.LastTotalCents >= 50000;
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
