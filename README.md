# NeosJS

> Library for communicating with the NeosAPI

```js
neos.SendMessage('U-Neos',"This is a Message!")
```

## Usage

```sh
npm install NeosJS
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
const Neos = require('NeosJS')
const neos = new Neos()

neos.on("login",()=>{
    console.log(neos.CurrentUser) // Log the current user
})
```

## Changelog

See changes for each version in the [release notes](https://github.com/PolyLogiX-Studio/Neos.js/releases).

## License

MIT - [bombitmanbomb :cactus:](https://github.com/bombitmanbomb)