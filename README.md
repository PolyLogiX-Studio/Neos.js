<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

API Library for NeosVR. This is NOT a client for the Neos Numerical Optimisation Server, Find that at [neos-js](https://github.com/fruchtfolge/neos-js)

<div align="center">
  <br />
  <p>
    <a href="https://github.com/PolyLogiX-Studio/Neos.js"><img src="https://github.com/PolyLogiX-Studio/Neos.js/blob/master/.github/Logo.png?raw=true" width="546" alt="Neos.js" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/6y2A4Pk"><img src="https://discordapp.com/api/guilds/571612136036499466/embed.png" alt="Discord server" /></a>
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/PolyLogiX-Studio/Neos.js">
    <a href="https://www.npmjs.com/package/@bombitmanbomb/neosjs"><img src="https://img.shields.io/npm/v/@bombitmanbomb/neosjs.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/@bombitmanbomb/neosjs"><img src="https://img.shields.io/npm/dt/@bombitmanbomb/neosjs.svg?maxAge=3600" alt="NPM downloads" /></a>
    <img alt="Build" src="https://travis-ci.com/PolyLogiX-Studio/Neos.js.svg?branch=master">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/PolyLogiX-Studio/Neos.js">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/PolyLogiX-Studio/Neos.js">
    <a href="https://www.codacy.com/gh/PolyLogiX-Studio/Neos.js/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=PolyLogiX-Studio/Neos.js&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/c6eca36829154d05993cbaffb8172caa"/></a>
    <a href="https://lgtm.com/projects/g/PolyLogiX-Studio/Neos.js/alerts/"><img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/PolyLogiX-Studio/Neos.js.svg?logo=lgtm&logoWidth=18"/></a>
    <a href="https://lgtm.com/projects/g/PolyLogiX-Studio/Neos.js/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/PolyLogiX-Studio/Neos.js.svg?logo=lgtm&logoWidth=18"/></a>
    <a href="https://github.com/ahmadawais/Emoji-Log/"><img alt="emoji-log" src="https://cdn.rawgit.com/ahmadawais/stuff/ca97874/emoji-log/non-flat-round.svg" /></a>
    </p><a href="https://wakatime.com/badge/github/PolyLogiX-Studio/Neos.js"><img src="https://wakatime.com/badge/github/PolyLogiX-Studio/Neos.js.svg"></a>
    <p>
    <a href="https://nodei.co/npm/@bombitmanbomb/neosjs"><img src="https://nodei.co/npm/@bombitmanbomb/neosjs.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>

<!-- omit in toc -->

# Table of Contents

<!-- TOC -->

- [Documentation](#documentation)
- [Support](#support)
- [NeosJS](#neosjs)
  - [Usage](#usage)
- [FAQ](#faq)
- [Plugins](#plugins)
  - [neosjs-commands](#neosjs-commands)
  - [neosjs-headless-interface](#neosjs-headless-interface)
- [Changelog](#changelog)

<!-- /TOC -->

# Documentation

View Full Documentation [HERE](https://polylogix-studio.github.io/Neos.js/)
Neos.js uses [JSDoc](https://github.com/jsdoc/jsdoc) and the [docdash](https://github.com/clenemt/docdash). IntelliSense is set up for VSCode.

# Support

Do you want to help with Neos.js Development?
Consider pledging to our [Patreon](https://www.patreon.com/PolyLogiX_VR) or Donating to us on [KoFi](https://ko-fi.com/polylogix_studio)

Want to submit Code? Read our [Contributors Guide](.github/CONTRIBUTING.md)!

For Questions or Assistance open a [Discussion](https://github.com/PolyLogiX-Studio/Neos.js/discussions?discussions_q=category%3AQ%26A) or join our [Discord](https://discord.gg/6y2A4Pk) after checking our [FAQ](#faq)

[View Development Time Allocation](https://wakatime.com/@bombitmanbomb/projects/ukduiihxzq)

<div><p>
    <a href="https://ko-fi.com/N4N418QV5"><img src="https://www.ko-fi.com/img/githubbutton_sm.svg" alt="Ko-Fi" /></a>
    </p><p><a href="https://www.patreon.com/PolyLogiX_VR"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a>
  </p>
  </div>

[![Open Source Love svg3](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)](.github/CONTRIBUTING.md)

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

# FAQ

<details>
<summary>Can I run Neos.js in my Browser</summary>
<br>

> No, NeosVR CORS Policy denies browser requests.
> You must make requests from a Node server. Personally I use [Glitch](https://www.glitch.com).

</details>
<details>
<summary>Will you add Browser Support</summary>
<br>

> This is a limitation imposed by the Neos server and workarounds are Very limited,
> as well as **extremely** _Unsafe_.

</details>
<details>
<summary>How do I use a Pre-Release Version</summary>
<br>

> Most notable Pre-Release versions are available on [NPM](https://www.npmjs.com/package/@bombitmanbomb/neosjs).
> -alpha is Unstable, -beta is Usable but might have bugs, -rc is the Release Candidate for the next build and **Should** be stable. To use a specific version use <br>`npm install @bombitmanbomb/neosjs@version`

</details>
<details>
<summary>X breaks when I do YZ / Can you make NeosJs do X</summary>
<br>

> Feedback and Bug reports are Very important to maintaining Neosjs, The best way to report a bug or ask for a feature is via [Issues](https://github.com/PolyLogiX-Studio/Neos.js/issues/new/choose)

</details>

# Plugins

Popular Plugins will be listed Here

## neosjs-commands

Library that makes adding commands to the bot super simple.

[Github](https://github.com/PolyLogiX-Studio/neosjs-commands), [NPM](https://www.npmjs.com/package/neosjs-commands)

## neosjs-headless-interface

Programatic Headless Interface Session.

[Github](https://github.com/PolyLogiX-Studio/neosjs-headless-interface), [NPM](https://www.npmjs.com/package/neosjs-headless-interface)

# Changelog

View [Changelog](/CHANGELOG.md)
