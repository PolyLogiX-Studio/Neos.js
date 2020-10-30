if (!process.env.dotenv) require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const NEOS = require('../Neos');
const Neos = new NEOS({
  updateInterval: 2,
});
const Neos2 = new NEOS({
  updateInterval: 2,
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
Commands.Add('ping', (h) => h.Reply('pong!'), 'Ping Pong!');

Neos.on('messageReceived', Commands.Run);
Neos.Login(
  process.env.NEOS_LOGIN,
  process.env.NEOS_PASSWORD,
  undefined,
  uuidv4()
);
Neos.on('login', () => {
  console.log(process.env.NEOS_LOGIN + ' Logged in');
});

// TESTER ACCOUNT
Neos2.on('login', () => {
  console.log(process.env.NEOS_LOGIN_SECOND + ' Logged in');
  Neos2.SendTextMessage(process.env.NEOS_LOGIN, '/test').then(() => {
    Neos2.SendTextMessage(process.env.NEOS_LOGIN, '/commands').then(() => {
      Neos2.SendTextMessage(process.env.NEOS_LOGIN, '/help ping').then(() => {
        Neos2.SendTextMessage(process.env.NEOS_LOGIN, '/ping');
      });
    });
  });
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
);
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
