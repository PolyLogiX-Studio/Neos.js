const { NeosAccount } = require("./NeosAccount");
const { UserPatreonData } = require("./UserPatreonData");
const { HashSet } = require("./HashSet");
const { AccountType } = require("./AccountType");
const { UserProfile } = require("./UserProfile");
class User {
	constructor($b) {
		if (!$b) $b = {};
		this.Id = $b.id;
		this.Username = $b.username;
		this.Email = $b.email;
		this.RegistrationDate = $b.registrationDate;
		this.QuotaBytes = $b.quotaBytes;
		this.UsedBytes = $b.usedBytes;
		this.IsVerified = $b.isVerified;
		this.AccountBanExpiration = $b.accountBanExpiration || new Date(0);
		this.PublicBanExpiration = $b.publicBanExpiration || new Date(0);
		this.SpectatorBanExpiration = $b.spectatorBanExpiration || new Date(0);
		this.MuteBanExpiration = $b.muteBanExpiration || new Date(0);
		this.Password = $b.password;
		this.RecoverCode = $b.recoverCode;
		this.Tags = new HashSet($b.tags);
		this.PatreonData = new UserPatreonData($b.patreonData);
		this.Credits = $b.credits;
		this.NCRDepositAddress = $b.NCRdepositAddress;
		this.ReferralId = $b.referralId;
		this.ReferrerUserId = $b.referrerUserId;
		this.Profile = new UserProfile($b.profile);
	}
	get IsAccountBanned() {
		return new Date() < this.AccountBanExpiration;
	}
	get IsPublicBanned() {
		return new Date() < this.PublicBanExpiration;
	}
	get IsSpectatorBanned() {
		return new Date() < this.SpectatorBanExpiration;
	}
	get IsMuteBanned() {
		return new Date() < this.MuteBanExpiration;
	}
	get CurrentAccountType() {
		if (this.PatreonData == null) return AccountType.Normal;
		return this.PatreonData.CurrentAccountType;
	}
	get AccountName() {
		return (
			this.PatreonData.AccountName ||
      NeosAccount.AccountName(AccountType.Normal)
		);
	}
	get IsPasswordValid() {
		return this.Password != null && this.Password.length >= 8 && true; //TODO:Count Check
	}
	get IsUsernameValid() {
		if (this.Username != null) return this.Username.length > 0;
		return false;
	}
}
module.exports = {
	User,
};
