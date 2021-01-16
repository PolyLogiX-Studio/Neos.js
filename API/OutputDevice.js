const { Enumerable } = require("./Enumerable");
const OutputDevice = new Enumerable(["Unknown", "Headless", "Screen", "VR"]);
module.exports = {
	OutputDevice,
};
