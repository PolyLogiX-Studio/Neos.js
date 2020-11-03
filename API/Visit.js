const { Uri } = require("./Uri");
String.IsNullOrWhiteSpace = function (str) {
	if (!str) return true;
	if (str.trim() === "") return true;
	return false;
};
class Visit {
	constructor($b) {
		if (!$b) $b = {};
		this.URL = $b.url || new Uri();
		this.UserId = $b.userId || new String();
		this.NeosSessionID = $b.neosSessionID || new String();
		this.RecordVersion = $b.recordVersion || new Number();
		this.Duration = $b.duration || new Number();
		this.Start = $b.start || new Date();
		this.End = $b.end || new Date();
		this.Referal = $b.referal || new String();
	}
	get IsValid() {
		return (
			this.Start.getFullYear() >= 2016 &&
      !(this.Start >= this.End) &&
      (this.End - this.Start).getSeconds() >= this.Duration &&
      !String.IsNullOrWhiteSpace(this.URL._rawUrl)
		);
	}
}
module.exports = {
	Visit,
};
