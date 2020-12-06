const { Enumerable } = require("./Enumerable");
const VerificationKeyUse = new Enumerable(["NONE", "CheckContact"]);
module.exports = { VerificationKeyUse };
