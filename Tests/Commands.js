if (!process.env.dotenv) require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const NEOS = require('../Neos');
const Neos = new NEOS({
  updateInterval: 3,
});
const Neos2 = new NEOS({
  updateInterval: 3,
});
const CommandHandler = require('../Plugins/CommandHandler');
const CommandExtended = require('../Plugins/CommandExtended');

// BOT ACCOUNT
const Options = {
  Prefix: '/',
}; // CommandExtended options
const Commands = new CommandExtended(
  new CommandHandler(Neos, 'No Command, Try /commands'),
  Options
);
const TestFunction = (h, s, a) => {
  if (a.length == 0) return h.Reply('Not enough Arguments');
  return h.Reply(a.join('_'));
};
const TestHelp = {
  index: 'Join arguments with Underscore',
  usage: 'Usage: test ...args',
  test: function (args) {
    return 'Test usage: Join ' + args.join(' ') + ' with underscores.';
  },
};
Commands.Add('ping', (h) => h.Reply('pong!'), 'Ping Pong!');
Commands.Add('test', TestFunction, TestHelp);
Commands.Add('test1', TestFunction, TestHelp);
Commands.Add('test2', TestFunction, TestHelp);
Commands.Add('test3', TestFunction, TestHelp);
Commands.Add('test4', TestFunction, TestHelp);
Commands.Add('test5', TestFunction, TestHelp);
Commands.Add('test6', TestFunction, TestHelp);
Commands.Add('test7', TestFunction, TestHelp);
Commands.Add('test8', TestFunction, TestHelp);
Commands.Add('test9', TestFunction, TestHelp);
Commands.Add('test10', TestFunction, TestHelp);
Commands.Add('test11', TestFunction, TestHelp);
Commands.Add('test12', TestFunction, TestHelp);
Commands.Add('test13', TestFunction, TestHelp);
Commands.Add('test14', TestFunction, TestHelp);
Commands.Add('test15', TestFunction, TestHelp);
Commands.Add('test16', TestFunction, TestHelp);
Commands.Add('test17', TestFunction, TestHelp);
Commands.Add('test18', TestFunction, TestHelp);
Commands.Add('test19', TestFunction, TestHelp);
Commands.Add('test20', TestFunction, TestHelp);

Neos.on('messageReceived', Commands.Run);
Neos.Login(
  process.env.NEOS_LOGIN,
  process.env.NEOS_PASSWORD,
  undefined,
  uuidv4()
);
Neos.on('login', () => {
  console.log(process.env.NEOS_LOGIN + ' Logged in');
  console.log(Neos.CommandHandler.CommandExtended);
  Neos.AddFriend(process.env.NEOS_LOGIN_SECOND); // Ensure Friends
});

// TESTER ACCOUNT
Neos2.on('login', () => {
  console.log(process.env.NEOS_LOGIN_SECOND + ' Logged in');
  Neos2.AddFriend(process.env.NEOS_LOGIN); // Ensure Friends
  Neos2.SendTextMessage(process.env.NEOS_LOGIN, '/help ping');
  Neos2.SendTextMessage(process.env.NEOS_LOGIN, '/commands');
  Neos2.SendTextMessage(process.env.NEOS_LOGIN, '/commands 2');
});

Neos2.on('messageReceived', (m) => {
  if (m.SenderId != process.env.NEOS_LOGIN) return;
  console.log(m.SenderId + ':' + m.Content);
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
process.on('SIGINT', function () {
  try {
    console.log('Logging Out All Accounts');
    Neos.Logout(true);
    Neos2.Logout(true);
  } catch (e) {}
  process.exit(0);
});
