<div align="center">
  <br />
  <p>
    <a href="https://github.com/PolyLogiX-Studio/Neos.js"><img src="https://github.com/PolyLogiX-Studio/Neos.js/blob/master/.github/Logo.png?raw=true" width="546" alt="Neos.js" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/bRCvFy9"><img src="https://discordapp.com/api/guilds/571612136036499466/embed.png" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/@bombitmanbomb/neosjs"><img src="https://img.shields.io/npm/v/@bombitmanbomb/neosjs.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/@bombitmanbomb/neosjs"><img src="https://img.shields.io/npm/dt/@bombitmanbomb/neosjs.svg?maxAge=3600" alt="NPM downloads" /></a>
    <img alt="Build" src="https://travis-ci.com/PolyLogiX-Studio/Neos.js.svg?branch=master">
    <a href='https://coveralls.io/github/PolyLogiX-Studio/Neos.js?branch=master'><img src='https://coveralls.io/repos/github/PolyLogiX-Studio/Neos.js/badge.svg?branch=master' alt='Coverage Status' /></a>
    <a href="https://www.patreon.com/PolyLogiX_VR"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a>
    <a href="https://ko-fi.com/N4N418QV5"><img src="https://www.ko-fi.com/img/githubbutton_sm.svg" alt="Ko-Fi" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/@bombitmanbomb/neosjs"><img src="https://nodei.co/npm/@bombitmanbomb/neosjs.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>

