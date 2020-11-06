<!-- markdownlint-disable MD033 -->

<div align="center">
  <br />
  <p>
    <a href="https://github.com/PolyLogiX-Studio/Neos.js"><img src="https://github.com/PolyLogiX-Studio/Neos.js/blob/master/.github/Logo.png?raw=true" width="546" alt="Neos.js" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/6y2A4Pk"><img src="https://discordapp.com/api/guilds/571612136036499466/embed.png" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/@bombitmanbomb/neosjs"><img src="https://img.shields.io/npm/v/@bombitmanbomb/neosjs.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/@bombitmanbomb/neosjs"><img src="https://img.shields.io/npm/dt/@bombitmanbomb/neosjs.svg?maxAge=3600" alt="NPM downloads" /></a>
    <img alt="Build" src="https://travis-ci.com/PolyLogiX-Studio/Neos.js.svg?branch=master">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/PolyLogiX-Studio/Neos.js">
    <a href="https://www.patreon.com/PolyLogiX_VR"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a>
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/PolyLogiX-Studio/Neos.js">
    <a href="https://www.codacy.com/gh/PolyLogiX-Studio/Neos.js/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=PolyLogiX-Studio/Neos.js&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/c6eca36829154d05993cbaffb8172caa"/></a>
    <img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability/PolyLogiX-Studio/Neos.js">
    <a href="https://ko-fi.com/N4N418QV5"><img src="https://www.ko-fi.com/img/githubbutton_sm.svg" alt="Ko-Fi" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/@bombitmanbomb/neosjs"><img src="https://nodei.co/npm/@bombitmanbomb/neosjs.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>

# Support

Do you want to help with Neos.js Development?
Consider pledging to our [Patreon](https://www.patreon.com/PolyLogiX_VR) or Donating to us on [KoFi](https://ko-fi.com/polylogix_studio)

Want to submit Code? Read our [Contributors Guide](CONTRIBUTNIG.md)!

For Questions or Assistance open a [Support Issue](https://github.com/PolyLogiX-Studio/Neos.js/issues/new/choose) or join our [Discord](https://discord.gg/6y2A4Pk)


# NeosJS

> Library for communicating with the NeosAPI

```js
neos.SendTextMessage("U-Neos", "This is a Message!");
```

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

View Full Documentation [HERE](https://polylogix-studio.github.io/Neos.js/)
