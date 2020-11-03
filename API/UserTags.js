const { Uri } = require("./Uri");
const { CloudXInterface } = require("./CloudXInterface");
class UserTags {
	static get NeosTeam() {
		return "neos team";
	}
	static get NeosAdmin() {
		return "neos admin";
	}
	static get NeosModerator() {
		return "neos moderator";
	}
	static get NeosCommunityManager() {
		return "neos community manager";
	}
	static get DiagnoseRecordSync() {
		return "diagnose record sync";
	}
	static get HearingImpaired() {
		return "hearing impaired";
	}
	static get Potato() {
		return "potato";
	}
	static get Coffee() {
		return "coffee";
	}
	static get Java() {
		return "java";
	}
	static get NCC_Participant() {
		return "ncc participant";
	}
	static get NCC_Diamond() {
		return "ncc diamond";
	}
	static get NCC_Gold() {
		return "ncc gold";
	}
	static get NCC_Silver() {
		return "ncc silver";
	}
	static get NeosEast() {
		return "neos east";
	}
	static CustomBadge(neosDb, pointFiltering) {
		let str = "custom badge:" + CloudXInterface.NeosDBSignature(neosDb);
		if (pointFiltering) str += ".point";
		return str;
	}
	static GetCustomBadge(badge, pointFiltering) {
		if (!badge.startsWith("custom badge:")) {
			pointFiltering.Out = false;
			return null;
		}
		badge = badge.substr("custom badge:".length).trim();
		pointFiltering = badge.includes(".point");
		return new Uri("neosdb:///" + badge.trim());
	}
}
module.exports = {
	UserTags,
};
