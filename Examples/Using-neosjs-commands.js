const NEOS = require("@bombitmanbomb/neosjs");
const {CommandManager} = require("neosjs-commands");
const process = require("process");
const Neos = new NEOS({
  Update: true,
  OnlineState: "Online",
  OAuth: false,
  StatusInterval: 120
});

// Create Command Module
const Commands = CommandManager.CreateCommands(Neos, "Invalid Command, Try <br>/commands <page>")
const Admins = ["U-bombitmanbomb"]; // Admin Whitelist

Neos.on("login", obj => {
  console.log(__dirname, "Logged in as " + Neos.CurrentUser.Username);
});

// Handle incoming friend requests
Neos.on("friendAdded", friend => {
  if (friend.FriendStatus == "Requested") { // Add friend if incoming request
    Neos.AddFriend(friend.FriendUserId);
  }
});

// Handle incoming messages
Neos.on("messageReceived", m => {
  switch (m.MessageType) {
    case "Text":
      return Commands.Run(m);
    default:
      Neos.SendTextMessage(
        m.SenderId,
        "Only Text Messages are supported at this time."
      );
  }
});

// Custom Session List
Neos.on("statusUpdate", () => {
  fetch("https://www.neosvr-api.com/api/sessions")
    .then(d => d.json())
    .then(sessions => {
      let sessionList = [];
      for (let session of sessions) {
        // Add sessions by PolyLogiX, running a world, that are not Empty
        if (
          session.correspondingWorldId &&
          session.correspondingWorldId.ownerId == "G-PolyLogiX" &&
          session.activeUsers > 0
        )
          sessionList.push(new Neos.CloudX.Shared.SessionInfo(session));
      }
      Neos.Status.ActiveSessions = sessionList;
    });
});


/**
 * Setup Command Handles
 */

//Ping Pong!
Commands.Add("ping", Handler => Handler.Reply("pong!"), "Ping Pong!");

// Return how long the process has been running
Commands.Add(
  "uptime",
  Handler => {
    var uptime = process.uptime();
    const date = new Date(uptime * 1000);
    const days = date.getUTCDate() - 1,
    hours = date.getUTCHours(),
    minutes = date.getUTCMinutes(),
    seconds = date.getUTCSeconds()
    let segments = [];
    if (days > 0) segments.push(days + " day" + (days == 1 ? "" : "s"));
    if (hours > 0) segments.push(hours + " hour" + (hours == 1 ? "" : "s"));
    if (minutes > 0)
      segments.push(minutes + " minute" + (minutes == 1 ? "" : "s"));
    if (seconds > 0)
      segments.push(seconds + " second" + (seconds == 1 ? "" : "s"));
    const dateString = segments.join(", ");
    Handler.Reply(dateString);
  },
  "Get the bot uptime"
);

// Commands work in Async
Commands.Add(
  "joke",
  (Handler) => {
    fetch("https://official-joke-api.appspot.com/jokes/random") // Fetch a joke
      .then(d => d.json())
      .then(joke => {
        console.log(joke);
        Handler.Reply(joke.setup);
        setTimeout(() => Handler.Reply(joke.punchline), 2000); 
        // Responses must be a minimum 1100ms apart to send in the correct order
      }).catch((err)=>{
        console.log(err)
        Handler.Reply("Something went Wrong!")
      })
  },
  {
    index: "Tell me a Joke",
    categories: args => {
      return "This function would return help info programaically";
    },
    usage: "/joke [category]"
  }
);

// Relay Command
Commands.Add(
  "send",
  (Handler, SenderId, Arguments) => {
    Neos.SendTextMessage(Arguments.shift(), Arguments.join(" ")).then(d => {
      if (d.State == 200) {
        Handler.Reply("Message Sent!");
      } else {
        Handler.Reply("Message Failed!");
      }
    });
  },
  {
    index: "[Owner Command]<br>Relay a Message",
    please: "No",
    usage: "/send U-ID Message"
  },
  Admins // Whitelist to Admin Array
);

// Usage Function example
Commands.Add(
  "subscribe",
  (h, s, a = []) => {
    if (a.length != 1) {
      return h.Usage();
    }
    h.Reply("You succeeded! Command not implimented yet");
  },
  {
    index: function(args = [], self) { 
      // You can also use a Function in the help index!
      // Self refers to the this scope of the current command object and can refrence or call other indexes
      if (args.length === 0)
        return "Usage: " + self.usage
      return args.join(" ")
    },
    usage: Commands.Options.Prefix + "subscribe <channel>"
  }
);

//Login
Neos.Login(
    process.env.Login,
    process.env.Password,
    undefined, // Session Token can be used instead of Password if available
    "RandomUUIDv4"
);
