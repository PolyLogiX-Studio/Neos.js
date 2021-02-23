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
	static get NeosModerationLead() {
		return "neos moderation lead";
	}
	static get NeosMentor() {
		return "neos mentor";
	}
	static get NeosPro() {
		return "neos pro";
	}
	static get NeosEast() {
		return "neos east";
	}
	static get NeosSpain() {
		return "neos spain";
	}
	static get HTC_Vive() {
		return "htc vive";
	}
	static get ExternalPatreon() {
		return "external patreon";
	}
	static get DiagnoseRecordSync() {
		return "diagnose record sync";
	}
	static get HearingImpaired() {
		return "hearing impaired";
	}
	static get ColorBlind() {
		return "color blind";
	}
	static get Mute() {
		return "mute";
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
		pointFiltering.Out = badge.includes(".point");
		return new Uri("neosdb:///" + badge.trim());
	}
	static GetCustom3DBadge(badge) {
		if (!badge.startsWith("custom 3D badge:")) return null;
		badge = badge.substr("custom 3D badge:".length).trim();
		return new Uri("neosrec:///" + badge.trim());
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
	static get MMC_Participant() {
		return "mmc participant";
	}
	static get MMC_Cow() {
		return "mmc cow";
	}
	static get MMC_Lips() {
		return "mmc lips";
	}
	static get MMC_World1st() {
		return "mmc world 1st";
	}
	static get MMC_World2nd() {
		return "mmc world 2nd";
	}
	static get MMC_World3rd() {
		return "mmc world 3rd";
	}
	static get MMC_Avatar1st() {
		return "mmc avatar 1st";
	}
	static get MMC_Avatar2nd() {
		return "mmc avatar 2nd";
	}
	static get MMC_Avatar3rd() {
		return "mmc avatar 3rd";
	}
	static get MCC_Other1st() {
		return "mmc other 1st";
	}
	static get MCC_Other2nd() {
		return "mmc other 2nd";
	}
	static get MCC_Other3rd() {
		return "mmc other 3rd";
	}
}
module.exports = {
	UserTags,
};
