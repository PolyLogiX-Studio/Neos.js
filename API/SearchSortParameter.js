const { Enumerable } = require("./Enumerable");
const SearchSortParameter = new Enumerable([
	"CreationDate",
	"LastUpdateDate",
	"FirstPublishTime",
	"TotalVisits",
	"Name",
]);
module.exports = {
	SearchSortParameter,
};
