const fetch = require("node-fetch");
const NEOS = require("@bombitmanbomb/neosjs");
const CommandHandler = require("@bombitmanbomb/neosjs/Plugins/CommandHandler");
const CommandExtended = require("@bombitmanbomb/neosjs/Plugins/CommandExtended");
const process = require("process");
const Neos = new NEOS({
  Update: true,
  OnlineState: "Online",
  OAuth: false,
  StatusInterval: 120,
});
const Commands = new CommandExtended(
  new CommandHandler(
    Neos,
    "Invalid Command, Try <br>/commands <page>" /* Command Failure Response, No Functions Yet */
  ),
  {
    CommandsCommand: "commands",
    HelpCommand: "help",
    UsageCommand: "usage",
    Prefix: "/",
  } // Define the Extended Internal Commands and Settings
);
const Admins = ["U-bombitmanbomb"];
api.use(bodyparser);
Neos.on("login", (obj) => {
  console.log(__dirname, "Logged in as " + Neos.CurrentUser.Username);
});
Neos.on("friendAdded", (friend) => {
  if (friend.FriendStatus == "Requested") {
    Neos.AddFriend(friend.FriendUserId);
    console.log("Friendrequest Accepted: " + friend.FriendUsername);
  }
});

Neos.on("messageReceived", (m) => {
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
Commands.Add("ping", (Handler) => Handler.Reply("pong!"), "Ping Pong!");
Commands.Add(
  "uptime",
  (Handler) => Handler.Reply(process.uptime() + "s"),
  "Get the bot uptime."
);
Commands.Add(
  "joke",
  (Handler, Sender, Args) => {
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((d) => d.json())
      .then((joke) => {
        console.log(joke);
        Handler.Reply(joke.setup);
        setTimeout(() => Handler.Reply(joke.punchline), 2000);
      });
  },
  {
    index: "Tell a Bad Joke",
    categories: (args) => {
      return "This function will return help info programaically";
    },
    usage: "/joke [category]",
  }
);
Commands.Add(
  "send",
  (H, S, A) => {
    Neos.SendTextMessage(A.shift(), A.join(" ")).then((d) => {
      if (d.State == 200) {
        H.Reply("Message Sent!");
      } else {
        H.Reply("Message Failed!");
      }
    });
  },
  {
    index: "[Owner Command]<br>Relay a Message",
    usage: "/send U-ID Message",
  },
  Admins
);
Commands.Add(
  "ﾃｽﾄ",
  (h) => {
    h.Reply("テスト成功！");
  },
  "これはﾃｽﾄ"
); // Unicode Works Too!

Commands.Add(
  "subscribe",
  (h, s, a = []) => {
    if (a.length != 1) {
      return h.Usage(); // Extended wraps Usage and Help to the Helper, Usage is a shortcut for Help('usage');
    }
    h.Reply("You succeeded! Something could happen here with a[0]");
  },
  {
    index: function (args) {
      return "Subscribe to a feed<br>Help Pages: usage, channels";
    },
    channels: (args) => {
      return "No Channels Available"; //Yet
    },
    usage: Commands.Options.Prefix + "subscribe <channel>",
  }
);
Neos.Login(Username, Password, undefined, "POLYLOGIXDEVELPERBOT");
