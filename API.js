const uuidv4 = require('uuid/v4')
const fetch = require('node-fetch')
const AsyncLock = require('async-lock')
const Lock = new AsyncLock()
const URI = require('uri-js')
const testSessionData = [{ "name": "PoKe Stadium", "description": "Pokeballs and Pokemon!", "tags": [], "sessionId": "827ac337-98af-4dc3-96fc-2c4c45709e89", "hostUserId": "U-MechaTurk", "hostMachineId": "eyx1im8qmuipomejx2cghq", "hostUsername": "MechaTurk", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://827ac337-98af-4dc3-96fc-2c4c45709e89/"], "sessionUsers": [{ "username": "MechaTurk", "userID": "U-MechaTurk", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/94ff099e-fbab-4fe1-800d-b9428384d452.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": true, "sessionBeginTime": "2020-02-01T20:04:53.379037Z", "lastUpdate": "2020-02-02T16:19:23.4506503Z", "awaySince": "2020-02-02T08:40:12.475562Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "The Directory", "description": "Find a Public Folder your looking for!", "tags": [], "sessionId": "d9f5cbd9-4563-4db0-b8ad-a9ba548a3ef7", "hostUserId": "U-MechaTurk", "hostMachineId": "eyx1im8qmuipomejx2cghq", "hostUsername": "MechaTurk", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://d9f5cbd9-4563-4db0-b8ad-a9ba548a3ef7/"], "sessionUsers": [{ "username": "MechaTurk", "userID": "U-MechaTurk", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/1ab7a345-937d-4355-98bc-3234a53a200f.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-01T20:04:57.492029Z", "lastUpdate": "2020-02-02T16:19:23.4080882Z", "awaySince": "2020-02-01T20:04:59.286643Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Tooltip Tutorials!", "description": "BusinessLawyer's gonna Business you up Neos Style", "tags": [], "sessionId": "dfc4af13-3842-445d-b111-6f727f53d6c3", "hostUserId": "U-MechaTurk", "hostMachineId": "eyx1im8qmuipomejx2cghq", "hostUsername": "MechaTurk", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://dfc4af13-3842-445d-b111-6f727f53d6c3/"], "sessionUsers": [{ "username": "MechaTurk", "userID": "U-MechaTurk", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/ea07e8c0-b567-4b18-8dff-3f524ab7d4d9.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-01T20:04:58.664355Z", "lastUpdate": "2020-02-02T16:19:23.4148902Z", "awaySince": "2020-02-01T20:05:02.109191Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Cosmo Canyon", "description": "FF7! Made by Wauf", "tags": [], "sessionId": "7ffad818-cbc8-4b5a-b898-6c4fd13da118", "hostUserId": "U-MechaTurk", "hostMachineId": "eyx1im8qmuipomejx2cghq", "hostUsername": "MechaTurk", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://7ffad818-cbc8-4b5a-b898-6c4fd13da118/"], "sessionUsers": [{ "username": "MechaTurk", "userID": "U-MechaTurk", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/c810c8aa-bf63-49ff-a490-4ccc7080ee29.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-01T20:05:00.997404Z", "lastUpdate": "2020-02-02T16:19:23.4223669Z", "awaySince": "2020-02-01T20:05:07.388524Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Just Dancing", "description": "Shake that booty!", "tags": [], "sessionId": "d2babbc5-5f17-4b41-ad74-86d064fa42de", "hostUserId": "U-MechaTurk", "hostMachineId": "eyx1im8qmuipomejx2cghq", "hostUsername": "MechaTurk", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://d2babbc5-5f17-4b41-ad74-86d064fa42de/"], "sessionUsers": [{ "username": "MechaTurk", "userID": "U-MechaTurk", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/211629ae-c31f-4dda-81c0-5438dfd924bc.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-01T20:05:05.878058Z", "lastUpdate": "2020-02-02T16:19:23.428955Z", "awaySince": "2020-02-01T20:05:13.500546Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Lone Digger", "tags": ["zab", "world", "lone", "digger"], "sessionId": "fd14ba9c-d3b3-4337-beb3-7c4d623aaf09", "hostUserId": "U-MechaTurk", "hostMachineId": "eyx1im8qmuipomejx2cghq", "hostUsername": "MechaTurk", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://fd14ba9c-d3b3-4337-beb3-7c4d623aaf09/"], "sessionUsers": [{ "username": "MechaTurk", "userID": "U-MechaTurk", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/f38a920b-c708-413b-8ee7-a878fd99f167.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-01T20:05:13.805306Z", "lastUpdate": "2020-02-02T16:19:23.4357512Z", "awaySince": "2020-02-01T20:05:15.810305Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Racecar Simulator!", "description": "Modified by Gearbell, original map by Aegis Wolf", "tags": ["drift", "stage", "city", "car", "costume", "race"], "sessionId": "208d1e4f-423c-49ce-a331-638ccadba997", "hostUserId": "U-MechaTurk", "hostMachineId": "eyx1im8qmuipomejx2cghq", "hostUsername": "MechaTurk", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://208d1e4f-423c-49ce-a331-638ccadba997/"], "sessionUsers": [{ "username": "MechaTurk", "userID": "U-MechaTurk", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/3d05293b-22e1-48e0-a3a5-13126cdf0e4f.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-01T20:05:15.03447Z", "lastUpdate": "2020-02-02T16:19:23.4439328Z", "awaySince": "2020-02-01T23:34:08.195558Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Boating Demo (persistent)", "tags": ["boating", "demo"], "sessionId": "2ea93cfb-a87e-437d-bc9b-3a010e06c606", "hostUserId": "U-FrooxLess", "hostMachineId": "m3modbf070owt214eb6pea", "hostUsername": "FrooxLess", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://2ea93cfb-a87e-437d-bc9b-3a010e06c606/"], "sessionUsers": [{ "username": "FrooxLess", "userID": "U-FrooxLess", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/0313b0d2-8d23-46fd-a0c7-0065a24d0529.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T06:24:39.7451498Z", "lastUpdate": "2020-02-02T16:19:04.4678296Z", "awaySince": "2020-02-02T06:24:47.1848181Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Prop Hunt Game (persistent)", "tags": ["creator", "jam", "CJ", "cj", "template", "prop", "hunt", "game", "Creator", "Jam", "may", "lag"], "sessionId": "e11649b9-7fad-42b4-9189-8ae8b6b11e97", "hostUserId": "U-FrooxLess", "hostMachineId": "m3modbf070owt214eb6pea", "hostUsername": "FrooxLess", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://e11649b9-7fad-42b4-9189-8ae8b6b11e97/"], "sessionUsers": [{ "username": "FrooxLess", "userID": "U-FrooxLess", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/1bb5d136-5041-424f-9d9e-710cb6932765.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T06:25:04.385895Z", "lastUpdate": "2020-02-02T16:19:04.4756128Z", "awaySince": "2020-02-02T07:40:46.1435112Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Tea House (persistent)", "tags": ["tea", "house", "V"], "sessionId": "6ab6c46f-63a2-44c4-8549-324419c6d140", "hostUserId": "U-FrooxLess", "hostMachineId": "m3modbf070owt214eb6pea", "hostUsername": "FrooxLess", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://6ab6c46f-63a2-44c4-8549-324419c6d140/"], "sessionUsers": [{ "username": "FrooxLess", "userID": "U-FrooxLess", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/6d6e14b2-fa1f-43b8-a731-fd9a6a9fd166.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T07:40:45.1387519Z", "lastUpdate": "2020-02-02T16:19:04.481479Z", "awaySince": "2020-02-02T08:22:50.2118624Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "O'Neos Cylinder (persistent)", "tags": ["neos", "cylinder"], "sessionId": "a287d350-0dd8-4b79-ba58-e6ddbc4ee5e1", "hostUserId": "U-FrooxLess", "hostMachineId": "m3modbf070owt214eb6pea", "hostUsername": "FrooxLess", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://a287d350-0dd8-4b79-ba58-e6ddbc4ee5e1/"], "sessionUsers": [{ "username": "FrooxLess", "userID": "U-FrooxLess", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/0ef837e7-5a7c-4645-8e55-fdbc4e6f76e4.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T08:22:49.3345775Z", "lastUpdate": "2020-02-02T16:19:04.4874516Z", "awaySince": "2020-02-02T10:42:30.8433517Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Minecraft Rain House", "description": "Created by a VFX artist, this world might just be a visual tech demo, Special thanks to LucasRo7 for help with the reflections.", "tags": ["insanegrox", "world", "minecraft", "rainy", "house"], "sessionId": "b193fbf4-d60d-408a-968d-a732ad061e31", "hostUserId": "U-MechaTurk", "hostMachineId": "eyx1im8qmuipomejx2cghq", "hostUsername": "MechaTurk", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://b193fbf4-d60d-408a-968d-a732ad061e31/"], "sessionUsers": [{ "username": "MechaTurk", "userID": "U-MechaTurk", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/d3aeed6d-b872-4d26-b8e6-5bdda003c390.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 8, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T08:40:11.448181Z", "lastUpdate": "2020-02-02T16:19:23.4002995Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Viridian Island (persistent)", "tags": ["viridian", "island"], "sessionId": "56fa120c-7edd-4235-ac9a-02819dc3c347", "hostUserId": "U-FrooxLess", "hostMachineId": "m3modbf070owt214eb6pea", "hostUsername": "FrooxLess", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://56fa120c-7edd-4235-ac9a-02819dc3c347/"], "sessionUsers": [{ "username": "FrooxLess", "userID": "U-FrooxLess", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/59c01bbf-4c1d-4847-b9b6-e237d382ebb8.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T11:23:45.3953333Z", "lastUpdate": "2020-02-02T16:19:04.4937184Z", "awaySince": "2020-02-02T11:33:37.9386707Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Neon Arcade Hangout (persistent)", "tags": ["rueshejn", "world", "neon", "arcade", "hangout"], "sessionId": "9f947b29-e22f-4dfa-b2f9-ae3c5eff9fb0", "hostUserId": "U-FrooxLess", "hostMachineId": "m3modbf070owt214eb6pea", "hostUsername": "FrooxLess", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://9f947b29-e22f-4dfa-b2f9-ae3c5eff9fb0/"], "sessionUsers": [{ "username": "FrooxLess", "userID": "U-FrooxLess", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/dafc1b3d-1e04-441f-8dc6-bdb49a135f97.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T11:33:37.2570923Z", "lastUpdate": "2020-02-02T16:19:04.499715Z", "awaySince": "2020-02-02T12:23:20.7232952Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "JP Tutorial World (Public)", "tags": ["jp", "tutorial", "world", "color"], "sessionId": "439b8203-6d3b-440c-9c08-8cd44f3167f5", "hostUserId": "U-FrooxLess", "hostMachineId": "m3modbf070owt214eb6pea", "hostUsername": "FrooxLess", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://439b8203-6d3b-440c-9c08-8cd44f3167f5/"], "sessionUsers": [{ "username": "FrooxLess", "userID": "U-FrooxLess", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/b12c85de-268c-4607-bceb-6c2d47aa34d9.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T12:23:19.4352322Z", "lastUpdate": "2020-02-02T16:19:04.5067412Z", "awaySince": "2020-02-02T12:56:01.6182811Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Twitch Streamer House (persistent)", "tags": ["neos", "vr", "twitch", "stream", "streaming", "house", "chat", "integration", "interactive"], "sessionId": "5019ab06-65eb-40f5-b4d2-b412cf4691ef", "hostUserId": "U-FrooxLess", "hostMachineId": "m3modbf070owt214eb6pea", "hostUsername": "FrooxLess", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://5019ab06-65eb-40f5-b4d2-b412cf4691ef/"], "sessionUsers": [{ "username": "FrooxLess", "userID": "U-FrooxLess", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/9ce438e2-9cb4-4b16-b080-c27c4e396563.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T12:56:00.0807761Z", "lastUpdate": "2020-02-02T16:19:04.4595131Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Hayden World", "tags": [], "sessionId": "8c587de1-2a2f-449a-a00c-7eafd5ea4d95", "hostUserId": "U-Hayden", "hostMachineId": "kqhg4dmi1uclrujdldkjgw", "hostUsername": "Hayden", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": false, "sessionURLs": ["lnl-nat://8c587de1-2a2f-449a-a00c-7eafd5ea4d95/"], "sessionUsers": [], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/b04a9f38-3efd-48d6-93a2-4e2b80d2210f.webp", "joinedUsers": 1, "activeUsers": 1, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T13:29:25.4194528Z", "lastUpdate": "2020-02-02T16:19:10.739025Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "Struggle", "tags": ["struggle"], "sessionId": "358fa057-d46b-41a1-bfe8-800c0163951a", "hostUserId": "U-Lhannan", "hostMachineId": "5z9wsroczkcme3zh3v9x2g", "hostUsername": "Lhannan", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": false, "sessionURLs": ["lnl-nat://358fa057-d46b-41a1-bfe8-800c0163951a/"], "sessionUsers": [{ "username": "Lhannan", "userID": "U-Lhannan", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/bd5cab14-e162-4459-8af4-1ff0d8cb85be.webp", "joinedUsers": 1, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T13:48:56.7205304Z", "lastUpdate": "2020-02-02T16:19:27.3421013Z", "awaySince": "2020-02-02T15:11:23.4685118Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "alex derpy fox World", "tags": [], "sessionId": "54b132cc-5c2d-4f66-8305-0a0071b2c8ee", "hostUserId": "U-alex-derpy-fox", "hostMachineId": "w2lfl-tftka9hn-eadflog", "hostUsername": "alex derpy fox", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": false, "sessionURLs": ["lnl-nat://54b132cc-5c2d-4f66-8305-0a0071b2c8ee/"], "sessionUsers": [{ "username": "alex derpy fox", "userID": "U-alex-derpy-fox", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/aa33fac3-6aa2-4ca9-979f-9898cb491d36.webp", "joinedUsers": 1, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T14:07:58.9140758Z", "lastUpdate": "2020-02-02T16:19:15.1008439Z", "awaySince": "2020-02-02T14:23:58.9095588Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "<b>London Home 18xx", "description": "mhh yes quite", "tags": ["color", "red", "blue", "yellow", "green", "london", "home", "xx"], "sessionId": "5b54f0a6-d196-433c-94b6-bcd3626bfaba", "hostUserId": "U-EroSensei", "hostMachineId": "wougnqk5cus--ecnrvammg", "hostUsername": "EroSensei", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": false, "sessionURLs": ["lnl-nat://5b54f0a6-d196-433c-94b6-bcd3626bfaba/"], "sessionUsers": [{ "username": "EroSensei", "userID": "U-EroSensei", "isPresent": true }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/8819209b-3a93-4a98-bad1-df34df0556ff.webp", "joinedUsers": 1, "activeUsers": 1, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T14:22:49.0924154Z", "lastUpdate": "2020-02-02T16:18:41.4203034Z", "accessLevel": "RegisteredUsers", "hasEnded": false }, { "name": "Neos Hub", "tags": ["neos", "hub"], "sessionId": "e9c6470e-d100-4775-84ca-00aa030fc670", "hostUserId": "U-CBGog", "hostMachineId": "mpxswdm61ugpnlqef43kig", "hostUsername": "CBGog", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": false, "sessionURLs": ["lnl-nat://e9c6470e-d100-4775-84ca-00aa030fc670/"], "sessionUsers": [{ "username": "CBGog", "userID": "U-CBGog", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/15dcaa5b-3e46-4dc1-8fda-b88d606e45bb.webp", "joinedUsers": 1, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T14:24:43.5826077Z", "lastUpdate": "2020-02-02T16:19:03.344984Z", "awaySince": "2020-02-02T15:34:47.7200886Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "The Underground", "description": "Party in the creepy sewers taken over by neon punks. Beware the Lurkers...", "tags": ["underground", "sewers", "graffiti", "rave", "club", "pool", "dark", "scary"], "sessionId": "a2a89bcc-c72e-4edc-8c79-fb88b873c689", "hostUserId": "U-Nexulan", "hostMachineId": "m0b4jj7ptksyy4mdldocrq", "hostUsername": "Nexulan", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": false, "sessionURLs": ["lnl-nat://a2a89bcc-c72e-4edc-8c79-fb88b873c689/"], "sessionUsers": [{ "username": "Nexulan", "userID": "U-Nexulan", "isPresent": true }, { "username": "PurpleJuice", "userID": "U-PurpleJuice", "isPresent": false }, { "username": "Lhannan", "userID": "U-Lhannan", "isPresent": false }, { "username": "CBGog", "userID": "U-CBGog", "isPresent": true }, { "username": "alex derpy fox", "userID": "U-alex-derpy-fox", "isPresent": true }, { "username": "Aegis_Wolf", "userID": "U-Aegis-Wolf", "isPresent": true }, { "username": "Elektrospy", "userID": "U-Elektrospy", "isPresent": true }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/e177d59c-f950-4161-a168-0b7a8e017504.webp", "joinedUsers": 8, "activeUsers": 6, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T14:50:19.8984452Z", "lastUpdate": "2020-02-02T16:18:52.181058Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "haykelvin World", "tags": [], "sessionId": "c557ccf6-0410-4ff5-852e-52db036d1904", "hostMachineId": "ad6ialbph0qgofojdpog8g", "hostUsername": "haykelvin", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": false, "sessionURLs": ["lnl-nat://c557ccf6-0410-4ff5-852e-52db036d1904/"], "sessionUsers": [], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/987ec009-c88a-44b6-94fa-c458f13e0877.webp", "joinedUsers": 1, "activeUsers": 1, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T01:51:32.1637334Z", "lastUpdate": "2020-02-02T16:18:45.5539536Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "ModularShips", "description": "ModularShips", "tags": ["creator", "jam", "CJ", "cj", "template", "prop", "hunt", "game", "Creator", "Jam", "may", "lag"], "sessionId": "bdae9b07-cda6-43e6-9baf-40832662e8d2", "hostUserId": "U-Creator-Jam", "hostMachineId": "elyyzgperkufbif0mfkgnw", "hostUsername": "Creator Jam", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": true, "sessionURLs": ["lnl-nat://bdae9b07-cda6-43e6-9baf-40832662e8d2/"], "sessionUsers": [{ "username": "Creator Jam", "userID": "U-Creator-Jam", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/c4521d9d-92f1-409a-b55b-b5297b3c8521.webp", "joinedUsers": 0, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T15:50:17.3867044Z", "lastUpdate": "2020-02-02T16:19:28.4363697Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "MTC Stream/Record room", "tags": ["mtc", "stream", "record", "room"], "sessionId": "ff6560a4-709a-41fc-af8c-ef604f4279cf", "hostMachineId": "jhez9pedjumhxfdtlzst8q", "hostUsername": "ArchGamer", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": false, "sessionURLs": ["lnl-nat://ff6560a4-709a-41fc-af8c-ef604f4279cf/"], "sessionUsers": [{ "username": "ArchGamer", "isPresent": false }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/c5374e10-2ffb-406f-ae90-7e87556dd07d.webp", "joinedUsers": 1, "activeUsers": 0, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T15:55:38.689086Z", "lastUpdate": "2020-02-02T16:19:14.8089986Z", "awaySince": "2020-02-02T15:56:08.7404418Z", "accessLevel": "Anyone", "hasEnded": false }, { "name": "MTC Avatar Creation", "tags": ["mtc", "avatar", "creation"], "sessionId": "d60a2e6f-098f-4daa-8fa2-84f9a575cd31", "hostMachineId": "jhez9pedjumhxfdtlzst8q", "hostUsername": "ArchGamer", "compatibilityHash": "L5pN9zfrFI6qqSFw+ylvlQ==", "neosVersion": "0.8.19.9988", "headlessHost": false, "sessionURLs": ["lnl-nat://d60a2e6f-098f-4daa-8fa2-84f9a575cd31/"], "sessionUsers": [{ "username": "ArchGamer", "isPresent": true }], "thumbnail": "https://cloudxstorage.blob.core.windows.net/thumbnails/fd55d962-ebd2-4f2e-bf36-76462989991e.webp", "joinedUsers": 1, "activeUsers": 1, "maxUsers": 32, "mobileFriendly": false, "sessionBeginTime": "2020-02-02T15:56:05.4936629Z", "lastUpdate": "2020-02-02T16:19:14.8007688Z", "accessLevel": "Anyone", "hasEnded": false }]
const { TimeSpan, parse, parseDate, fromSeconds } = require('timespan')
class HTTP_CLIENT {
    static async SendAsync(request, token) {
        let state
        let response = await fetch(request.RequestUri, { method: request.Method }).then(res => {
            state = res.status
            return res.json()
        })
        let cloudResult = new CloudResult()
        cloudResult.CloudResult(state, response)
        return cloudResult
    }
}
class Enumerable extends Object {
    constructor($b) {
        super()
        
        if ($b.constructor.name == "Object") {
            this._values = {}
            let keys = Object.keys($b)
            for (let i = 0; i < keys.length; i++) {
                this[keys[i]] = i
                this._values[keys[i]] = $b[[keys[i]]]
            }
        }
        if ($b.constructor.name == "Array" || ($b.constructor.name == "List")) {
            let keys = $b
            for (let i = 0; i < keys.length; i++) {
                this[keys[i]] = i
            }
        }
        Object.freeze(this)
    }
    GetValue(key){
        if (this._values)
        return this._values[key]
        return this[key]
    }
    
    FromEnum(Enum){
        let keys = Object.keys(Enum).shift()
        if (Enum > keys.length) throw new Error("Bounds Exceeded")
        for (let i = 0; i < keys.length; i++) {
            if (this[keys[i]] == Enum)  return keys[i]
        }
        throw new Error("Value not Found")
    }
}
const AccountType = new Enumerable([
    'Normal',
    'AgentSmith',
    'BladeRunner',
    'Gunter',
    "Neuromancer",
    'Architect',
    'Curator',
    "Level144",
    'Level250',
    'Anorak',
    'END'
])
const ServerStatus = new Enumerable([
    "Good",
    "Slow",
    "Down",
    "NoInternet"
])
const MessageType = new Enumerable([
    "Text",
    "Object",
    "SessionInvite",
    "CreditTransfer",
    "SugarCubes" //Not Implimented
])
const TransactionType = new Enumerable([
    "User2User",
    "Withdrawal",
    "Deposit",
    "Tip"
])
const HttpMethod = new Enumerable({
    "Get": "GET",
    "Put": "PUT",
    "Delete": "DELETE",
    "Post": "POST",
    "Patch": "PATCH"
})
/**
 *
 *  Delay by ms
 * @param {TimeSpan} timespan
 * @returns {Promise}
 */
function Delay(timespan) {
    return new Promise(resolve => setTimeout(resolve, timespan.msecs));
}
class Uri {
    constructor(url) {
        if (!url) return
        this.URL = url
    }
    /**
     * @param {URL} value
     */
    set URL(value) {
        this._rawUrl = url
        this._raw = URI.parse(url)
        let path = (this._raw.path.split('/'))
        this.Segments = new Array()
        path.forEach((value, index) => {
            this.Segments.push((index < path.length - 1) ? value + "/" : value)
        })
    }
    get Scheme() {
        return this._raw.schema
    }
    static EscapeDataString(dat) {
        return encodeURI(dat)
    }
}
class Path {

}
/**
 * Unordered List
 *
 * @class List
 * @extends {Array}
 */
class List extends Array {
    /**
     *Creates an instance of List.
     * @param {List} props List
     * @memberof List
     */
    constructor(props) {
        if (!props) return super()
        super(props)
    }
    /**
     *Add a Value to the List
     *
     * @param {*} value
     * @memberof List
     */
    Add(value) {
        this.push(value)
    }
    /**
     * Concat 2 Lists
     * @param {List} list 
     */
    AddRange(list) {
        if (list == null) throw new Error("ArgumentNullException")
        if (!(list.constructor.name == "List")) throw new Error("AddRange: Expected type List");
        for (var item of list) {
            this.Add(item)
        }
    }
    /**
     *Clear the List
     *
     * @memberof List
     */
    Clear() {
        this.splice(0, this.length)
    }
    /**
     * Does the List contain a given item
     * @param {*} item 
     */
    Contains(item) {
        return this.includes(item)
    }
    /**
     * 
     * @param {*} match 
     */
    Exists(match) {
        //TODO
    }
    /**
     *
     *
     * @param {*} match
     * @returns
     * @memberof List
     */
    Find(match) {
        return this.find(match)
    }
    /**
     *
     *
     * @param {*} action
     * @memberof List
     */
    ForEach(action) {
        this.forEach(action)
    }
    /**
     *
     *
     * @param {*} iValue 
     * @returns {Number} Index
     * @memberof List
     */
    Remove(iValue) {
        var iIndex = this.indexOf(iValue)
        if (iIndex > -1) {
            this.RemoveAt(iIndex)
        }
        return iIndex
    }
    /**
     *
     *
     * @param {Number} iIndex
     * @returns {*} Removed Item
     * @memberof List
     */
    RemoveAt(iIndex) {
        var vItem = this[iIndex];
        if (vItem) {
            this.splice(iIndex, 1);
        }
        return vItem;
    }
    ToArray() {
        return //TODO
    }
}
/**
 *
 *
 * @class Dictionary
 * @extends {Array}
 */
class Dictionary extends Array {
    constructor(props) {
        if (!props) return super()
        super(props)
    }
    /**
     *
     *
     * @param {*} Key
     * @param {*} Value
     * @memberof Dictionary
     */
    Add(Key, Value) {
        if (this.ContainsKey(Key)) throw new Error("ArgumentException: An element with the same key already exists")
        this.push({ Key, Value })
    }
    /**
     *
     *
     * @memberof Dictionary
     */
    Clear() {
        this.splice(0, this.length)
    }
    /**
     *
     *
     * @param {*} key
     * @returns
     * @memberof Dictionary
     */
    ContainsKey(key) {
        for (let object of this) {
            if (object.Key == key) return true
        }
        return false
    }
    /**
     *
     *
     * @param {*} value
     * @returns
     * @memberof Dictionary
     */
    ContainsValue(value) {
        for (let object of this) {
            if (object.Value == value) return true
        }
        return false
    }
    /**
     *
     *
     * @param {*} capacity
     * @returns
     * @memberof Dictionary
     */
    EnsureCapacity(capacity) {
        return this.length
    }
    /**
     *
     *
     * @param {*} iIndex
     * @returns
     * @memberof Dictionary
     */
    RemoveAt(iIndex) {
        var vItem = this[iIndex];
        if (vItem) {
            this.splice(iIndex, 1);
        }
        return vItem;
    }
    /**
     *
     *
     * @param {*} key
     * @returns
     * @memberof Dictionary
     */
    Remove(key) {
        if (!this.ContainsKey(key)) return false
        for (let object of this) {
            if (object.Key == key) { this.RemoveAt(this.indexOf(object)); return true }
        }
        return false
    }
}
/**
 *
 *
 * @class HashSet
 * @extends {Array}
 */
class HashSet extends Array {
    constructor($b) {
        if (!$b) return super()
        super($b)
    }
}
Array.prototype.ToList = function () {
    let t = new List()
    for (let item of this) {
        t.Add(item)
    }
    return t
}
String.prototype.noExtension = function () {
    return this.replace(/\.[^/.]+$/, "")
}
String.prototype.IsNullOrWhiteSpace = function (str) {
    if (!str) return true
    if (str.trim() == '') return true
    return false
}
/**
 *
 *
 * @class httpRequestMessage
 */
class httpRequestMessage {
    constructor(method, uri) {
        this.Headers = {}
        this.Content = {}
        this.Method = method
        this.RequestUri = uri
    }
}

//Models
class HubPatreons {
    constructor($b) {
        if (!$b) $b = {}
        this.MAX_NAMES = 400;
        this.MAX_PICTURES = 50
        this.PatreonNames = $b['patreon-names']
        this.PatreonPictures = $b['patreon-pictures']
    }
}
class AssetDiff {
    constructor($b) {
        if (!$b) $b = {}
        this.Hash = $b.hash
        this.Bytes = $b.bytes
        this.State = $b.state
        this.IsUploaded = $b.isUploaded || new Boolean()
        this.Diff = {
            "Added": 0,
            "Unchanged": 1,
            "Removed": 2
        }
    }
}
class AssetUploadData {
    constructor($b) {
        if (!$b) $b = {}
        this.Signature = $b.signature
        this.Variant = $b.variant
        this.OwnerId = $b.ownerId
        this.TotalBytes = $b.TotalBytes
        this.ChunkSIze = $b.ChunkSIze
        this.TotalChunks = $b.TotalChunks
        this.UploadState = $b.uploadState
    }
}
class AssetVariantComputationTask {
    constructor($b) {
        if (!$b) $b = {}
        this.AssetSignature = $b.assetSignature
        this.VariantId = $b.variantId
        this.EntityType = $b.entityType;
    }
}
class ChildRecordDiff {
    constructor($b) {
        if (!$b) $b = {}
        this.Operation = $b.operation;
        this.Created = $b.created;
        this.ParentRecord = $b.parentRecord
        this.RecordInfo = $b.recordInfo;
        this.RecordInfoOperation = {
            "Upsert": 0,
            "Remove": 1
        }
    }
}
class CreditTransaction {
    constructor($b) {
        if (!$b) $b = {}
        this.Token = $b.token;
        this.FromUserId = $b.fromUserId;
        this.ToUserId = $b.toUserId;
        this.Amount = $b.amount;
        this.Comment = $b.comment;
        this.TransactionType = $b.transactionType;
        this.Anonymous = $b.anonymous;
    }
}
class ExternalQueueObject {
    constructor($b) {
        if (!$b) $b = {}
        this.Id = $b.id
        this.PopReceipt = $b.popReceipt
        this.Object = $b.object
    }
}
class PicturePatreon {
    constructor($b) {
        if (!$b) $b = {}
        this.Name = $b.name
        this.PictureURL = $b.pictureUrl;
    }
    PicturePatreon(name, url) {
        this.Name = name
        this.PictureURL = url
    }
}
class License {
    constructor($b) {
        if (!$b) $b = {}
        this.LicenseGroup = $b.licenseGroup;
        this.LicenseKey = $b.licenseKey;
        this.PairedMachineUUID = $b.PairedMachineUUID;
    }
}
class LoginCredentials {
    constructor($b) {
        if (!$b) $b = {}
        this.OwnerId = $b.ownerId
        this.Username = $b.username
        this.Email = $b.email
        this.Password = $b.password;
        this.RecoverCode = $b.recoverCode
        this.SessionToken = $b.sessionCode
        this.SecretMachineId = $b.secretMachineId;
        this.RememberMe = $b.rememberMe
    }
    Preprocess() {
        if (this.Username) this.Username = this.Username.trim();
        if (this.Email) this.Email = this.Email.trim();
    }
    get IsPasswordValid() {
        return true //TODO: CryptoHelper
    }
}
class NeosAccount {
    static MinCents(type) {
        let num = 100;
        switch (type) {
            case AccountType.Normal:
                return 0;
            case AccountType.AgentSmith:
                return num
            case AccountType.BladeRunner:
                return num * 6;
            case AccountType.Gunter:
                return num * 12
            case AccountType.Neuromancer:
                return num * 24
            case AccountType.Architect:
                return num * 32
            case AccountType.Curator:
                return num * 72
            case AccountType.Level144:
                return num * 144
            case AccountType.Level250:
                return num * 250
            case AccountType.Anorak:
                return num * 500
            default:
                throw new Error("Invalid AccountType: " + type)
        }
    }
    static AccountName(type) {
        switch (type) {
            case AccountType.Normal:
                return "Standard Account";
            case AccountType.AgentSmith:
                return "Agent Smith";
            case AccountType.BladeRunner:
                return "Blade Runner";
            case AccountType.Gunter:
                return "Gunter";
            case AccountType.Neuromancer:
                return "Neuromancer";
            case AccountType.Architect:
                return "Architect";
            case AccountType.Curator:
                return "Curator";
            case AccountType.Level144:
                return "Level 144";
            case AccountType.Level250:
                return "Level 250";
            case AccountType.Anorak:
                return "Anorak";
            default:
                return "Unknown Account Type";
        }
    }
    static StorageBytes(type) {
        var num = 1073741824;
        switch (type) {
            case AccountType.Normal:
                return num;
            case AccountType.AgentSmith:
                return num * 5;
            case AccountType.BladeRunner:
                return num * 25;
            case AccountType.Gunter:
                return num * 50;
            case AccountType.Neuromancer:
                return num * 100;
            case AccountType.Architect:
                return num * 150;
            case AccountType.Curator:
                return num * 300;
            case AccountType.Level144:
                return num * 600;
            case AccountType.Level250:
                return num * 1200;
            case AccountType.Anorak:
                return num * 2400;
            default:
                throw new Error("Invalid AccountType: " + type);
        }
    }
    static HasPatreonWorldAccess(type) {
        switch (type) {
            case AccountType.Normal:
            case AccountType.AgentSmith:
                return false;
            case AccountType.BladeRunner:
            case AccountType.Gunter:
            case AccountType.Neuromancer:
            case AccountType.Architect:
            case AccountType.Curator:
            case AccountType.Level144:
            case AccountType.Level250:
            case AccountType.Anorak:
                return true;
            default:
                throw new Error("Invalid AccountType: " + type);
        }
    }
}
class NeosDBAsset {
    constructor($b) {
        if ($b) $b = {}
        this.Hash = $b.hash
        this.Bytes = $b.bytes
    }
}
class RecordId {
    constructor($b) {
        if ($b) $b = {}
        this.Id = $b.recordId
        this.OwnerId = $b.ownerId
    }
    GetHashCode() {
        return this.Id.GetHashCode() ^ this.OwnerId.GetHashCode()
    }
    Equals(other) {
        if (this.Id == other.Id)
            return this.OwnerId == other.OwnerId
        return false;
    }
    RecordId(ownerId, recordId) {
        this.OwnerId = ownerId
        this.Id = recordId
    }
}
class RecordInfo {
    constructor($b) {
        if ($b) $b = {}
        this.Id = $b.recordId
        this.OwnerId = $b.ownerId
        this.Name = $b.name
        this.AssetURI = $b.assetUri
        this.ThumbnailURI = $b.thumbnailUri
        this.GlobalVersion = $b.globalVersion
    }
}
class RecordPreprocessStatus {
    constructor($b) {
        if ($b) $b = {}
        this.PreprocessId = $b.id
        this.OwnerId = $b.ownerId
        this.RecordId = $b.recordId
        this.State = $b.state
        this.Progress = $b.progress
        this.FailReason = $b.failReason
        this.ResultDiffs = $b.resultDiffs
    }
}
class RSAParametersData {
    constructor($b) {
        if ($b) $b = {}
        this.Exponent = $b.Exponent
        this.Modulus = $b.Modulus
        this.P = $b.P
        this.Q = $b.Q
        this.DP = $b.DP
        this.DQ = $b.DQ
        this.InverseQ = $b.InverseQ
        this.D = $b.D
    }
    static RSAParameters(data) {
        return new RSAParametersData(data)
    }
}
class ServerStatistics {
    constructor($b) {
        if ($b) $b = {}
        this.LastUpdate = $b.lastUpdate
        this.ResponseTimeMilliseconds = $b.responseTimeMilliseconds
    }
}
class SessionInfo {
    constructor($b) {
        if ($b) $b = {}
        this.Name = $b.name
        this.Description = $b.description
        this.Tags = $b.tags
        this.SessionId = $b.sessionId
        this.HostUserId = $b.hostUserId
        this.HostMachineId = $b.hostMachineId
        this.HostUsername = $b.hostUsername;
        this.CompatibilityHash = $b.compatibilityHash
        this.NeosVersion = $b.neosVersion
        this.HeadlessHost = $b.headlessHost
        this.LegacySessionURL = $b.url || null //LEGACY
        let SessionURLs = $b.sessionURLs
        if (SessionURLs.constructor.name == "List")
            this.SessionURLs = SessionURLs
        if (SessionURLs.constructor.name == "Array")
            this.SessionURLs = SessionURLs.ToList()
        let SessionUsers = $b.sessionUsers
        if (SessionUsers.constructor.name == "List")
            this.SessionUsers = SessionUsers
        if (SessionUsers.constructor.name == "Array")
            this.SessionUsers = SessionUsers.ToList()
    }
}
//CLOUD
/**
 *
 * @public
 * @class AssetEntry
 */
class AssetEntry {
    /**
     *Creates an instance of AssetEntry.
     * @param {*} $b 
     * @memberof AssetEntry
     */
    constructor($b) {
        if ($b) $b = {}
        this.id = $b.id || new String()
        this.OwnerId = $b.ownerId || new String()
        this.Entry = $b.entry || null
        this.ComputeLock = $b.computeLock || null
    }
    /**
     *
     * @public
     * @memberof AssetEntry
     */
    get AssetHash() {
        if (this.OwnerId == null || !this.OwnerId.startsWith("A-")) {
            console.error("OwnerId is invalid, cannot extract asset hash from it");
        }
        return this.OwnerId.substring("A-".length);
    }
    set AssetHash(value) {
        this.OwnerId = "A-" + value
    }
}
/**
 *
 *
 * @class AssetInfo
 */
class AssetInfo {
    /**
     *Creates an instance of AssetInfo.
     * @memberof AssetInfo
     */
    constructor($b) {
        if (!$b) $b = {}
        this.OwnerId = $b.ownerId || new String()
        this.AssetHash = $b.assetHash || new String()
        this.Bytes = $b.bytes || new Number()
        this.Free = $b.free || new Boolean()
        this.IsUploaded = $b.isUploaded || new Boolean()
        this.UploaderUserId = $b.uploadUserId || new String()
        this.CountsAgainstMemberQuota = $b.bytes || new Boolean()
    }
}
/**
 *
 *
 * @class CloudMessage
 */
class CloudMessage {
    /**
     *Creates an instance of CloudMessage.
     * @memberof CloudMessage
     */
    constructor($b) {
        if (!$b) $b = {}
        this.Message = $b.Message || new String()
    }
    static ExtractMessage(content) {
        try {
            return content.Message || content
        } catch (err) {
            return content;
        }
    }
}
class CloudVariable {
    constructor($b) {
        if (!$b) $b = {}
        this.VariableOwnerId = $b.ownerId || new String()
        this.Path = $b.path || new String()
        this.Value = $b.value || new String()
    }
    static GetDefinitionPath(path, ownerId, subpath) {
        let length = path.indexOf('.')
        ownerId.Out = path.substring(0, length)
        subpath.Out = path.substring(length + 1)
    }
    GetDefinitionPath(ownerId, subpath) {
        CloudVariable.GetDefinitionPath(this.Path, ownerId, subpath)
    }
}
class CloudVariableDefinition {
    constructor($b) {
        if (!$b) $b = {}
        this.DefinitionOwnerId = $b.definitionOwnerId || new String()
        this.Subpath = $b.subpath || new String()
        this.TypeHint = $b.typeHint || new String()
        this.DefaultValue = $b.defaultvalue || new String()
        this.VariableOwnerCanRead = $b.variableOwnerCanRead || new Boolean()
        this.VariableOwnerCanWrite = $b.variableOwnerCanWrite || new Boolean()
        this.AnyoneCanRead = $b.anyoneCanRead || new Boolean()
        this.AnyoneCanWrite = $b.anyoneCanWrite || new Boolean()
    }
    CanRead(variableOwnerId, readerId) {
        return this.AnyoneCanRead || this.VariableOwnerCanRead && variableOwnerId == readerId || readerId == this.DefinitionOwnerId
    }
    CanWrite(variableOwnerId, writerId) {
        return this.AnyoneCanWrite || this.VariableOwnerCanWrite && variableOwnerId == writerId || writerId == this.DefinitionOwnerId
    }
}
class Friend {
    constructor($b) {
        if (!$b) $b = {}
        this.FriendUserId = $b.id || new String()
        this.OwnerId = $b.ownerId || new String()
        this.FriendUsername = $b.friendUsername || new String()
        this.FriendStatus = $b.friendStatus || new Object()
        this.IsAccepted = $b.isAccepted || new Boolean()
        this.UserStatus = $b.userStatus || new Object()
        this.LatestMessageTime = $b.latestMessageTime || new Date()
        this.Profile = $b.profile || new Object()
    }
}
class Group {
    constructor($b) {
        if (!$b) $b = {}
        this.GroupId = $b.id || new String()
        this.AdminUserId = $b.adminUserId || new String()
        this.Name = $b.name || new String()
        this.QuotaBytes = $b.quotaBytes || new Number()
        this.UsedBytes = $b.usedBytes || new Number()
    }
}
class RecordHelper {
    static IsSameVersion(record, other) {
        if (record.LastModifyingMachineId == other.LastModifyingMachineId && record.LastModifyingUserId == other.LastModifyingUserId)
            return record.LocalVersion == other.LocalVersion;
        if (record.LocalVersion == other.LocalVersion && record.GlobalVersion == other.GlobalVersion && record.LastModifyingMachineId == other.LastModifyingMachineId)
            return record.LastModifyingUserId == other.LastModifyingUserId;
        return false;
    }
    static IsSameRecord(record, other) {
        if (record.OwnerId == other.OwnerId)
            return record.RecordId == other.RecordId;
        return false;
    }

    static InheritPermissions(record, source) {
        record.IsPublic = source.IsPublic;
        record.IsForPatrons = source.IsForPatrons;
        return record
    }

    static CanOverwrite(record, oldRecord) {
        if (oldRecord == null)
            return true;
        if (record.LastModifyingMachineId == oldRecord.LastModifyingMachineId && record.LastModifyingUserId == oldRecord.LastModifyingUserId)
            return record.LocalVersion > oldRecord.LocalVersion;
        return record.GlobalVersion == oldRecord.GlobalVersion;
    }

    static TakeIdentityFrom(record, source) {
        record.RecordId = source.RecordId;
        record.OwnerId = source.OwnerId;
        record.LocalVersion = source.LocalVersion;
        record.GlobalVersion = source.GlobalVersion;
        record.LastModifyingMachineId = source.LastModifyingMachineId;
        record.LastModifyingUserId = source.LastModifyingUserId;
        record.IsPublic = source.IsPublic;
        record.IsForPatrons = source.IsForPatrons;
        record.IsListed = source.IsListed;
        record.FirstPublishTime = source.FirstPublishTime;
        record.CreationTime = source.CreationTime;
        record.Visits = source.Visits;
        record.Rating = source.Rating;
        return record
    }

    static GetUrl(record) {
        return RecordUtil.GenerateUri(record.OwnerId, record.RecordId);
    }

    static SetUrl(record, url) {
        let ownerId = [];
        let recordId = [];
        if (!RecordUtil.ExtractRecordID(url, ownerId, recordId))
            throw new Exception("Invalid Record URL");
        record.OwnerId = ownerId.Out;
        record.RecordId = recordId.Out;
        return record
    }
}
class Member {
    constructor($b) {
        if (!$b) $b = {}
        this.UserId = $b.id || new String()
        this.GroupId = $b.ownerId || new String()
        this.QuotaBytes = $b.quotaBytes || new Number()
        this.UsedBytes = $b.usedBytes || new Number()
    }
}
class Membership {
    constructor($b) {
        if (!$b) $b = {}
        this.UserId = $b.ownerId || new String()
        this.GroupId = $b.id || new String()
        this.GroupName = $b.groupName || new String()
    }
}
class Message {
    constructor($b) {
        if (!$b) $b = {}
        this.Id = $b.id || new String()
        this.OwnerId = $b.ownerId || new String()
        this.RecipientId = $b.recipientId || new String()
        this.SenderId = $b.senderId || new String()
        this.MessageType = $b.messageType || new Object()
        this.Content = $b.content || new String()
        this.SendTime = $b.sendTime || new Date()
        this.LastUpdateTime = $b.lastUpdateTime || new Date()
        this.ReadTime = $b.readTime || new Date()
    }
    static GenerateId() {
        return "MSG-" + new uuidv4()
    }
    ExtractContent() {
        return JSON.parse(this.Content)
    }
    SetContent(obj) {
        this.Content = JSON.stringify(obj)
    }
    get IsSent() {
        return this.SenderId == this.OwnerId
    }
    get IsReceived() {
        return this.RecipientId == this.OwnerId
    }
    get IsRead() {
        return (this.ReadTime !== undefined)
    }
}
class NeosSession {
    constructor($b) {
        if (!$b) $b = {}
        this.ReverseTimestamp = $b.reverseTimestamp || new String()
        this.SessionId = $b.sessionId || new String()
        this.NeosVersion = $b.neosVersion || new String()
        this.UserId = $b.userId || new String()
        this.MachineId = $b.machineId || new String()
        this.CountryCode = $b.countryCode || new String()
        this.SystemLocale = $b.systemLocale || new String()
        this.ClientIp = $b.clientIp || new String()
        this.SessionStart = $b.sessionStart || new Date()
        this.SessionEnd = $b.sessionEnd || new Date()
        this.VisitedWorlds = $b.visitedWorlds || new Number()
        this.CreatedWorlds = $b.createdWorlds || new Number()
        this.OperatingSystem = $b.operatingSystem || new String()
        this.HeadDevice = $b.headDevice || new String()
        this.HeadDeviceModel = $b.headDeviceModel || new String()
        this.CPU = $b.cpu || new String()
        this.GPU = $b.gpu || new String()
        this.MemoryBytes = $b.memoryBytes || new Number()
        this.Peripherals = $b.peripherals || new String()
    }
}
class IRecord {
    constructor() {
        this.RecordId = new String()
        this.OwnerId = new String()
        this.URL = new String()
        this.GlobalVersion = new Number()
        this.Localversion = new Number()
        this.LastModifyingUserId = new String()
        this.LastModifyingMachineId = new String()
        this.Name = new String()
        this.OwnerName = new String()
        this.Description = new String()
        this.RecordType = new String()
        this.Tags = new HashSet()
        this.Path = new String()
        this.ThumbnailURI = new String()
        this.IsPublic = new Boolean()
        this.IsForPatreons = new Boolean()
        this.IsListed = new Boolean()
        this.Visits = new Number()
        this.Rating = new Number()
        this.FirstPublishTime = new Date()
        this.CreationTime = new Date()
        this.LastModificationTime = new Date()
        this.NeosDBManifest = new List()
    }
}
class Record extends IRecord {
    constructor($b) {
        if (!$b) $b = {}
        super()
        this.RecordId = $b.id || new String()
        this.OwnerId = $b.ownerId || new String()
        this.AssetURI = $b.assetUri || new String()
        this._URL = new String()
        this.GlobalVersion = $b.globalVersion || new Number()
        this.Localversion = $b.localVersion || new Number()
        this.LastModifyingUserId = $b.lastModifyingUserId || new String()
        this.LastModifyingMachineId = $b.lastModifyingMachineId || new String()
        this.Name = $b.name || new String()
        this.Description = $b.description || undefined
        this.RecordType = $b.recordType || new String()
        this.OwnerName = $b.ownerName || new String()
        this.Tags = ($b.tags ? new HashSet($b.tags) : undefined)
        this.Path = $b.path || new String()
        this.ThumbnailURI = $b.thumbnailUri || new String()
        this.LastModificationTime = $b.lastModificationTime || new Date()
        this.CreationTime = $b.creationTime || new Date()
        this.FirstPublishTime = $b.firstPublishTime || new Date()
        this.IsPublic = $b.isPublic || new Boolean()
        this.IsForPatreons = $b.isForPatreons || new Boolean()
        this.IsListed = $b.isListed || new Boolean()
        this.Visits = $b.visits || new Number()
        this.Rating = $b.rating || new Number()
        this.Submissions = $b.submissions || new List()
        this.Manifest = new List()
        this.NeosDBManifest = $b.neosDbManidest || new List()
    }
    get URL() {
        return RecordHelper.GetUrl(this)
    }
    URL(value) {
        return RecordHelper.SetUrl(this, value)
    }
    static IsValidId(recordId) {
        return recordId.startsWith("R-")
    }
    get IsValidOwnerId() {
        return IdUtil.GetOwnerType(this.OwnerName) != OwnerType.INVALID
    }
    get IsValidRecordId() {
        return RecordUtil.IsValidRecordID(this.RecordId)
    }
    ResetVersioning() {
        this.Localversion = 0;
        this.GlobalVersion = 0;
        this.LastModifyingMachineId = null
        this.LastModifyingMachineId = null
    }
}
class RecordList {
    constructor($b) {
        if (!$b) $b = {}
        this._Id = $b.id || new String()
        this.OwnerId = b.ownerId || new String()
        this.Name = $b.name || new String()
        this.Page = $b.page || new Number()
        this.Records = $b.records || new List() //TYPE Record
    }
    get Id() {
        return this.Name + "-" + this.Page.toString()
    }
}
class SessionUser {
    constructor($b) {
        if (!$b) $b = {}
        this.Username = $b.username || new String()
        this.UserID = $b.userID || new String()
        this.IsPresent = $b.isPresent || new Boolean()
    }
    Equals(other) {
        if (this.Username == other.Username && this.UserID == other.UserID)
            return this.IsPresent == other.IsPresent;
        return false
    }
}
class Submission {
    constructor($b) {
        if (!$b) $b = {}
        this.Id = $b.id || new String()
        this.GroupId = $b.ownerId || new String()
        this.TargetRecordId = $b.targetRecordId || new RecordId()
        this.SubmissionTime = $b.submissionTime || new Date()
        this.SubmittedById = $b.submittedById || new String()
        this.Featured = $b.featured || new Boolean()
        this.FeaturedByUserId = $b.featuredByUserId || new String()
        this.FeaturedTimestamp = $b.featuredTimestamp || new Date()
    }
}
class User {
    constructor($b) {
        if (!$b) $b = {}
        this.Id = $b.id || new String()
        this.Username = $b.username || new String()
        this.Email = $b.email || undefined
        this.RegistrationDate = $b.registrationDate || new Date()
        this.QuotaBytes = $b.quotaBytes || new Number()
        this.UsedBytes = $b.usedBytes || new Number()
        this.isVerified = $b.isVerified || new Boolean()
        this.AccountBanExpiration = $b.accountBanExpiration || new Date(0)
        this.PublicBanExpiration = $b.publicBanExpiration || new Date(0)
        this.SpectatorBanExpiration = $b.spectatorBanExpiration || new Date(0)
        this.MuteBanExpiration = $b.muteBanExpiration || new Date(0)
        this.Password = $b.password || new String()
        this.RecoverCode = $b.recoverCode || new String()
        this.Tags = $b.tags || new List()
        this.PatreonData = $b.patreonData || null
        this.Credits = $b.credits || new Number()
        this.NCRDepositAddress = $b.NCRDepositAddress || new String()
        this.ReferralId = $b.referralId || new String()
        this.ReferrerUserId = $b.referrerUserId || new String()
        this.Profile = $b.profile || new Object()
    }
    get IsAccountBanned() {
        return new Date() < this.AccountBanExpiration
    }
    get IsPublicBanned() {
        return new Date() < this.PublicBanExpiration
    }
    get IsSpectatorBanned() {
        return new Date() < this.SpectatorBanExpiration
    }
    get IsMuteBanned() {
        return new Date() < this.MuteBanExpiration
    }
    get CurrentAccountType() {
        if (this.PatreonData == null) return AccountType.Normal;
        return this.PatreonData.CurrentAccountType
    }
    get AccountName() {
        return this.PatreonData.AccountName || NeosAccount.AccountName(AccountType.Normal)
    }
    get IsPasswordValid() {
        return this.Password != null && this.Password.length >= 8 && true //TODO:Count Check
    }
    get IsUsernameValid() {
        if (this.Username != null)
            return this.Username.length > 0;
        return false
    }
}
class UserSession {
    constructor($b) {
        if (!$b) $b = {}
        this.UserID = $b.userId || new String()
        this.SessionToken = $b.token || new String()
        this.SessionCreated = $b.created || new Date()
        this.SessionExpire = $b.expire || new Date()
        this.SecretMachineId = $b.secretMachineId || new String()
        this.RememberMe = $b.rememberMe || new Boolean()
    }
    get IsExpired() {
        return new Date() > this.SessionExpire
    }
}
class Visit {
    constructor($b) {
        if (!$b) $b = {}
        this.URL = $b.url || new Uri()
        this.UserId = $b.userId || new String()
        this.NeosSessionID = $b.neosSessionID || new String()
        this.RecordVersion = $b.recordVersion || new Number()
        this.Duration = $b.duration || new Number()
        this.Start = $b.start || new Date()
        this.End = $b.end || new Date()
        this.Referal = $b.referal || new String()
    }
    get IsValid() {
        return this.Start.getFullYear() >= 2016 && !(this.Start >= this.End) && ((this.End - this.Start).getSeconds() >= this.Duration && !String.IsNullOrWhiteSpace(this.URL._rawUrl))
    }
}
class CloudResult {
    constructor() {
        this.State
        this.Content
    }
    ToString() {
        return ("CloudResult - State: " + this.State + " Content: " + this.Content)
    }
    CloudResult(state, content) {
        this.State = state
        this.Content = content
        if (!this.IsError) return;
        if (content == null) return;
        try {
            this.Content = JSON.parse(content).Message
        } catch (error) {
            this.Content = content
        }
    }
    get Entity() {
        return this.Content
    }
    get IsOK() {
        if (this.State != 200) return (this.State == 204);
        return true
    }
    get IsError() {
        return !this.IsOK;
    }
}
class CloudResultGeneric extends CloudResult {

}
class CloudXInterface {
    constructor() {
        this.lockobj = new Object()
        this._groupMemberships = new Membership();
        this._groupMemberInfos = new Member();
        this._groups = new List();
        this.cachedRecords = new CloudResult();
        this._currentSession;
        this._currentUser;
        this._cryptoProvider;
        this._currentAuthenticationHeader;
        this._lastSessionUpdate;
        this.lastServerStatsUpdate;
        this.HttpClient
        this.PublicKey
        this.ServerResponseTime
        this.LastServerUpdate
        this.lastServerStateFetch
        this.Friends
        this.Messages
        this.Transactions
        this.SessionChanged
        this.UserUpdated
        this.MembershipsUpdated
        this.GroupUpdated
        this.GroupMemberUpdated
    }
    static CloudEndpoint = {
        "Production": 0,
        "Staging": 1,
        "Local": 2
    }
    static DEFAULT_RETRIES = 5;
    static UPLOAD_DEGREE_OF_PARALLELISM = 16;
    static DEBUG_UPLOAD = false;
    static storageUpdateDelays = [1, 5, 15, 30];
    static get JSON_MEDIA_TYPE() {
        return {
            'content-type': 'application/json'
        }
    }
    static SESSION_EXTEND_INTERVAL = 3600;
    static ProfilerBeginSampleCallback;
    static ProfilerEndSampleCallback;
    static MemoryStreamAllocator;
    static USE_CDN = new Boolean();
    static CLOUDX_PRODUCTION_NEOS_API = "https://cloudx.azurewebsites.net/";
    static CLOUDX_STAGING_NEOS_API = "https://cloudx-staging.azurewebsites.net/";
    static CLOUDX_NEOS_BLOB = "https://cloudxstorage.blob.core.windows.net/";
    static CLOUDX_NEOS_CDN = "https://cloudx.azureedge.net/";
    static LOCAL_NEOS_API = "http://localhost:60612/";
    static LOCAL_NEOS_BLOB = "http://127.0.0.1:10000/devstoreaccount1/";
    ProfilerBeginSample(name) { }
    ProfilerEndSample() { }
    static CLOUD_ENDPOINT = CloudXInterface.CloudEndpoint.Production;
    static get NEOS_API() {
        switch (CloudXInterface.CLOUD_ENDPOINT) {
            case CloudXInterface.CloudEndpoint.Production:
                return "https://cloudx.azurewebsites.net/";
            case CloudXInterface.CloudEndpoint.Staging:
                return "https://cloudx-staging.azurewebsites.net/";
            case CloudXInterface.CloudEndpoint.Local:
                return "https://localhost:60612/";
            default:
                throw new Error("Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.toString())
        }
    }
    static get NEOS_BLOB() {
        switch (CloudXInterface.CLOUD_ENDPOINT) {
            case CloudXInterface.CloudEndpoint.Production:
            case CloudXInterface.CloudEndpoint.Staging:
                return CloudXInterface.NEOS_CLOUD_BLOB
            case CloudXInterface.CloudEndpoint.Local:
                return CloudXInterface.NEOS_CLOUD_BLOB;
            default:
                throw new Error("Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.toString())
        }
    }
    static get NEOS_ASSETS() {
        return CloudXInterface.NEOS_BLOB + "assets/";
    }
    static get NEOS_ASSETS_CDN() {
        return "https://cloudx.azureedge.net/assets/";
    }
    static get NEOS_ASSETS_BLOB() {
        return "https://cloudxstorage.blob.core.windows.net/assets/";
    }
    static get NEOS_THUMBNAILS() {
        return "https://cloudxstorage.blob.core.windows.net/thumbnails/";
    }
    static get NEOS_INSTALL() {
        return "https://cloudx.azureedge.net/install/";
    }
    static get NEOS_CLOUD_BLOB() {
        return !CloudXInterface.USE_CDN ? "https://cloudxstorage.blob.core.windows.net/" : "https://cloudx.azureedge.net/";
    }
    get ServerStatus() {
        if ((new Date() - this.lastServerStateFetch).getSeconds >= 60.0) return ServerStatus.NoInternet
        if ((new Date() - this.LastServerUpdate).getSeconds >= 60.0) return ServerStatus.Down
        return this.ServerResponseTime > 250 ? this.ServerStatus.Slow : this.ServerStatus.Good
    }
    get CurrentUser() {
        return this._currentUser;
    }
    set CurrentUser(value) {
        if (value == this._currentUser) return;
        this._currentUser = value;
        let userUpdated = this.UserUpdated
        if (userUpdated == null) return;
        userUpdated(this._currentUser)
    }
    get CurrentSession() {
        return this._currentSession
    }
    set CurrentSession(value) {
        if (value == this._currentSession) return;
        //LOCK OBJECT
        if (this._currentSession.SessionToken != value.SessionToken) this._lastSessionUpdate = new Date();
        this._currentSession = value;
        this._currentAuthenticationHeader = value != null ? new AuthenticationHeaderValue('neos', value.userId + ":" + value.SessionToken) : (AuthenticationHeaderValue);
        this.OnSessionUpdated()
        try {
            let sessionChanged = this.sessionChanged;
            if (sessionChanged == null) return;
            sessionChanged(this._currentSession);
        } catch (error) {
            Error("Exception in SessionChanged: " + (this.CurrentSession.toString() + error.toString()), true);
        }
    }
    get CurrentUserMemberships() {
        return this._groupMemberships;
    }
    get CurrentUserGroupInfos() {
        return this._groups.map(function (p) {
            return p.Value
        })
    }
    get CurrentUserMemberInfos() {
        return this._groupMemberInfos.map(function (p) {
            return p.Value
        })
    }
    TryGetCurrentUserGroupInfo(groupId) {
        return this._groups.filter(function (item) {
            return (item['groupId'] === groupId)
        })
    }
    TryGetCurrentUserGroupMemberInfo(groupId) {
        return this._groupMemberInfos.filter(function (item) {
            return (item['groupId'] === groupId)
        })
    }
    IsCurrentUserMemberOfGroup(groupId) {
        return this.TryGetCurrentUserGroupMemberInfo != null
    }
    TryGetCurrentUserGroupMembership(groupId) {
        let a = this._groupMemberInfos.indexOf(groupId)
        if (a) { return this._groupMemberInfos[a] }
    }
    OnLogin() { }
    OnLogout() { }
    OnSessionUpdated() { }
    CloudXInterface() {
        this.HttpClient = HTTP_CLIENT
        this.Friends = new FriendManager(this);
        this.Messages = new MessageManager(this);
        this.Transactions = new TransactionManager(this);
    }
    update() {
        Lock.acquire(this.lockobj, () => {
            if (this.CurrentSession != null) {
                if ((new Date() - this._lastSessionUpdate).getSeconds() >= 3600.0) {
                    //Task.Run<CloudResult>(new Func<Task<CloudResult>>(this.ExtendSession)); TODO
                    this._lastSessionUpdate = new Date()
                }
            }
        })
        if ((new Date() - this._lastServerStatsUpdate).getSeconds() >= 10.0) {
            (async () => {
                cloudResult = await this.GetServerStatistics()
                if (cloudResult.IsOK) {
                    this.ServerResponseTime = cloudResult.Entity.ResponseTimeMilliseconds
                    this.LastServerUpdate = cloudResult.Entity.LastUpdate;
                }
                this.lastServerStateFetch = new Date()
            })
            this._lastServerStatsUpdate = new Date()
        }
        this.Friends.Update()
        this.Messages.Update()
    }
    HasPotentialAccess(ownerId) {
        switch (IdUtil.GetOwnerType(ownerId)) {
            case OwnerType.Machine:
                return true
            case OwnerType.User:
                return ownerId == this.CurrentUser.Id
            case OwnerType.Group:
                let ogreturn
                //TODO Create Object.Any
                Lock.acquire(this.lockobj, () => { ogreturn = this.CurrentUserMemberships.Any(m => m.GroupId == ownerId) })
                return ogreturn
            default:
                return false
        }
    }
    SetMemberships(memberships) {
        Lock.acquire(this.lockobj, () => {
            this._groupMemberships = memberships
            this.RunMembershipsUpdated()
        })
    }
    ClearMemberships() {
        Lock.acquire(this.lockobj, () => {
            if (this._groupMemberships.length == 0) return;
            this._groupMemberships = []
            this.RunMembershipsUpdated()
        })
    }
    async RunMembershipsUpdated() {
        for (groupMembership of this._groupMemberships) {
            await this.UpdateGroupInfo(groupMembership.GroupId)
        }
        let membershipsUpdated = this.MembershipsUpdated
        if (membershipsUpdated == null) return;
        membershipsUpdated(this._groupMemberships)
    }
    static NeosDBToHttp(neosdb, forceCDN = false, forceCloudBlob = false) {
        let str1 = CloudXInterface.NeosDBSignature(neosdb);
        let str2 = CloudXInterface.NeosDBQuery(neosdb)
        let str3 = str1
        if (str2 != null) str3 = str3 + "/" + str2
        if (CloudXInterface.IsLegacyNeosDB(neosdb)) return new Uri("https://neoscloud.blob.core.windows.net/assets/" + str3);
        return new Uri((forceCDN ? CloudXInterface.NEOS_ASSETS_CDN : (forceCloudBlob ? "https://cloudxstorage.blob.core.windows.net/" : CloudXInterface.NEOS_ASSETS)) + str3)
    }
    static FilterNeosURL(assetURL) {
        if (assetURL.Scheme == "neosdb" && assetURL.Segments.length >= 2 && assetURL.Segments.includes('.'))
            return assetURL = new Uri("neosdb:///" + (assetURL.Segments[1].noExtension()) + assetURL.Query);
        return assetURL
    }
    static NeosDBFilename(neosdb) {
        return neosdb.Segments[1] + neosdb.Query
    }
    static NeosDBSignature(neosdb) {
        return neosdb.Segments[1].noExtension()
    }
    static NeosDBQuery(neosdb) {
        if (neosdb.Query == null || neosdb.Query == "")
            return null
        return neosdb.Query.substring(1)
    }
    static NeosThumbnailIdToHttp(id) {
        return new Uri(CloudXInterface.NEOS_THUMBNAILS + id)
    }
    static TryFromString(url) {
        if (url == null) return null;
        //TODO URI VALIDATION, FOR NOT IS RAW
        if (true) return new Uri(url)
        return null
    }
    static IsLegacyNeosDB(uri) {
        if (uri.Scheme != "neosdb")
            return false
        return uri.Segments[1].noExtension().length < 30;
    }
    //473
    GET(resource, timeout = null) {
        return this.RunRequest((() => { return this.CreateRequest(resource, HttpMethod.Get) }), timeout)
    }
    POST(resource, entity, timeout = null) {
        return this.RunRequest((() => {
            request = this.CreateRequest(resource, HttpMethod.Post);
            this.AddBody(request, entity)
            return request;
        }), timeout)
    }
    POST_File(resource, filePath, FileMIME = null, progressIndicator = null) {
        return this.RunRequest((() => {
            request = this.CreateRequest(resource, HttpMethod.Post);
            this.AddFileToRequest(request, filePath, FileMIME, progressIndicator);
            return request
        }), 60.0)//TODO TIMESPAN FROM MINUTES NOT 60
    }
    PUT(resource, entity, timeout = null) {
        return this.RunRequest((() => {
            request = this.CreateRequest(resource, HttpMethod.Put)
            this.AddBody(request, entity)
            return request
        }), timeout)
    }
    PATCH(resource, entity, timeout = null) {
        return this.RunRequest((() => {
            request = this.CreateRequest(resource, CloudXInterface.PATCH_METHOD)
            this.AddBody(request, entity)
            return request
        }), timeout)
    }
    DELETE(resource, timeout = null) {
        return this.RunRequest((() => { return this.CreateRequest(resource, HttpMethod.Delete) }), timeout);

    }
    AddFileToRequest(request, filePath, mime = null, progressIndicator = null) {
        //FILESTREAM
        /*
        FileStream fileStream = System.IO.File.OpenRead(filePath);
        StreamProgressWrapper streamProgressWrapper = new StreamProgressWrapper((Stream) fileStream, progressIndicator, (Action<Stream, IProgressIndicator>) null, new long?());
        MultipartFormDataContent multipartFormDataContent = new MultipartFormDataContent();
        StreamContent streamContent = new StreamContent((Stream) streamProgressWrapper, 32768);
        if (mime != null)
            streamContent.Headers.ContentType = MediaTypeHeaderValue.Parse(mime);
        streamContent.Headers.ContentLength = new long?(fileStream.Length);
        multipartFormDataContent.Add((HttpContent) streamContent, "file", Path.GetFileName(filePath));
        request.Content = (HttpContent) multipartFormDataContent;
        */
    }
    CreateRequest(resource, method) {
        let request = new httpRequestMessage(method, CloudXInterface.NEOS_API + resource)
        if (this.CurrentSession != null)
            request.Headers.Authorization = this._currentAuthenticationHeader;
        return request
    }
    AddBody(message, entity) {
        //TODO
    }
    async RunRequest(requestSource, timeout) {
        let request = null
        let result = null
        let exception = null
        let remainingRetries = CloudXInterface.DEFAULT_RETRIES
        let delay = 0
        do {
            request = requestSource();
            let cancellationToken = new CancellationTokenSource(timeout ? timeout : fromSeconds(30.0));
            result = await HTTP_CLIENT.SendAsync(request, cancellationToken.Token)
            result = result.Entity
            if (result == null) {
                console.error(`Exception running `)
                request = null
                await Delay(new TimeSpan(delay))
                delay += 250
            } else {
                return result
            }
        }
        while (result == null && remainingRetries-- > 0)
        if (result == null) {
            if (exception == null)
                throw new Error("Failed to get response. Exception is null")
            throw new Error(exception)
        }
    }
    async Login(credential, password, sessionToken, secretMachineId, rememberMe, reciverCode) {
        let cloudXinterface = this
        cloudXinterface.Logout(false);
        let credentials = new LoginCredentials()
        credentials.Password = password
        credentials.RecoverCode = reciverCode
        credentials.SessionToken = sessionToken
        credentials.secretMachineId = secretMachineId
        credentials.RememberMe = rememberMe
        if (credential.startsWith('U-'))
            credentials.OwnerId = credential
        else if (credential.includes('@'))
            credentials.Email = credential
        else
            credentials.Email = credential
        result = await cloudXinterface.POST("api/userSessions", credentials, new TimeSpan())
        if (result.IsOK) {
            cloudXinterface.CurrentSession = result.Entity
            cloudXinterface.CurrentUser = new User()
            cloudXinterface.CurrentUser.Id = cloudXinterface.CurrentSession.UserId
            cloudXinterface.CurrentUser.Username = credentials.Username
            cloudXinterface.UpdateCurrentUserInfo()
            cloudXinterface.UpdateCurrentUserMemberships()
            cloudXinterface.Friends.Update()
            cloudXinterface.onLogin()
        }
        else error("Error loging in: " + result.State.toString() + "\n" + result.Content)
        return result
    }
    async ExtendSession() {
        return await this.PATCH("api/userSessions", null, new TimeSpan())
    }
    async Register(username, email, password) {
        this.Logout(false)
        let u = new User()
        u.Username = username
        u.Email = email
        u.Password = password
        return await this.POST("/api/users", u, new TimeSpan())
    }
    async RequestRecoveryCode(email) {
        let u = new User()
        u.Email = email
        return await this.POST("/api/users/requestlostpassword", u, new TimeSpan())
    }
    async UpdateCurrentUserinfo() {
        switch (this.CurrentUser.Id) {
            case null:
                throw new Error("No current user!")
            default:
                let user = await this.GetUser(this.CurrentUser.Id);
                let entity = user.Entity
                if (user.IsOK && this.CurrentUser != null && this.CurrentUser.Id == entity.Id) {
                    this.CurrentUser = entity
                    patreonData = this.CurrentUser.PatreonData;
                    let num = new Number()
                    if ((patreonData != null ? (patreonData.IsPatreonSupporter ? 1 : 0) : 0) == 0) {
                        tags = this.CurrentUser.Tags
                        num = tags != null ? (tags.includes(UserTags.NeosTeam) ? 1 : 0) : 0;
                    }
                    else
                        num = 1
                    CloudXInterface.USE_CDN = num != 0
                }
                return user
        }
    }
    async GetUser(userId) {
        return await this.GET("api/users/" + userId, new TimeSpan())
    }
    async GetUserByName(username) {
        return await this.GET("api/users/" + username + "?byUsername=true", new TimeSpan())
    }
    async GetUsers(searchName) {
        return await this.GET("api/users?name=" + Uri.ExcapeDataString(searchName), new TimeSpan())
    }
    async GetUserCached(userId) {
        return await this.GetUser(userId)
    }
    Logout(manualLogOut) {
        this.OnLogout()
        if (this.CurrentSession != null && !this.CurrentSession.RememberMe | manualLogOut) {
            let _userId = this.CurrentSession.UserId
            let _sessionToken = this.CurrentSession.SessionToken
                (async () => await this.DELETE("api/userSessions/" + _userId + "/" + _sessionToken, new TimeSpan()))
        }
        this._cryptoProvider = null
        this.PublicKey // TODO RSAParameters
        this.CurrentSession = null
        this.CurrentUser = null
        this.ClearMemberships()
        this.Friends = []
        CloudXInterface.USE_CDN = false
    }
    SignHash(hash) {
        return this._cryptoProvider //TODO Cryptography
    }
    async FetchRecordCached(recordUri) {
        Lock.acquire(this.cachedRecords, () => {
            let dictionary = []
            //TODO Wtf is this lol
        })
    }
    FetchRecordIRecord(recordUri) {
        var ownerId = []
        var recordId = []
        if (RecordUtil.ExtractRecordID(recordUri, ownerId, recordId))
            return this.FetchRecord(ownerId.Value, recordId.Value)
        var recordPath = []
        if (RecordUtil.ExtractRecordPath(recordUri, ownerId, recordPath))
            return this.FetchRecordAtPath(ownerId.Value, recordPath.Value)
        throw new Error("Uri is not a record URI")
    }
    FetchRecord(ownerId, recordId) {
        if (!recordId) return this.FetchRecordIRecord(ownerId); // iRecord fetch
        return this.GET("api/" + CloudXInterface.GetOwnerPath(ownerId) + "/" + ownerId + "/records/" + recordId, new TimeSpan())
    }
    FetchRecordAtPath(ownerId, path) {
        return this.GET("api/" + CloudXInterface.GetOwnerPath(ownerId) + "/" + ownerId + "/records/root/" + path, new TimeSpan())
    }
    GetRecords(ownerId, tag = null, path = null) {
        let ownerPath = CloudXInterface.GetOwnerPath(ownerId);
        let str = ""
        if (tag != null)
            str = "?tag=" + Uri.EscapeDataString(tag);
        if (path != null)
            str = "?path=" + Uri.EscapeDataString(path)
        return this.GET("api/" + ownerPath + "/" + ownerId + "/records" + str)
    }
    FindRecords(search) {
        return this.POST("/api/records/search", search, new TimeSpan())
    }
    UpsertRecord(record) {
        let resource;
        switch (IdUtil.GetOwnerType(record.OwnerId)) {
            case OwnerType.User:
                resource = "api/users/" + record.OwnerId + "/records/" + record.RecordId;
                break
            case OwnerType.Group:
                resource = "api/groups/" + record.OwnerId + "/records/" + record.RecordId;
                break
            default:
                throw new Error("Invalid record owner")
        }
        return this.PUT(resource, record, new TimeSpan())
    }
    PreprocessRecord(record) {
        let resource;
        switch (IdUtil.GetOwnerType(record.OwnerId)) {
            case OwnerType.User:
                resource = "api/users/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess";
                break
            case OwnerType.Group:
                resource = "api/groups/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess";
                break
            default:
                throw new Error("Invalid record owner")
        }
        return this.POST(resource, record, new TimeSpan())
    }
    GetPreprocessStatus(ownerId, recordId, id) {
        if (!recordId) {
            recordId = ownerId.RecordId
            id = ownerId.PreprocessId
            ownerId = ownerId.OwnerId
        }
        let resource;
        switch (IdUtil.GetOwnerType(record.OwnerId)) {
            case OwnerType.User:
                resource = "api/users/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess/" + id;
                break
            case OwnerType.Group:
                resource = "api/groups/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess/" + id;
                break
            default:
                throw new Error("Invalid record owner")
        }
        return this.GET(resource, record, new TimeSpan())
    }
    async DeleteRecord(ownerId, recordId) {
        if (!recordId) {
            recordid = ownerId.RecordId
            ownerId = ownerId.OwnerId
        }
        let result = await this.DELETE("api/users/" + ownerId + "/records/" + recordId, new TimeSpan())
        await this.UpdateStorage(ownerId)
        return result
    }
    AddTag(ownerId, recordId, tag) {
        switch (IdUtil.GetOwnerType(ownerId)) {
            case OwnerType.User:
                return this.PUT("api/users/" + ownerId + "/records/" + recordId + "/tags", tag, new TimeSpan());
            case OwnerType.Group:
                return this.PUT("api/groups/" + ownerId + "/records/" + recordId + "/tags", tag, new TimeSpan());
            default:
                throw new Error("Invalid record owner")
        }
    }
    async UpdateStorage(ownerId) {
        if (this.CurrentUser == null) return
        let ownerType = IdUtil.GetOwnerType(ownerId);
        let _signedUserId = this.CurrentUser.Id;
        let numArray = CloudXInterface.storageUpdateDelays;
        for (index = 0; index < numArray.length; index++) {
            await Delay(fromSeconds(numArray[index]))
            if (this.CurrentUser.Id != _signedUserId) return;
            if (ownerType == OwnerType.User) {
                cloudResult = await this.UpdateCurrentUserInfo()
            }
            else {
                await this.UpdateGroupInfo(ownerId)
            }
        }
        numArray = null
    }
    async FetchGlobalAssetInfo(hash) {
        return await this.GET("api/assets/" + hash.toLowerCase(), new TimeSpan())
    }
    async FetchUserAssetInfo(hash) {
        return await this.FetchUserAssetInfo(this.CurrentUser.Id, hash)
    }
    async FetchAssetInfo(ownerId, hash) {
        switch (IdUtil.GetOwnerType(ownerId)) {
            case OwnerType.User:
                return await this.GET("api/users/" + ownerId + "/assets/" + hash, new TimeSpan())
            case OwnerType.Group:
                return await this.GET("api/groups/" + ownerId + "/assets/" + hash, new TimeSpan())
            default:
                throw new Error("Invalid ownerId")
        }
    }
    async RegisterAssetInfo(assetInfo) {
        switch (IdUtil.GetOwnerType(assetInfo.OwnerId)) {
            case OwnerType.User:
                return await this.PUT("api/users/" + assetInfo.OwnerId + "/assets/" + assetInfo.AssetHash, assetInfo, new TimeSpan())
            case OwnerType.Group:
                return await this.PUT("api/groups/" + assetInfo.OwnerId + "/assets/" + assetInfo.AssetHash, assetInfo, new TimeSpan())
            default:
                throw new Error("Invalid ownerId")
        }
    }
    GetAssetBaseURL(ownerId, hash, variant) {
        hash = hash.toLowerCase()
        let str = hash
        if (variant != null)
            str += ("&" + variant)
        switch (IdUtil.GetOwnerType(ownerId)) {
            case OwnerType.User:
                return "api/users/" + ownerId + "/assets/" + str
            case OwnerType.Group:
                return "api/groups/" + ownerId + "/assets/" + str
            default:
                throw new Error("Invalid ownerId")
        }
    }
    async UploadAsset(ownerId, signature, variant, assetPath, retries = 5, progressIndicator = null) {
        let cloudResult = await this.BeginUploadAsset(ownerId, signature, variant, assetPath, retries, progressIndicator, new Number())
        if (!cloudResult.isOK) return cloudResult
        return await this.WaitForAssetFinishProcessing(cloudResult.Entity)
    }
    EnqueueChunk(baseUrl, fileName, buffer, processingBuffers) {
        buffer.task = this.RunRequest((() => { })) //TODO Wtf is this
    }
    async TakeFinishedBuffer(buffers) {
        //TODO TakeFinishedBuffer
    }
    async BeginUploadAsset(ownerId, signature, variant, assetPath, retries = 5, progressIndicator = null, bytes = null) {
        let fileName = Path.GetFileName(assetPath)
        //TODO finish
    }
    async WaitForAssetFinishProcessing(assetUpload) {
        let baseUrl = this.GetAssetBaseURL(assetUpload.OwnerId, assetUpload.Signature, assetUpload.Variant) + "/chunks"
        let cloudResult
        while (true) {
            cloudResult = await this.GET(baseUrl, new TimeSpan())
            if (!cloudResult.IsError && (cloudResult.Entity.UploadState != UploadState.Uploaded && cloudResult.Entity.UploadState != UploadState.Failed))
                await Delay(new TimeSpan(250))
            else
                break;
        }
        return cloudResult
    }
    UploadThumbnail(path) {
        return this.POST_File("api/thumbnails", path, "image/webp", null)
    }
    ExtendThumbnailLifetime(thumbnail) {
        return this.PATCH("api/thumbnails", thumbnail, new TimeSpan())
    }
    DeleteThumbnail(thumbnail) {
        return this.DELETE("api/thumbnails/" + thumbnail.Id + "/" + thumbnail.Key, new TimeSpan())
    }
    async GetGroup(groupId) {
        return await this.GET("api/groups/" + groupId, new TimeSpan())
    }
    async GetGroupCaches(groupId) {
        return await this.GetGroup(groupId)
    }
    async CreateGroup(group) {
        return await this.POST("api/groups", group, new TimeSpan())
    }
    async AddGroupMember(member) {
        return await this.POST("api/groups/" + member.GroupId + "/members", member, new TimeSpan())
    }
    async DeleteGroupMember(member) {
        return await this.DELETE("api/groups/" + member.GroupId + "/members/" + member.UserId, new TimeSpan())
    }
    async GetGroupMember(groupId, userId) {
        return await this.GET("api/groups/" + groupId + "/members/" + userId, new TimeSpan())
    }
    async GetGroupMembers(groupId) {
        return await this.GET("api/groups/" + groupId + "/members", new TimeSpan())
    }
    async UpdateCurrentUserMemberships() {
        let groupMemberships = await this.GetUserMemberships();
        if (groupMemberships.isOK)
            this.SetMemberships(groupMemberships.Entity)
        return groupMemberships
    }
    async GetUserGroupMemberships(userId) {
        if (!userId)
            return await this.GetUserGroupMemberships(this.CurrentUser.Id);
        return await this.GET("api/users/" + userId + "/memberships", new TimeSpan())
    }
    async UpdateGroupInfo(groupId) {
        let group = this.GetGroup(groupId)
        let memberTask = this.GetGroupMember(groupId, this.CurrentUser.Id)
        let groupResult = await group
        let cloudResult = await memberTask
        Lock.acquire(this.lockobj, () => {
            if (groupResult.IsOK) {
                this._groups.Remove(groupId)
                this._groups.Add(groupId, groupResult.Entity)
                groupUpdated = this.GroupUpdated
                if (groupUpdated != null)
                    groupUpdated(groupResult.Entity)
            }
        })
    }
}
class CancellationTokenSource {
    constructor(timeout) {
        this.Token = new uuidv4()
    }
}

class Endpoints {
    static CLOUDX_NEOS_API = "https://cloudx.azurewebsites.net";
    static CLOUDX_NEOS_BLOB = "https://cloudxstorage.blob.core.windows.net/assets/";
    static CLOUDX_NEOS_THUMBNAILS = "https://cloudxstorage.blob.core.windows.net/thumbnails/";
}
class FriendManager {
    static UPDATE_PERIOD_SECONDS = 5
    constructor() {
        this.friends = new Array()
        this._friendSessions = new Array()
        this._lock = "FriendManager._lock"
        this.lastStatusUpdate = null
        this.lastRequest = null
        this._friendsChanged = new Boolean()
        this.Cloud
        this.FriendRequestCount
    }
    FriendManager(cloud) {
        this.Cloud = cloud
    }
    get FriendCount() {
        return this.friends.length
    }
    GetFriends(list) {
        for (let friend of this.friends) {
            list.push(friend.Value)
        }
    }
    ForeachFriend(action) {
        for (let friend of this.friends) {
            action(friend.Value)
        }
    }
    GetFriendSessions(sessions) {
        for (let friendSession of this._friendSessions) {
            sessions.push(friendSession.Value)
        }
        return this._friendSessions.length
    }
    ForeachFriendSession(action) {
        for (let friendSession of this._friendSessions) {
            action(friendSession.Value)
        }
    }
    GetFriend(friendId) {
        //TODO GetFriend
    }
    //TODO Friend Manager
}


class MessageManager {
    constructor() {
        this._messagesLock = "MessageManager._messagesLock"
        this._messages = new List()
        this.lastRequest
        this.lastUnreadMessage
        this._unreadCountDirty = new Boolean()
        this._waitingForRequest = new Boolean()
        this.Cloud
        this.InitialmessagesFetched = new Boolean()
        this.UnreadCount = new Number()
    }
    static UPDATE_PERIOD_SECONDS = 1;
    static UPDATE_TIMEOUT_SECONDS = 10

    static get MAX_READ_HISTORY() {
        return 100;
    }
    static get MAX_UNREAD_HISTORY() {
        return 500;
    }
    MessageManager(cloud) {
        this.Cloud = cloud
    }

    Update() {
        if (this.Cloud.CurrentUser == null) {
            return
        }
        if (this._unreadCountDirty) {
            this._unreadCountDirty = false
            Lock.acquire(this._messagesLock, () => {
                this.UnreadCount = this._messages.length
                messageCountChanged = this.UnreadMessageCountChanged
                if (messageCountChanged != null) {
                    messageCountChanged(this.UnreadCount)
                }
            })
        }
        if ((new Date() - this.lastRequest).getSeconds() < (this._waitingForRequest ? MessageManager.UPDATE_TIMEOUT_SECONDS : MessageManager.UPDATE_PERIOD_SECONDS)) {
            return;
        }
        this.lastRequest = new Date()
        this._waitingForRequest = true(async () => {
            let cloudResult1 = await this.Cloud.GetUnreadMessages(this.lastUnreadMessage)
            this._waitingForRequest = false
            if (!cloudResult1.IsOK) {
                return
            }
            var hashSet = [] // HashSet need to create
            Lock.acquire(this._messagesLock, () => {
                for (message of cloudResult1.Entity) {
                    if (this.GetUserMessages(message.SenderId).AddMessage(message))
                        hashSet.push(message);
                }
            })
            let flag1 = false
            for (message of cloudResult1.Entity) {
                if (!hashSet.includes(message)) {
                    if (this.InitialmessagesFetched && message.MessageType == MessageType.CreditTransfer) {
                        let content = message.ExtractContent()
                        let flag2 = content.RecipientId == this.Cloud.CurrentUser.Id
                        let currentUser = this.Cloud.CurrentUser
                        if (currentUser.Credits != null && currentUser.Credits.CONTAINSKEY(content.Token)) { //TODO: Create Function CONTAINSKEY
                            currentUser.Credits[content.Token] += flag2 ? content.Amount : -content.Amount;
                        }
                        flag1 = true;
                    }
                    let onMessageReceived = this.onMessageReceived
                    if (onMessageReceived != null) onMessageReceived(message);
                    let friend = this.Cloud.Friends.GetFriend(message.SenderId);
                    if (friend != null) friend.LatestMessageTime = Math.max(new Date(), message.SendTime);
                }
            }
            //TODO: POOL RETURN
            this.MarkUnreadCountDirty()
            this.InitialmessagesFetched = true;
            if (!flag1) return;
            await setTimeout(() => {
                cloudResult2 = this.Cloud.UpdateCurrentUserInfo()
            }, 10000)
        })

    }
    MarkUnreadCountDirty() {
        this._unreadCountDirty = true;
    }
    Reset() {
        Lock.acquire(this._messagesLock, () => {
            this._messages = new Array()
            this.lastUnreadMessage = new Date()
            this.InitialmessagesFetched = false;
        })
    }
    GetUserMessages(userId) {
        Lock.acquire(this._messagesLock, () => {
            if (this._messages.indexOf(userId))
                return this._messages[userId]
            let usermessages2 = new MessageManager.UserMessages(userId, this)
            this._messages.push({ userId: usermessages2 })
            return usermessages2
        })
    }
    GetAllUserMessages(list) {
        Lock.acquire(this._messagesLock, () => {
            for (message of this._messages) {
                list.push(message.Value)
            }
        })
    }
    //event OnMessageReceived
    //event UnreadMessageCounrChange
    static UserMessages = class {
        constructor() {
            this._messageIds = new List()
            this._lock = "MessageManager.UserMessages._lock"
            this._historyLoadTask;
            this._historyLoaded = new Boolean()
            this.UserId = new String()
            this.UnreadCount = new Number()
            this.Messages = new Array()
        }
        get CloudXInterface() {
            return this.Manager.Cloud
        }
        UserMessages(userId, manager) {
            this.UserId = userId
            this.Manager = manager
        }
        MarkAllRead() {
            let ids = null
            Lock.acquire(this._lock, () => {
                if (this.UnreadCount == 0) return;
                ids = new Array()
                for (message of this.Messages) {
                    if (!message.IsSent && !(message.ReadTime != undefined)) {
                        message.ReadTime = new Date()
                        ids.push(message.Id)
                    }
                }
                this.UnreadCount = 0;
            })
                (async () => { await this.Cloud.MarkMessagesRead(ids) })
            this.Manager.MarkUnreadCountDirty()
        }
        CreateTextMessage(text) {
            let message = new Message()
            message.MessageType = MessageType.Text
            message.Content = text
            return message
        }
        CreateInviteMessage(sessionInfo) {
            let message = new Message()
            message.Id = Message.GenerateId()
            message.SendTime = new Date()
            message.MessageType = MessageType.SessionInvite;
            message.SetContent(sessionInfo)
            return message
        }
        async SendInviteMessage(sessionInfo) {
            return await this.SendMessage(this.CreateInviteMessage(sessionInfo));
        }
        AddSentTransactionMessage(token, amount, comment) {
            let message = new Message()
            message.Id = Message.GenerateId();
            message.OwnerId = this.Cloud.CurrentUser.Id;
            message.RecipientId = this.UserId
            message.SenderId = message.OwnerId
            message.SendTime = new Date()
            message.MessageType = MessageType.CreditTransfer
            let _transaction = new TransactionMessage()
            _transaction.Token = token
            _transaction.Amount = amount
            _transaction.Comment = comment
            _transaction.RecipientId = this.UserId
            message.SetContent(_transaction)
            Lock.acquire(this._lock, () => {
                this.Messages.push(message)
            })
            return message
        }
        async SendMessage(message) {
            if (message.Id == null) message.Id = Message.GenerateId()
            message.RecipientId = this.UserId
            message.SenderId = this.Cloud.CurrentUser.Id
            message.OwnerId = message.SenderId
            message.SendTime = new Date()
            Lock.acquire(this._lock, () => {
                this.Messages.push(message)
            })
            let friend = this.Cloud.Friends.GetFriend(message.RecipientId)
            if (friend != null) friend.LatestMessageTime = new Date()
            return await this.Cloud.SendMessage(message)
        }
        async SendTextMessage(text) {
            return await this.SendMessage(this.CreateTextMessage(text))
        }
        async EnsureHistory() {
            if (this._historyLoaded) return;
            let isFirstRequest = false
            Lock.acquire(this._lock, () => {
                if (this._historyLoaded) return;
                if (this._historyLoadTask == null) {
                    isFirstRequest = true
                    this._historyLoadTask = this.Cloud.GetMessageHistory(this.UserId, MessageManager.MAX_READ_HISTORY)

                }
            })
            let cloudResult = await this._historyLoadTask
            if (!isFirstRequest) return;
            if (!cloudResult.IsOK) {
                this._historyLoadTask = null
            } else {
                Lock.acquire(this._lock, () => {
                    this.Messages = cloudResult.Entity
                    this.Messages.reverse()
                    this.UnreadCount = this.Messages.filter(m => !m.ReadTime != undefined).length
                    this._historyLoaded = true
                })
            }
        }
        AddMessage(message) {
            Lock.acquire(this._lock, () => {
                if (this._messageIds.includes(message.Id)) return false;
                this.Messages.Add(message)
                this._messageIds.Add(message.Id)
                if (message.IsReceived && !message.ReadTime != undefined)++this.UnreadCount
                while (this.Messages.length > MessageManager.MAX_UNREAD_HISTORY || this.Messages.length > MessageManager.MAX_UNREAD_HISTORY && (this.Messages[0].IsSent || this.Messages[0].ReadTime != undefined)) {
                    this._messageIds.Remove(this.Messages[0].Id)
                    this.Messages.RemoveAt(0)
                }
                return true
            })
            return true
        }
        GetMessages(messages) {
            messages.AddRange(this.Messages);
        }
    }
}
class TransactionUtil {
    static NCR_CONVERSION_VARIABLE = "NCR_CONVERSION"
}
class StringNumberConversion {
    static DecimalToBigInt(value) { }
    static BigIntToDecimal(value) { }
}
class TransactionManager {
    constructor() {
        this.Cloud
        this.NCRConversionRatio
    }
    TransactionManager(cloud) {
        this.Cloud = cloud
            (async () => { await this.LoadConversionData() })
    }
    async LoadConversionData() {
        let cloudResult = await this.Cloud.ReadGlobalVariable(TransactionUtil.NCR_CONVERSION_VARIABLE)
        if (cloudResult.IsOK) {
            this.NCRConversionRatio = BigInt(StringNumberConversion.DecimalToBigInt(cloudResult.Entity));
        } else {
            console.error("Error getting conversion ratio. " + cloudResult.State.ToString() + "\n\n" + cloudResult.Content);
        }
    }
    TryConvert(sourceToken, sourceAmount, targetToken) {
        if (sourceToken == "USD") {
            if (targetToken == null || !(targetToken == "NCR")) return new Number()
            let num = sourceAmount;
            let ncrConversionRatio = this.NCRConversionRatio
            if (!ncrConversionRatio != undefined) return new Number()
            return new BigInt(num / ncrConversionRatio)
        }
        if (!(targetToken == "USD")) return new Number()
    }
    //TODO Rest of Thing, Will Break
}

const Shared = { CloudXInterface }
module.exports = {
    Shared
}