const NEOS = require("@bombitmanbomb/neosjs");
const CommandHandler = require("@bombitmanbomb/neosjs/Plugins/CommandHandler");
const Neos = new NEOS();
const Command = new CommandHandler(Neos); // Basic Command Handler
const process = require("process");

Command.Add("/ping", (Handler) => {
  Handler.Reply("Pong!");
});
Command.Add("/uptime", function (Handler) {
  Handler.Reply(process.uptime());
});
var HighFives = 0;
HighFiveLast = null;
function HighFive(Handler, SenderId) {
  HighFives++;
  Handler.Reply(
    "I have been high fived " + HighFives + HighFiveLast
      ? " times! Last by " + HighFiveLast
      : " Times!"
  );
  HighFiveLast = SenderId;
}
Command.Add("/highfive", HighFive, ["U-bombitmanbomb", "U-Hayden", "U-Neos"]); // Only bombitmanbomb, Hayden. and Neos can use this command

Neos.on("login", (loginObject) => {
  console.log(loginObject);
});
Neos.on("friendAdded", (friend) => {
  Neos.AddFriend(friend); // Accept all friend requests
});
Neos.on("messageReceived", (Message) => {
  switch (Message.MessageType) {
    case "Sound":
      Neos.SendTextMessage(
        Message.SenderId,
        "I'm sorry but I cant handle Sound Files."
      );
    case "Text":
      Command.Run(Message, { color: "red", number: 4 }); // Pass extra context/Data Usable within Command Handler
  }
});

Neos.on("error", (err) => {
  throw new Error(err); // Errors are not Halted by default, you may handle errors as you see fit.
});

Neos.Login(Credential, Password, undefined, "TotallyRealMachineId", true);
