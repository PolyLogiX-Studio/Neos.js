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
Neos.Login(process.env.NEOS_LOGIN, process.env.NEOS_PASSWORD, undefined, uuidv4())
Neos.on("login", () => {
  console.log(process.env.NEOS_LOGIN + " Logged in")
})

// TESTER ACCOUNT
Neos2.on("login", () => {
  TEST.Test()
  console.log(process.env.NEOS_LOGIN_SECOND + " Logged in")
})

Neos2.on("messageReceived", (m) => {
  if (m.SenderId != process.env.NEOS_LOGIN) return
  console.log(m.SenderId + ":" + m.Content)
  TEST.Next()
})
setTimeout(() => Neos2.Login(process.env.NEOS_LOGIN_SECOND, process.env.NEOS_PASSWORD_SECOND, undefined, uuidv4() /* Machine ID */ ), 2000)
setTimeout(() => {
  process.exit(1)
}, 25000);
process.on('SIGINT', function () {
  try {
    console.log("Logging Out All Accounts")
    Neos.Logout(true);
    Neos2.Logout(true)
  } catch (e) {}
  process.exit(0);
});
const TEST = {
  tests:[],
  Create(test){
    this.tests.push(test)
  },
  Test()  {
    let test = this.tests.shift()
    test()
  },
  Next(){
    console.log("Next Test")
    var test = this.tests.shift()
    if (!test){
      try {
        console.log("Logging Out All Accounts")
        Neos.Logout(true);
        Neos2.Logout(true)
      } catch (e) {}
      return process.exit(0)
    }
    console.log(test)
    test()
  }
}

TEST.Create(()=>{console.log("Send /test");Neos2.SendTextMessage(process.env.NEOS_LOGIN, "/test")})
TEST.Create(()=>{console.log("Send /commands");Neos2.SendTextMessage(process.env.NEOS_LOGIN, "/commands")})
TEST.Create(()=>{console.log("Send /help ping");Neos2.SendTextMessage(process.env.NEOS_LOGIN, "/help ping")})
TEST.Create(()=>{console.log("Send /ping");Neos2.SendTextMessage(process.env.NEOS_LOGIN, "/ping")})