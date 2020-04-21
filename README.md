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
    <img alt="Build" src="https://travis-ci.org/PolyLogiX-Studio/Neos.js.svg?branch=master">
    <a href="https://www.patreon.com/PolyLogiX_VR"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/@bombitmanbomb/neosjs"><img src="https://nodei.co/npm/@bombitmanbomb/neosjs.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>

# NeosJS

> Library for communicating with the NeosAPI

```js
neos.SendTextMessage("U-Neos", "This is a Message!");
```

## Usage

> npm i @bombitmanbomb/neosjs

```js
const Neos = require('NeosJS')
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
const Neos = require("@bombitmanbomb/neosjs");
const neos = new Neos({ UpdateInterval: 5000 });
```

| Option            | Type    | Description                                                               |
| ----------------- | ------- | ------------------------------------------------------------------------- |
| AutoReadMessages  | Boolean | Mark Messages as Read when Caught with `.on('messageReceived')`           |
| OnlineState       | String  | Online State: `Offline`, `Invisible`, `Away`, `Busy`, `Online`            |
| NeosVersion       | String  | Version of Neos to display, Default `NeosJS *Version*`                    |
| CompatabilityHash | String  | Compatability Hash to show Version Difference, Default `NeosJS *Version*` |
| UpdateInterval    | Number  | How Often to update with the cloud, Default `1000`                        |
| Update            | Boolean | Should the api call for updates, Default True.     |
| OAuth             | Boolean | Use NeosDB Oauth instead of a login. When true pass Login(token)  |

## Functions

<details>

<summary>Functions</summary>

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
neos.SendTextMessage("U-UserId", "Hey this is a message");
```

### `Neos.GetStatus`

<!-- YAML
added: v1.1.1
-->

Get a `UserStatus`

```js
neos.GetStatus("U-Neos").then(status => {
  //User Status
});
```

### `Neos.GetMessageHistory`

<!-- YAML
added: v1.1.1
-->

Send a `Message`, As of 1.1.2 a UserId must be supplied

```js
neos.SendTextMessage("U-UserId", "Hey this is a message");
```

</details>

## Events

<details>

<summary>Events</summary>

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->
<details>

<summary>login</summary>

The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()

```js
neos.on("login", () => {
  console.log(neos.CurrentUser); // Log the current user
});
```

</details>

### Event: `'logout'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>logout</summary>

The `neos` instance will emit a `'logout'` event **Before** a new user is assigned via `neos.Login()` and on `neos.Logout()`

```js
neos.on("logout", () => {
  console.log("User Logged Out");
});
```

</details>

### Event: `'sessionUpdated'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>sessionUpdated</summary>

The `neos` instance will emit a `'sessionUpdated'` event when the user session updates, This includes the Session Token to log in
up to 7 days without the password

```js
neos.on("sessionUpdated", session => {
  console.log(session.SessionToken); // Log the current user Token
});
```

</details>

### Event: `'sessionChanged'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>sessionChanged</summary>

The `neos` instance will emit a `'sessionChanged'` event when the user session changes

```js
neos.on("sessionChanged", session => {
  console.log(session.SessionToken); // Log the current user token
});
```

</details>

### Event: `'membershipsUpdated'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>groupUpdated</summary>

The `neos` instance will emit a `'groupUpdated'` event when a group state updates

```js
neos.on("membershipsUpdated", membership => {});
```

</details>

### Event: `'groupUpdated'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>groupUpdated</summary>

The `neos` instance will emit a `'groupUpdated'` event

```js
neos.on("groupUpdated", group => {});
```

</details>

### Event: `'groupMemberUpdated'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>groupMemberUpdated</summary>

The `neos` instance will emit a `'groupMemberUpdated'` event

```js
neos.on("groupMemberUpdated", group => {
  console.log(neos.CurrentUser); // Log the current user
});
```

</details>

### Event: `'messageReceived'`

<!-- YAML
added: v0.0.1
-->

<details>
<summary>messageReceived</summary>

The `neos` instance will emit a `'messageReceived'` event when a new message is recieved

```js
neos.on("messageReceived", message => {
  if (message.Content.toLowerCase() == "ping")
    neos.SendTextMessage(message.SenderId, "Pong");
});
```

</details>

### Event: `'messageCountChanged'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>messageCountChanged</summary>

The `neos` instance will emit a `'messageCountChanged'` event

```js
neos.on("messageCountChanged", count => {
  console.log(count); // # of messages
});
```

</details>

### Event: `'friendAdded'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>friendAdded</summary>

The `neos` instance will emit a `'friendAdded'` event when a friend request is sent or recieved

```js
neos.on("friendAdded", friend => {
  console.log(friend);
});
```

</details>

### Event: `'friendUpdated'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>friendUpdated</summary>

The `neos` instance will emit a `'friendUpdated'` event when a friend request is accepted or a status is changed

```js
neos.on("friendUpdated", friend => {
  console.log(friend);
});
```

</details>

### Event: `'friendRemoved'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>friendRemoved</summary>

The `neos` instance will emit a `'friendRemoved'` event

```js
neos.on("friendRemoved", friend => {});
```

</details>

### Event: `'friendRequestCountChanged'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>friendRequestCountChanged</summary>

The `neos` instance will emit a `'friendRequestCountChanged'` event

```js
neos.on("friendRequestCountChanged", count => {
  console.log(count);
});
```

</details>

### Event: `'friendsChanged'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>friendsChanged</summary>

The `neos` instance will emit a `'friendsChanged'` event

```js
neos.on("friendsChanged", () => {});
```

</details>

### Event: `'userUpdated'`

<!-- YAML
added: v0.0.1
-->

<details>

<summary>userUpdated</summary>

The `neos` instance will emit a `'userUpdated'` event

```js
neos.on("userUpdated", user => {
  console.log(user);
});
```

</details>

</details>

## Data

### Object `Message`

<details>

<summary>Message Parameters</summary>

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

</details>

### Object `User`

<details>
<summary>User Parameters</summary>

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
| **`Password**`**           | String                | Time message was Read               |
| **RecoveryCode**           | String                | Time message was Read               |
| **Tags**                   | DateTime \| undefined | Time message was Read               |
| **PatreonData**            | `UserPatreonData`     | Patreon Info; see `UserPatreonData` |
| **Credits**                | Object                | Credits                             |
| **ReferralId**             | String                | Referal Id                          |
| **ReferrerUserId**         | String                | Referrer                            |
| **Profile**                | `UserProfile`         | Profile Data                        |

- \*Requires Authoriation, Private
- \*\*Can't be fetched.

</details>

### Object `UserSession`

<details>
<summary>UserSession Parameters</summary>

| Parameter           | Type     | Description                  |
| ------------------- | -------- | ---------------------------- |
| **UserId**          | String   | NeosID                       |
| **SessionToken**    | String   | Session Token                |
| **SessionCreated**  | DateTime | When the session was created |
| **SessionExpire**   | DateTime | When the token Expires       |
| **SecretMachineId** | String   | Local Machine ID             |
| **RememberMe**      | Boolean  | Allow Token 7 days           |
| **`get` IsExpired** | Boolean  | Is the token Expired         |

</details>

## Changelog

See changes for each version in the [release notes](https://github.com/PolyLogiX-Studio/Neos.js/releases).

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the documentation. See the contribution guide if you'd like to submit a PR.

## License

MIT - [bombitmanbomb :cactus:](https://github.com/bombitmanbomb)
