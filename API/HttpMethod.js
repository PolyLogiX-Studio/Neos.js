const { Enumerable } = require("./Enumerable");
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
