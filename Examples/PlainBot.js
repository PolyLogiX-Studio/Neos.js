const NEOS = require("@bombitmanbomb/neosjs");
const Neos = new NEOS();

Neos.on("login", (loginObject) => {
	console.log(loginObject);
});
Neos.on("friendAdded", (friend) => {
	Neos.AddFriend(friend); // Accept all friend requests
});
Neos.on("messageReceived", (Message) => {
	switch (Message.MessageType) {
	case "Object":
		var object = new Neos.CloudX.Shared.Record(JSON.parse(Message.Content));
		console.log(object.Name, object.Descriptions);
		Neos.SendTextMessage(Message.SenderId, object.Name + " Looks wonderful!");
		break;
	case "Text":
		console.log(Message.SenderId + ":" + Message.Content);
	}
});

Neos.on("error", (err) => {
	throw new Error(err); // Errors are not Halted by default, you may handle errors as you see fit.
});

Neos.Login(/*Credential, Password, undefined, "TotallyRealMachineId", true*/);
