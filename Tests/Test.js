if (!process.env.dotenv) require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const NEOS = require("../Neos");
const Neos = new NEOS({
	updateInterval: 3,
});
const Neos2 = new NEOS({
	updateInterval: 3,
});
Neos.Login(
	process.env.NEOS_LOGIN,
	process.env.NEOS_PASSWORD,
	undefined,
	uuidv4()
);
Neos.on("error", (err) => console.trace(err));
Neos.on("login", () => {
	console.log(process.env.NEOS_LOGIN + " Logged in");
	Neos.AddFriend(process.env.NEOS_LOGIN_SECOND);
});

// TESTER ACCOUNT
Neos2.on("login", () => {
	console.log(process.env.NEOS_LOGIN_SECOND + " Logged in");
	Neos2.AddFriend(process.env.NEOS_LOGIN);
});

Neos2.on("messageReceived", (m) => {
	if (m.SenderId != process.env.NEOS_LOGIN) return;
	console.log(m.SenderId + ":" + m.Content);
});
setTimeout(
	() =>
		Neos2.Login(
			process.env.NEOS_LOGIN_SECOND,
			process.env.NEOS_PASSWORD_SECOND,
			undefined,
			uuidv4() /* Machine ID */
		),
	2000
); // Offset Login to prevent 429 error
setTimeout(() => {
	process.exit(0);
}, 30000);
process.on("SIGINT", function () {
	try {
		console.log("Logging Out All Accounts");
		Neos.Logout(true);
		Neos2.Logout(true);
	} catch (e) {
		throw Error(e);
	}
	process.exit(0);
});
