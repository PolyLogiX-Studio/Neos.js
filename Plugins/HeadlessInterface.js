const { log } = require("console");
const { EventEmitter } = require("events");
const fs = require("fs");
const path = require("path");
class HeadlessInterface {
  /**
   *
   * @param {String | 'child_process'} headlessPath
   * @param {String} [configPathRelative]
   * @param {any} [options]
   */
  constructor(headlessPath, configPathRelative, options) {
    this.State = {
      Running: false,
      Starting: true,
      CompatibilityHash: null,
      log: false,
      logMsg: 0,
    };
    this.Options = options || {};
    if (this.Options.Events == null) this.Options.Events = false;
    if (typeof headlessPath == "string") {
      if (process.platform === "win32") {
        //Windows
        this.NeosVR = require("child_process").spawn(
          path.join(headlessPath, "Neos.exe"),
          [
            "--config",
            configPathRelative
              ? configPathRelative
              : path.join(headlessPath, "Config/Config.json"),
          ],
          {
            windowsHide: true,
            cwd: headlessPath /* Folder to Neos Headless For Binaries*/,
          }
        );
      } else {
        //Linux requires Mono
        this.NeosVR = require("child_process").spawn(
          "mono",
          [
            path.join(headlessPath, "Neos.exe"),
            "--config",
            configPathRelative
              ? configPathRelative
              : path.join(headlessPath, "/Config/Config.json"),
          ],
          {
            windowsHide: true,
            cwd: headlessPath /* Folder to Neos Headless For Binaries*/,
          }
        );
      }
    } else {
      this.NeosVR = headlessPath;
    }
    this.Events = new EventEmitter();
    this.NeosVR.stdout.on("data", (data) => {
      data = data.toString();
      if (data.startsWith("Enabling logging output.")) {
        this.State.log = true;
        this.State.logMsg = 1;
        return;
      }
      if (this.State.logMsg != 0) {
        this.State.logMsg++;
        if (this.State.logMsg < 4) return (this.State.logMsg = 0);
      }
      if (data.startsWith("World running...")) {
        this.State.Starting = false;
        this.State.Running = true;
        if (this.Options.Events) this.NeosVR.stdin.write("log\n");
      }
      this.Events.emit("HeadlessResponse", data);
    });
  }

  /**
   * Send a command to the Headless Client
   * @param {String} text
   * @returns {Promise<String>}
   */
  Send(text) {
    let response = new Promise((Resolve) =>
      this.Events.once("HeadlessResponse", Resolve)
    );
    if (this.Options.Events && this.State.log) text = "\n" + text + "\nlog";
    this.NeosVR.stdin.write(text + "\n");
    return response;
  }
}
module.exports = HeadlessInterface;