# NeosJS

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/57ea6a99444740ab8e88006c5ae91798)](https://app.codacy.com/gh/PolyLogiX-Studio/Neos.js?utm_source=github.com&utm_medium=referral&utm_content=PolyLogiX-Studio/Neos.js&utm_campaign=Badge_Grade)

> Library for communicating with the NeosAPI

```js
neos.SendTextMessage('U-Neos', 'This is a Message!');
```

<details>

<summary>Table of Contents</summary>

- [NeosJS](#neosjs)
  - [Usage](#usage)
  - [Options](#options)
  - [Functions](#functions)
    - [`Neos.Login`](#neoslogin)
    - [`Neos.Logout`](#neoslogout)
    - [`Neos.SendTextMessage`](#neossendtextmessage)
    - [`Neos.GetStatus`](#neosgetstatus)
    - [`Neos.GetMessageHistory`](#neosgetmessagehistory)
  - [Events](#events)
    - [Event: `'login'`](#event-login)
    - [Event: `'logout'`](#event-logout)
    - [Event: `'sessionUpdated'`](#event-sessionupdated)
    - [Event: `'sessionChanged'`](#event-sessionchanged)
    - [Event: `'membershipsUpdated'`](#event-membershipsupdated)
    - [Event: `'groupUpdated'`](#event-groupupdated)
    - [Event: `'groupMemberUpdated'`](#event-groupmemberupdated)
    - [Event: `'messageReceived'`](#event-messagereceived)
    - [Event: `'messageCountChanged'`](#event-messagecountchanged)
    - [Event: `'friendAdded'`](#event-friendadded)
    - [Event: `'friendUpdated'`](#event-friendupdated)
    - [Event: `'friendRemoved'`](#event-friendremoved)
    - [Event: `'friendRequestCountChanged'`](#event-friendrequestcountchanged)
    - [Event: `'friendsChanged'`](#event-friendschanged)
    - [Event: `'userUpdated'`](#event-userupdated)
  - [Data](#data)
    - [Object `Message`](#object-message)
    - [Object `User`](#object-user)
    - [Object `UserSession`](#object-usersession)
  - [Changelog](#changelog)
  - [Contributing](#contributing)
  - [License](#license)
- [Plugins](#plugins)
  - [Plugin: `CommandHandler`](#plugin-commandhandler)
    - [`CommandHandler` Functions](#commandhandler-functions)
      - [`CommandHandler.Add`](#commandhandleradd)
      - [`CommandHandler.Run`](#commandhandlerrun)
  - [Plugin `CommandExtended`](#plugin-commandextended)
    - [`CommandExtended` Functions](#commandextended-functions)
      - [`CommandExtended.Add`](#commandextendedadd)
      - [`CommandExtended.Run`](#commandextendedrun)
      - [`CommandExtended.SetHelp`](#commandextendedsethelp)
  - [Plugin `HeadlessInterface`](#plugin-headlessinterface)
    - [HeadlessInterface Function `Send`](#headlessinterface-function-send)

</details>

## Usage

> npm i @bombitmanbomb/neosjs

```js
const Neos = require('@bombitmanbomb/neosjs')
const neos = new Neos()

neos.on("login",(obj)=>{
    console.log(obj.CurrentUser, obj.CurrentSession) // Log the current user and Session
})
neos.on("friendAdded",(friend)=>{
    if (friend.FriendStatus == "Requested") {
        neos.AddFriend(friend) // Accept the Friend Request
    }
    console.log(friend) //New Friend
})
neos.on("messageReceived",(message)=>{
    neos.SendTextMessage(message.SenderId,message.Content) // Reply recieved message back
})
neos.Login(Username<String>, Password<String>, SessionToken(optional)<String>, MachineID<String>, RememberMe<Boolean>)

```

## Options

```js
const Neos = require('@bombitmanbomb/neosjs');
const neos = new Neos({ UpdateInterval: 5000 });
```

| Option               | Type    | Description                                                                   |
| -------------------- | ------- | ----------------------------------------------------------------------------- |
| AutoReadMessages     | Boolean | Mark Messages as Read when Caught with `.on('messageReceived')`               |
| OnlineState          | String  | Online State: `Offline`, `Invisible`, `Away`, `Busy`, `Online`                |
| NeosVersion          | String  | Version of Neos to display, Default `NeosJS *Version*`                        |
| CompatabilityHash    | String  | Compatability Hash to show Version Difference, Default `NeosJS *Version*`     |
| UpdateInterval       | Number  | How Often to update internal data with the cloud, Default `1000` milliseconds |
| StatusUpdateInterval | Number  | How Often to update your Status with the cloud, Default `60` seconds          |
| Update               | Boolean | Should the api call for updates, Default True.                                |

## Functions

### `Neos.Login`

<!-- YAML
added: v1.1.1
-->

Credential must be a <Username, Email, User-Id>

If there is a session token you must set password to `undefined`

SecretMachineId must be Unique to your system, If there is a session logged in with the same machineId, the older one will be logged out. If this is left `undefined` it will log out All other sessions.

if Recovery Token is NOT `undefined`, and Matched the token on the server, the value set to `password` will become the new account password.

```js
neos.Login("Credential","Password","[SessionToken]","SecretMachineId",[RememberMe]<Boolean>,"[RecoveryToken]").then((session)=>{
    //UserSession
})
```

### `Neos.Logout`

<!-- YAML
added: v1.1.1
-->

Log out the local user. This will Invalidate the `SessionToken`

```js
neos.Logout(true);
```

### `Neos.SendTextMessage`

<!-- YAML
added: v1.1.1
-->

Send a `Message`, As of 1.1.2 a UserId must be supplied

```js
neos.SendTextMessage('U-UserId', 'Hey this is a message');
```

### `Neos.GetStatus`

<!-- YAML
added: v1.1.1
-->

Get a `UserStatus`

```js
neos.GetStatus('U-Neos').then((status) => {
  //User Status
});
```

### `Neos.GetMessageHistory`

<!-- YAML
added: v1.1.1
-->

Send a `Message`, As of 1.1.2 a UserId must be supplied

```js
neos.SendTextMessage('U-UserId', 'Hey this is a message');
```

## Events

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()

```js
neos.on('login', () => {
  console.log(neos.CurrentUser); // Log the current user
});
```

### Event: `'logout'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'logout'` event **Before** a new user is assigned via `neos.Login()` and on `neos.Logout()`

```js
neos.on('logout', () => {
  console.log('User Logged Out');
});
```

### Event: `'sessionUpdated'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'sessionUpdated'` event when the user session updates, This includes the Session Token to log in
up to 7 days without the password

```js
neos.on('sessionUpdated', (session) => {
  console.log(session.SessionToken); // Log the current user Token
});
```

### Event: `'sessionChanged'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'sessionChanged'` event when the user session changes

```js
neos.on('sessionChanged', (session) => {
  console.log(session.SessionToken); // Log the current user token
});
```

### Event: `'membershipsUpdated'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'groupUpdated'` event when a group state updates

```js
neos.on('membershipsUpdated', (membership) => {});
```

### Event: `'groupUpdated'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'groupUpdated'` event

```js
neos.on('groupUpdated', (group) => {});
```

### Event: `'groupMemberUpdated'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'groupMemberUpdated'` event

```js
neos.on('groupMemberUpdated', (group) => {
  console.log(neos.CurrentUser); // Log the current user
});
```

### Event: `'messageReceived'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'messageReceived'` event when a new message is recieved

```js
neos.on('messageReceived', (message) => {
  if (message.Content.toLowerCase() == 'ping')
    neos.SendTextMessage(message.SenderId, 'Pong');
});
```

### Event: `'messageCountChanged'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'messageCountChanged'` event

```js
neos.on('messageCountChanged', (count) => {
  console.log(count); // # of messages
});
```

### Event: `'friendAdded'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'friendAdded'` event when a friend request is sent or recieved

```js
neos.on('friendAdded', (friend) => {
  console.log(friend);
});
```

### Event: `'friendUpdated'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'friendUpdated'` event when a friend request is accepted or a status is changed

```js
neos.on('friendUpdated', (friend) => {
  console.log(friend);
});
```

### Event: `'friendRemoved'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'friendRemoved'` event

```js
neos.on('friendRemoved', (friend) => {});
```

### Event: `'friendRequestCountChanged'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'friendRequestCountChanged'` event

```js
neos.on('friendRequestCountChanged', (count) => {
  console.log(count);
});
```

### Event: `'friendsChanged'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'friendsChanged'` event

```js
neos.on('friendsChanged', () => {});
```

### Event: `'userUpdated'`

<!-- YAML
added: v0.0.1
-->

The `neos` instance will emit a `'userUpdated'` event

```js
neos.on('userUpdated', (user) => {
  console.log(user);
});
```

## Data

### Object `Message`

| Parameter          | Type                  | Description               |
| ------------------ | --------------------- | ------------------------- |
| **Id**             | String                | Message NeosID            |
| **OwnerId**        | String                | Record Owner NeosID       |
| **RecipientId**    | String                | Recipient NeosID          |
| **SenderId**       | String                | Sender NeosID             |
| **MessageType**    | String                | `MessageType`             |
| **Content**        | String \| JSON        | Contents of the Message   |
| **SendTime**       | DateTime              | Time the message was Sent |
| **LastUpdateTime** | DateTime              | Last Fetch                |
| **ReadTime**       | DateTime \| undefined | Time message was Read     |

### Object `User`

| Parameter                  | Type                  | Description                         |
| -------------------------- | --------------------- | ----------------------------------- |
| **Id**                     | String                | Message NeosID                      |
| **Username**               | String                | Record Owner NeosID                 |
| **`Email*`**               | String                | Recipient NeosID                    |
| **RegistrationDate**       | DateTime              | Sender NeosID                       |
| **QuotaBytes**             | Number                | Total Cloud Space                   |
| **UsedBytes**              | Number                | Used Cloud Space                    |
| **IsVerified**             | Boolean               | Time the message was Sent           |
| **AccountBanExpiration**   | DateTime              | Last Fetch                          |
| **PublicBanExpiration**    | DateTime              | Time message was Read               |
| **SpectatorBanExpiration** | DateTime              | Time message was Read               |
| **MuteBanExpiration**      | DateTime              | Time message was Read               |
| **`Password**`\*\*         | String                | Time message was Read               |
| **RecoveryCode**           | String                | Time message was Read               |
| **Tags**                   | DateTime \| undefined | Time message was Read               |
| **PatreonData**            | `UserPatreonData`     | Patreon Info; see `UserPatreonData` |
| **Credits**                | Object                | Credits                             |
| **ReferralId**             | String                | Referal Id                          |
| **ReferrerUserId**         | String                | Referrer                            |
| **Profile**                | `UserProfile`         | Profile Data                        |

- \*Requires Authoriation, Private
- \*\*Can't be fetched.

### Object `UserSession`

| Parameter           | Type     | Description                  |
| ------------------- | -------- | ---------------------------- |
| **UserId**          | String   | NeosID                       |
| **SessionToken**    | String   | Session Token                |
| **SessionCreated**  | DateTime | When the session was created |
| **SessionExpire**   | DateTime | When the token Expires       |
| **SecretMachineId** | String   | Local Machine ID             |
| **RememberMe**      | Boolean  | Allow Token 7 days           |
| **`get` IsExpired** | Boolean  | Is the token Expired         |

## Changelog

See changes for each version in the [release notes](https://github.com/PolyLogiX-Studio/Neos.js/releases).

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the documentation. See the contribution guide if you'd like to submit a PR.

## License

MIT - [bombitmanbomb :cactus:](https://github.com/bombitmanbomb)

# Plugins

Tools to make Development Easier.

## Plugin: `CommandHandler`

Add Commands Effortlessly

```js
const NEOS = require('@bombitmanbomb/neosjs');
const CommandHandler = require('@bombitmanbomb/neosjs/Plugins/CommandHandler');
const Neos = new NEOS(); // Create Neos Client
const Command = new CommandHandler(Neos, 'Invalid Command'); // Pass Neos client and [Error Message] (Optional)
Neos.on('messageReceived', Command.Run); // Route messages to the Command Handler Directly (Shorthand).

Command.Add('/commands', (Handler, Sender, Args) => {
  console.log(Sender + ':' + Args.join('_')); // U-bombitmanbomb:/commands Any_Text_After
  Handler.Reply(Object.keys(Command.Commands).sort().join('<br>')); // Reply to command in Neos a list of all Commands
});
Command.Add('/ping', (Handler) => Handler.Reply('pong!'));
Command.Add(
  '/send',
  (Handler, Sender, Args) => {
    if (!Args.length >= 2) return Handler.Reply('Syntax: /send U-Id Message'); // Invalid Syntax
    var user = Args.shift(); // Pull first argument (User)
    var message = Args.join(' '); // Join remaining arguments with Spaces
    Neos.SendTextMessage(user, message);
    Handler.Reply('Message Sent');
  },
  ['U-bombitmanbomb']
); // Only U-bombitmanbomb can run this command, Can pass a function as long as value returned is an Array
Neos.Login(/* Creds */);
```

### `CommandHandler` Functions

#### `CommandHandler.Add`

Add a new Command to the Interpreter

Syntax

```js
Command.Add(String Command,Function CommandScript, ?Array Whitelist);
```

#### `CommandHandler.Run`

Pass a message to the Interpreter

Syntax

```js
Command.Run(
{
  String Id,
  String OwnerId,
  String RecipientId,
  String SenderId,
  String MessageType,
  String Content,
  String SendTime,
  Date LastUpdateTime,
  Date ReadTime
});
```

## Plugin `CommandExtended`

Extended Functionality for CommandHandler

```js
const NEOS = require('@bombitmanbomb/neosjs');
const Neos = new NEOS();
const CommandHandler = require('@bombitmanbomb/neosjs/Plugins/CommandHandler');
const CommandExtended = require('@bombitmanbomb/neosjs/Plugins/CommandExtended');
const Command = new CommandExtended(new CommandHandler(Neos), {
  Prefix: '/',
  HelpCommand: 'help',
  CommandsCommand: 'commands',
  UsageCommand: 'usage',
});
Command.Add('Ping', (h) => h.Reply('pong!'), 'Ping the bot');
Command.Add('Example', (h, s, a) => h.Reply(a.join('_')), {
  index: 'Join arguments with Underscore',
  usage: 'Example [...]',
  argsExample: function (args) {
    return 'join ' + args.join(' ') + ' as ' + args.join('_');
  },
});
Neos.on('messageReceived', Command.Run);
Neos.Login(/* credentials */);
```

### `CommandExtended` Functions

#### `CommandExtended.Add`

Add a new Command to the Interpreter
Do not add a command prefix

Syntax

```js
Command.Add(String Command,Function CommandScript, (String|Object{HelpIndex:(String|Function)}) Help, ?Array[String] Whitelist);
```

#### `CommandExtended.Run`

Pass a message to the Interpreter

Syntax

```js
Command.Run(
{
  String Id,
  String OwnerId,
  String RecipientId,
  String SenderId,
  String MessageType,
  String Content,
  String SendTime,
  Date LastUpdateTime,
  Date ReadTime
});
```

#### `CommandExtended.SetHelp`

Set the help object for a command

Syntax

```js
Command.SetHelp(
  String Command,
  (String|Object) Help
);
```

## Plugin `HeadlessInterface`

Interface with a Headless Client
Example uses Command Plugin to run commands on the server

```js
const HeadlessInterface = require("@bombitmanbomb/neosjs/Plugins/HeadlessInterface");
const CommandHandler = require("@bombitmanbomb/neosjs/Plugins/HeadlessInterface");
const NEOS = require("@bombitmanbomb/neosjs");
const Neos = new NEOS({StatusInterval:0}); // Disable Status Updates - Can conflict with the Headless Status
const Command = new CommandHandler(Neos);
Neos.on("messageReceived", Command.Run); // Shorthand Hook

var Headless;
//Linux
Headless = new HeadlessInterface("/root/.steam/SteamApps/common/NeosVR/") // Pass Path to Neos Folder OR child_process.spawn() of Headless
//Default on Windows
Headless = new HeadlessInterface("C:/Program Files (x86)/Steam/SteamApps/common/NeosVR/HeadlessClient","C:/Program Files (x86)/Steam/SteamApps/common/NeosVR/HeadlessClient/Config/Config.json")
//You can also pass a custom Config location, Default Location used is /Config/Config.json

//Command will run anything after /run as if it's a command typed in the console
Command.Add("/run",(Handler, Sender, Args)=>{
  Headless.Send(Args.join(" ")).then((response)=>{
    Handler.Reply(response); // Response from Headless Client
  });
},["U-bombitmanbomb"]); // Only run for user U-bombitmanbomb

//Command will invite the user to the session
Command.Add("/inviteme", async (Handler, Sender, Args)=>{
  let CloudResult = await Neos.GetUser(Sender);
  Headless.Send(`invite ${CloudResult.Content.username}`).then((response) => {
    Handler.Reply(response) // Invite Sent if Friends
  });
});

Neos.Login("User","Pass",null,"Unique Id"); // Must pass a Unique Machine ID or it can log out the Headless Client
}
```

### HeadlessInterface Function `Send`

Send a Command to the HeadlessClient
Returns a Promise with the Response

```js
Headless.Send('invite bombitmanbomb').then((response) => console.log(response)); // Invite Sent
```
