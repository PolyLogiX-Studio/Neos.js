const { List } = require("./List");
class SearchResults {
	constructor($b) {
		this.Records = $b.records || new List();
		this.HasMoreResults = $b.hasMoreResults;
	}
	SearchResults(records, hasMore) {
		this.Records = records;
		this.HasMoreResults = hasMore;
	}
}
module.exports = {
	SearchResults,
};
