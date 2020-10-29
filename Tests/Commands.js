if (!process.env.dotenv) require('dotenv').config()
const {
  v4: uuidv4
} = require('uuid');
const NEOS = require("../Neos");
const Neos = new NEOS();
const Neos2 = new NEOS()
const CommandHandler = require("../Plugins/CommandHandler");
const CommandExtended = require("../Plugins/CommandExtended");

// BOT ACCOUNT
const Options = {
  Prefix: "/"
} // CommandExtended options
const Commands = new CommandExtended(new CommandHandler(Neos, "No Command, Try /commands"), Options);
Commands.Add("ping", h => h.Reply("pong!"), "Ping Pong!")

Neos.on("messageReceived", Commands.Run)
Neos.Login(process.env.neosLogin, process.env.neosPassword, undefined, uuidv4())
Neos.on("login", () => {
  console.log(process.env.neosLogin + " Logged in")
})

// TESTER ACCOUNT
Neos2.on("login", () => {
  console.log(process.env.neosLoginSecond + " Logged in")
  Neos2.SendTextMessage(process.env.neosLogin, "/test")
  Neos2.SendTextMessage(process.env.neosLogin, "/commands")
  Neos2.SendTextMessage(process.env.neosLogin, "/help ping")
  Neos2.SendTextMessage(process.env.neosLogin, "/ping")
})
Neos2.on("messageReceived", (m) => {
  //if (m.SenderId == Neos2.CurrentUser.Id) return
  console.log(m.SenderId + ":" + m.Content)
})
setTimeout(() => Neos2.Login(process.env.neosLoginSecond, process.env.neosPasswordSecond, undefined, uuidv4() /* Machine ID */ ), 2000)
process.on('SIGINT', function () {
  try {
    console.log("Logging Out All Accounts")
    Neos.Logout(true);
    Neos2.Logout(true)
  } catch (e) {}
  process.exit();
});