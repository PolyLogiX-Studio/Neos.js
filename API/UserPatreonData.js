const { AccountType } = require("./AccountType");
const { List } = require("./List");
const { NeosAccount } = require("./NeosAccount");
const { PatreonSnapshot } = require("./PatreonSnapshot");
class UserPatreonData {
	constructor($b) {
		if (!$b) $b = {};
		this.MIN_WORLD_ACCESS_CENTS = 600;
		this.ACTIVATION_LENGTH = 40;
		this.Email = $b.email;
		this.LastPatreonEmail = $b.lastPatreonEmail;
		this.IsPatreonSupporter = $b.isPatreonSupporter;
		this.PatreonID = $b.patreonId;
		this.LastPatreonPledgeCents = $b.lastPatreonPledgeCents;
		this.LastTotalCents = $b.lastTotalCents;
		this.MinimumTotalUnits = $b.minimumTotalUnits;
		this.ExternalCents = $b.externalCents;
		this.LastExternalCents = $b.lastExternalCents;
		this.HasSupported = $b.hasSupported;
		this.LastIsAnorak = $b.lastIsAnorak;
		this.RewardType = $b.rewardType;
		this.CustomTier = $b.customTier;
		this.PriorityIssue = $b.priorityIssue;
		/**@type {Date} */
		this.LastActivationTime =
			$b.lastActivationTime instanceof Date
				? $b.lastActivationTime
				: new Date($b.lastActivationTime || 0);
		this.LastPaidPledgeAmount = $b.lastPaidPledgeAmount;
		if ($b.snapshots instanceof List) {
			this.Snapshots = $b.snapshots;
		} else {
			let Snapshots = new List();
			if (Array.isArray($b.snapshots)) {
				for (let snapshot of $b.snapshots) {
					Snapshots.Add(
						snapshot instanceof PatreonSnapshot
							? snapshot
							: new PatreonSnapshot(snapshot)
					);
				}
			}
			this.Snapshots = Snapshots;
		}
	}
	/**
	 * @returns {AccountType}
	 * @readonly
	 * @memberof UserPatreonData
	 */
	get AccountName() {
		if (this.CustomTier != null) return this.CustomTier;
		return this.LastPaidPledgeAmount == 6900 ||
			this.LastPatreonPledgeCents == 6900
			? "Nice."
			: NeosAccount.AccountName(this.CurrentAccountType);
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
	get CurrentAccountCents() {
		return Math.floor((new Date() - this.LastActivationTime) / 86400000) <= 40
			? this.LastPaidPledgeAmount
			: 0;
	}
	get PledgedAccountType() {
		return UserPatreonData.GetAccountType(this.LastPatreonPledgeCents);
	}
	/**.
	 * //TODO REDO
	 *
	 * @public
	 * @param {number} currentTotalCents
	 * @param currentTotalCents
	 * @param currencyRate
	 * @param findMatchingPledge
	 * @param {Out<boolean>} extendedPlus
	 *
	 * @memberof UserPatreonData
	 */
	UpdatePatreonStatus(
		currentTotalCents,
		currencyRate,
		findMatchingPledge,
		extendedPlus
	) {
		if (
			currentTotalCents < this.MinimumTotalUnits &&
			this.MinimumTotalUnits > 0
		) {
			currentTotalCents = this.MinimumTotalUnits;
			currencyRate = 1.0;
		}
		extendedPlus.Out = false;
		let flag = false;
		if (this.LastTotalUnits === 0 && this.LastTotalCents > 0) {
			this.LastTotalUnits = this.LastTotalCents;
			flag = true;
		}
		let num1 = currentTotalCents - this.LastTotalUnits;
		//TODO Approximate Currency Rate
		let num2 = num1 + (this.ExternalCents - this.LastExternalCents);
		if (num2 <= 0) {
			if (this.LastActivationTime.getFullYear > 2016) return flag;
			num2 = this.LastPaidPledgeAmount;
		}
		if (num2 <= 0) return flag;
		this.LastActivationTime = new Date();
		this.LastPaidPledgeAmount = num2;
		extendedPlus.Out = true;
		this.LastTotalCents += num2;
		this.LastTotalUnits = currentTotalCents;
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
