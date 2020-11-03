if (!process.env.dotenv) require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const NEOS = require("../Neos");
const Neos = new NEOS({
	updateInterval: 3,
	StatusInterval: 0,
});

const CommandHandler = require("../Plugins/CommandHandler");
const CommandExtended = require("../Plugins/CommandExtended");
const HeadlessInterface = require("../Plugins/HeadlessInterface");

// BOT ACCOUNT
const Options = {
	Prefix: "/",
}; // CommandExtended options
const Commands = new CommandExtended(
	new CommandHandler(Neos, "No Command, Try /commands"),
	Options
);

Neos.on("messageReceived", Commands.Run);
Neos.Login(
	process.env.NEOS_LOGIN,
	process.env.NEOS_PASSWORD,
	undefined,
	uuidv4()
);

Neos.on("login", () => {
	Neos.AddFriend("U-bombitmanbomb"); // Ensure Friends
	const NeosVR = new HeadlessInterface(
		"F:/SteamLibrary/steamapps/common/NeosVR/HeadlessClient",
		null,
		{ Events: true }
	);
	function runCommand(h, s, a) {
		NeosVR.Send(a.join(" ")).then((response) => h.Reply(response));
	}
	Commands.Add("run", runCommand, "", ["U-bombitmanbomb"]);
	NeosVR.Events.on("HeadlessResponse", (data) => {
		if (data.startsWith("World running...")) {
			NeosVR.Send("invite bombitmanbomb").then(() => {
				NeosVR.Send("message bombitmanbomb \"this is a test\"");
			});
		}
	});
});

process.on("SIGINT", function () {
	try {
		console.log("Logging Out All Accounts");
		Neos.Logout(true);
		Neos2.Logout(true);
	} catch (e) {}
	process.exit(0);
});
