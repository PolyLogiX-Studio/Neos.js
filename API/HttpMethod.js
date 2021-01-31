const { Enumerable } = require("./Enumerable");
/**
 * Enumberable for AccountType
 * @readonly
 * @enum {Enumerable<string>} AccountType
 * @property {"GET"} Get
 * @property {"PUT"} Put
 * @property {"DELETE"} Delete
 * @property {"POST"} Post
 * @property {"PATCH"} Patch
 */
const HttpMethod = new Enumerable({
	Get: "GET",
	Put: "PUT",
	Delete: "DELETE",
	Post: "POST",
	Patch: "PATCH",
});
module.exports = {
	HttpMethod,
};
