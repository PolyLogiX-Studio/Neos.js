<!-- markdownlint-disable MD033 -->

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
    <img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability/PolyLogiX-Studio/Neos.js">
    <a href="https://inch-ci.org/github/PolyLogiX-Studio/Neos.js"><img alt="Docs" src="http://inch-ci.org/github/PolyLogiX-Studio/Neos.js.svg?branch=master"></a>
    <a href="https://github.com/ahmadawais/Emoji-Log/"><img alt="emoji-log" src="https://cdn.rawgit.com/ahmadawais/stuff/ca97874/emoji-log/non-flat-round.svg" /></a>
    </p>
    <p>
    <a href="https://nodei.co/npm/@bombitmanbomb/neosjs"><img src="https://nodei.co/npm/@bombitmanbomb/neosjs.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>

# ドキュメンテーション

ドキュメントの全文を見る [こちら](https://polylogix-studio.github.io/Neos.js/)、
Neos.js は JSDoc Intellisense を使用しています。

# サポートしています

Neos.js の開発に協力しませんか？
[Patreon](https://www.patreon.com/PolyLogiX_VR)への寄付や、[KoFi](https://ko-fi.com/polylogix_studio)への寄付を検討してみてください。

コードを投稿してみませんか？私たちの[コントリビューターガイド](CONTRIBUTING.md)を読んでください!

質問や支援については、[Support Issue](https://github.com/PolyLogiX-Studio/Neos.js/issues/new/choose)を開くか、[よくあるご質問](#よくあるご質問)を確認した後、[Discord](https://discord.gg/6y2A4Pk)に参加してください。

[開発時間配分を見る](https://wakatime.com/@bombitmanbomb/projects/ukduiihxzq)

<div><p>
    <a href="https://ko-fi.com/N4N418QV5"><img src="https://www.ko-fi.com/img/githubbutton_sm.svg" alt="Ko-Fi" /></a>
    </p><p><a href="https://www.patreon.com/PolyLogiX_VR"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a>
  </p>
  </div>

[![Open Source Love svg3](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)](CONTRIBUTING.md)

# NeosJS

> NeosAPI と通信するためのモジュール

```js
neos.SendTextMessage("U-Neos", "これはメッセージだ！");
```

## 使用方法

> npm i @bombitmanbomb/neosjs

```js
const Neos = require('@bombitmanbomb/neosjs')
const neos = new Neos()

neos.on("login",(obj)=>{
    console.log(obj.CurrentUser, obj.CurrentSession) // 現在のユーザーとセッションのログ
})
neos.on("friendAdded",(friend)=>{
    if (friend.FriendStatus == "Requested") {
        neos.AddFriend(friend) // 友達申請を承認する
    }
    console.log(friend) //新しい友達
})
neos.on("messageReceived",(message)=>{
    neos.SendTextMessage(message.SenderId,message.Content) // 返信メッセージを受信しました。
})
neos.Login(Username<String>, Password<String>, SessionToken(optional)<String>, MachineID<String>, RememberMe<Boolean>)

```

# よくあるご質問

## ブラウザで Neos.js を実行することはできますか

> いいえ、NeosVR CORS ポリシーでは、ブラウザからのリクエストを拒否します。Node サーバーからのリクエストを行う必要があります。初めての方は Glitch.me をお勧めします。

## ブラウザのサポートを追加しますか

> これは Neos サーバによって課せられた制限であり、回避策は非常に限られています。
> と同様に**非常に安全ではない**。

## プリリリース版を使うにはどうすればいいですか

> ほとんどの注目すべきプレリリース版は [NPM](https://www.npmjs.com/package/@bombitmanbomb/neosjs) で入手可能です。
> このような場合には、「-alpha」は不安定、「-beta」は使用可能だがバグがあるかもしれない、「-rc」は次のビルドのリリース候補であり、安定しているはずだ、ということになります。特定のバージョンを使うには<br>`npm install @bombitmanbomb/neosjs@version`を使ってください。

## YZ をやると X が壊れる / NeosJs に X をやらせることができるか

> フィードバックとバグ報告は Neosjs を維持する上で非常に重要です。バグを報告したり機能を要求したりする最良の方法は、[Issues](https://github.com/PolyLogiX-Studio/Neos.js/issues/new/choose)で行います。

# プラグイン

人気のプラグインはこちらに掲載されています。

## neosjs-commands

ボットにコマンドを追加するのを超簡単にするライブラリ。

[Github](https://github.com/PolyLogiX-Studio/neosjs-commands), [NPM](https://www.npmjs.com/package/neosjs-commands)

## neosjs-headless-interface

プログラム的なヘッドレスインターフェースセッション。

[Github](https://github.com/PolyLogiX-Studio/neosjs-headless-interface), [NPM](https://www.npmjs.com/package/neosjs-headless-interface)
