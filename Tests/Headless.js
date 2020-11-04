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
//Start NEOS Session on NeosJS Login
Neos.on("login", () => {
	Neos.AddFriend("U-bombitmanbomb"); // Ensure Friends
	const NeosVR = new HeadlessInterface(
		"F:/SteamLibrary/steamapps/common/NeosVR/HeadlessClient",
		null,
		{ Events: true }
	);
	Commands.Add(
		"run",
		function (h, s, a) {
			NeosVR.Send(a.join(" ")).then((response) => h.Reply(response));
		},
		"",
		["U-bombitmanbomb"]
	);
	NeosVR.on("error", (err) => {
		console.error(err); // Error Handling Required! Will Throw if no error listener and something goes wrong
	});
	NeosVR.on("ready", (sessionId) => {
		// Headless is ready, Emits Session ID
		Neos.SendTextMessage(
			"U-bombitmanbomb",
			`New session started: ${sessionId}`
		);
		setInterval(() => {
			Neos.CloudXInterface.GetSession(sessionId).then((session) => {
				console.log(session);
			});
		}, 10000);
		setTimeout(() => {
			NeosVR.Send("invite bombitmanbomb").then((response) => {
				console.log(response); //Unless error (ei. Not Friend) returns Invite Sent
			});
			NeosVR.Send("invite bombitmanbomb").then((response) => {
				console.log(response);
				//This will error!, .Send must wait for a previous command to finish using .then() (For Now, Queue in the works)
				// To check if you can send a message, check value of .CanSend before running Send
			});
			NeosVR.Send("invite bombitmanbomb").then((response) => {
				console.log(response); //This will also error!
			});
		}, 1000); // Library can only handle 1 response at a time (For now) I have a plan to change this
	});
});

//on CRTL+C Logout safely
process.on("SIGINT", function () {
	try {
		console.log("Logging Out All Accounts");
		Neos.Logout(true);
	} catch (e) {
		process.exit(1);
	}
	process.exit(0);
});
