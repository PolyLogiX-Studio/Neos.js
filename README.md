# NeosJS



> Library for communicating with the NeosAPI

```js
neos.SendMessage('U-Neos',"This is a Message!")
```

## Usage

```sh
npm i @bombitmanbomb/neosjs
```

```js
const Neos = require('NeosJS')
const neos = new Neos()

neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
neos.on("friendAdded",(friend)=>{
    console.log(friend) //New Friend
})
neos.on("messageReceived",(message)=>{
    neos.SendTextMessage(message.SenderId,UserId,Message){
    
})
neos.Login(Username<String>, Password<String>, SessionToken(optional)<String>, MachineID<String>, RememberMe<Boolean>)

```


## Events

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'logout'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'logout'` event **Before** a new user is assigned via `neos.Login()` and on `neos.Logout()`
```js
neos.on("logout",()=>{
    console.log("User Logged Out")
})
```

### Event: `'sessionUpdated'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'sessionUpdated'` event when the user session changes, This includes the Session Token to log in 
up to 7 days without the password

```js
neos.on("sessionUpdated",(session)=>{
    console.log(session.SessionToken) // Log the current user Token
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

### Event: `'login'`

<!-- YAML
added: v0.0.1
-->


The `neos` instance will emit a `'login'` event when a new user is assigned via `neos.Login()
```js
neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

## Data

### Object `Message`

| Parameter | Type | Description |
| --- | --- | --- |
| **Id** | String | Message NeosID |
| **OwnerId** | String | Record Owner NeosID|
| **RecipientId** | String | Recipient NeosID |
| **SenderId** | String | Sender NeosID |
| **MessageType** | String | `MessageType` |
| **Content** | String \| JSON| Contents of the Message |
| **SendTime** | DateTime | Time the message was Sent |
| **LastUpdateTime** | DateTime | Last Fetch |
| **ReadTime** | DateTime \| undefined | Time message was Read |

### Object `User`

| Parameter | Type | Description |
| --- | --- | --- |
| **Id** | String | Message NeosID |
| **Username** | String | Record Owner NeosID|
| **`Email*`** | String | Recipient NeosID |
| **RegistrationDate** | DateTime | Sender NeosID |
| **QuotaBytes** | Number | Total Cloud Space |
| **UsedBytes** | Number | Used Cloud Space |
| **IsVerified** | Boolean | Time the message was Sent |
| **AccountBanExpiration** | DateTime | Last Fetch |
| **PublicBanExpiration** | DateTime | Time message was Read |
| **SpectatorBanExpiration** | DateTime | Time message was Read |
| **MuteBanExpiration** | DateTime| Time message was Read |
| **`Password**`** | String | Time message was Read |
| **RecoveryCode** | String| Time message was Read |
| **Tags** | DateTime \| undefined | Time message was Read |
| **PatreonData** | `UserPatreonData` | Patreon Info; see `UserPatreonData`  |
| **Credits** | Object | Credits |
| **ReferralId** | String | Referal Id|
| **ReferrerUserId** | String | Referrer|
| **Profile** | `UserProfile` | Profile Data |

- \*Requires Authoriation, Private
- \*\*Can't be fetched.

### Object `UserSession`

| Parameter | Type | Description |
| --- | --- | --- |
| **UserId** | String | NeosID |
| **SessionToken** | String | Session Token |
| **SessionCreated** | DateTime | When the session was created |
| **SessionExpire** | DateTime | When the token Expires |
| **SecretMachineId** | String | Local Machine ID |
| **RememberMe** | Boolean | Allow Token 7 days |
| **`get` IsExpired** | Boolean | Is the token Expired |

## Changelog

See changes for each version in the [release notes](https://github.com/PolyLogiX-Studio/Neos.js/releases).

## License

MIT - [bombitmanbomb :cactus:](https://github.com/bombitmanbomb)