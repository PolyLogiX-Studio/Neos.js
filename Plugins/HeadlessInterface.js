const { EventEmitter } = require("events");
const path = require("path");
class HeadlessInterface {
	/**
   *
   * @param {String | 'child_process'} headlessPath
   * @param {String} [configPath]
   */
	constructor(headlessPath, configPath) {
		if (typeof headlessPath == "string") {
			if (process.platform === "win32") {
				//Windows
				this.NeosVR = require("child_process").spawn(
					path.join(headlessPath, "Neos.exe"),
					[
						"--config",
						configPath
							? configPath
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
						configPath
							? configPath
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
		this.NeosVR.stdout.on("data", (data) =>
			this.Events.emit("HeadlessResponse", data.toString())
		);
	}

	/**
   * Send a command to the Headless Client
   * @param {String} text
   * @returns {Promise<String>}
   */
	Send(text) {
		let response = new Promise((Resolve) =>
			this.Events.on("HeadlessResponse", Resolve)
		);
		this.NeosVR.stdin.write(text + "\n");
		return response;
	}
}
module.exports = HeadlessInterface;
