/**
 * @name HandlerCallback
 * @function
 * @param {Handler} [Handler] Send a reply to the Sender
 * @param {String} [Sender] U-ID of the user who triggered the command
 * @param {Array<String>} [Args] Arguments to the Command
 */

/**
 * CommandExtended Plugin. Adds more features to CommandHandler
 * @param {CommandHandler} CommandHandler
 * @param {{Prefix:"/",HelpCommand:"help",UsageCommand:"usage",CommandsCommand:"commands",HelpDefault:"Get a list of commands with $this.prefix + $this.CommandsCommand"}} Options
 * @class CommandExtended
 * @example
 * const CommandHandler = require("@bombitmanbomb/neosjs/Plugins/CommandHandler")
 * const CommandExtended = require("@bombitmanbomb/neosjs/Plugins/CommandExtended")
 * const NEOS = require("@bombitmanbomb/neosjs")
 * const Neos = new NEOS()
 * const Command = new CommandExtended(new CommandHandler(Neos),Options);
 * Command.Add("Ping", (Handler)=>{Handler.Reply("Pong")})
 * Command.SetHelp("Ping", {index:"Ping Pong!", usage:Command.Options.Prefix+"Ping"})
 * Command.Add("Relay", (Handler, Sender, Args)=>{
 *  if (Args.length<2) return Handler.Usage();
 *  if (!Args[0].startsWith("U-")) return Handler.Reply("First Argument must be a UserID.");
 *  if (!Neos.IsFriend(Args[0])) return Handler.Reply("User is not a Friend of the bot.");
 *  Neos.SendTextMessage(Args.shift(), Args.join(" ")); // Remove first argument (UserID) and join the rest with spaces.
 *  Handler.Reply("Message Sent!")
 * },
 * {
 *  index:"Send a message to another user via the bot.",
 *  usage:Command.Options.Prefix+"Relay <User-ID> <Message>"
 * }, ["U-BotOwner"]);
 * Neos.on("messageReceived", Command.Run);
 */
class CommandExtended {
	constructor(CommandHandler, Options = {}) {
		this.Options = {};
		this.Options.Prefix = Options.Prefix || "/";
		this.Options.HelpCommand = Options.HelpCommand || "help";
		this.Options.UsageCommand = Options.UsageCommand || "usage";
		this.Options.CommandsCommand = Options.CommandsCommand || "commands";
		this.Options.BetterArguments =
			Options.BetterArguments != null ? Options.BetterArguments : true;
		if (this.Options.CommandsCommand) {
			this.Options.HelpDefault = `Get a list of commands with ${
				this.Options.Prefix + this.Options.CommandsCommand
			}.`;
		} else {
			this.Options.HelpDefault = "No Help Available, Contact the Bot Owner";
		}
		CommandHandler.CommandHandlerExtended = this;
		this.CommandHandler = CommandHandler;

		/**
		 * Respond with the "usage" Help index.
		 * Injected by CommandExtended
		 * @memberof Handler
		 * @requires CommandHandler
		 */
		this.CommandHandler.Handler.prototype.Usage = function (Args) {
			let help = this.Extra.GetHelp("usage");
			this.Reply(
				typeof help === "function"
					? help(Args)
					: help || "Improper Usage: No Usage Available"
			);
		};
		/**
		 * Respond with a Help Index.
		 * Injected by CommandExtended
		 * @param {String} index
		 * @memberof Handler
		 */
		this.CommandHandler.Handler.prototype.Help = function (index, Args) {
			let help = this.Extra.GetHelp(index);
			this.Reply(
				typeof help === "function" ? help(Args) : help || "No Help Available"
			);
		};
		this.HelpData = {
			null: new HelpObject(this.Options.HelpDefault),
			get undefined() {
				return this[null]; //lgtm [js/implicit-operand-conversion]
			},
		};
		if (this.Options.CommandsCommand)
			this.HelpData[this.Options.CommandsCommand] = new HelpObject({
				index: "Get a list of commands",
				usage: `${
					this.Options.Prefix + this.Options.CommandsCommand
				} [Page #|all]`,
			});
		if (this.Options.HelpCommand)
			this.HelpData[this.Options.HelpCommand] = new HelpObject({
				index: "Get help for a command",
				usage: `${
					this.Options.Prefix + this.Options.HelpCommand
				} Command [Help Page (index, usage, ...)]`,
			});
		if (this.Options.UsageCommand)
			this.HelpData[this.Options.UsageCommand] = new HelpObject({
				index: "Get usage for a command",
				usage: `${
					this.Options.Prefix + this.Options.UsageCommand
				} Command [Help Arguments?]`,
			});
	}
	/**
	 * @private
	 * @param {String} str
	 */
	ParseArguments(str = "") {
		var context;
		if (this instanceof CommandExtended) {
			context = this;
		} else {
			context = this.CommandHandlerExtended;
		}
		var search = str.trim();
		let Output = [];
		if (search === "") return [];
		var flag = false;
		var stringBuilder = new context.CommandHandler.Neos.CloudX.Util.StringBuilder();
		for (let index = 0; index < search.length; index++) {
			let num = index === search.length ? 1 : 0;
			let c = num !== 0 ? " " : search[index];
			if (num !== 0 || (c == " " && !flag) || (c === "\"") & flag) {
				if (stringBuilder.Length > 0) {
					Output.push(stringBuilder.ToString());
				}
				stringBuilder.Clear();
				flag = false;
			} else if (c === "\"") flag = true;
			else stringBuilder.Append(c);
		}
		if (stringBuilder.Length > 0) {
			Output.push(stringBuilder.ToString());
		} // Catch last phrase
		return Output;
	}
	/**
	 * Add a new Command Hook
	 * @param {String} Command Command
	 * @param {HandlerCallback} Script Script to run on command call
	 * @param {String | {index:String|Function,usage:String|Function,HelpIndex:String|Function}} [Help] Help Info
	 * @param {Array<String>} [Whitelist] Users allowed to run the command
	 */
	Add(Command, Script, Help, Whitelist) {
		var context;
		if (this instanceof CommandExtended) {
			context = this;
		} else {
			context = this.CommandHandler.CommandHandlerExtended;
		}
		context.CommandHandler.Add(
			context.Options.Prefix + Command,
			Script,
			Whitelist
		);
		context.HelpData[Command] = new HelpObject(Help);
	}

	/**
	 * Set help of a command, Will overwrite any previous indexes
	 * @param {String} Command Command to set Index for
	 * @param {String | {index:String|Function,usage:String|Function,HelpIndex:String|Function}} Help Help Info
	 */
	SetHelp(Command, Help) {
		var context;
		if (this instanceof CommandExtended) {
			context = this;
		} else {
			context = this.CommandHandler.CommandHandlerExtended;
		}
		context.HelpData[Command] = new HelpObject(Help);
	}

	/**
	 * @private
	 * @param {*} Message
	 */
	async Help(Message) {
		var context;
		if (this instanceof CommandExtended) {
			context = this;
		} else {
			context = this.CommandHandler.CommandHandlerExtended;
		}
		let commandData = Message.Content.trim().split(" ");
		commandData.shift(); // remove Help from the command
		let Command = commandData.shift();
		let Args = commandData;
		let helpObject = context.HelpData[Command];
		if (helpObject == null)
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				"No Help Available"
			);

		let Help = helpObject.GetHelp(Args.shift());
		switch (typeof Help) {
		case "function":
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				await Help(Args, this)
			);
		case "string":
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				Help
			);
		}
	}

	/**
	 * @private
	 * @param {*} Message
	 */
	async Usage(Message) {
		var context;
		if (this instanceof CommandExtended) {
			context = this;
		} else {
			context = this.CommandHandler.CommandHandlerExtended;
		}
		let commandData = Message.Content.trim().split(" ");
		commandData.shift(); // remove Usage from the command
		let Command = commandData.shift();
		let Args = commandData;
		let helpObject = context.HelpData[Command];
		if (helpObject == null)
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				"Command " + Command + " Not Found"
			);

		let Help = helpObject.GetHelp("usage");
		switch (typeof Help) {
		case "function":
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				await Help(Args)
			);
		case "string":
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				Help
			);
		}
	}

	/**
	 * @private
	 * @param {*} Message
	 */
	Commands(Message) {
		var context;
		if (this instanceof CommandExtended) {
			context = this;
		} else {
			context = this.CommandHandler.CommandHandlerExtended;
		}
		let commandData = Message.Content.trim().split(" ");
		commandData.shift(); // remove Help from the command
		let Index = commandData.shift() || 1;
		if (Number.isNaN(Number(Index)) && Index !== "all")
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				"Invalid Argument, Expecter Integer or \"all\""
			);
		if (!context.CommandListInfo)
			context.CommandListInfo = new CommandHelper(context);
		if (Number.isNaN(Number(Index))) {
			let CommandList = [];
			for (
				let page = 1;
				context.CommandListInfo.CommandPages.length + 1 > page;
				page++
			) {
				CommandList.push(context.CommandListInfo.GetPage(page));
			}
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				CommandList
			);
		} else {
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				context.CommandListInfo.GetPage(Math.floor(new Number(Index)))
			);
		}
	}

	/**
	 * Parse and run the given message object
	 * @param {*} Message
	 */
	Run(Message) {
		var context;
		if (this instanceof CommandExtended) {
			context = this;
		} else {
			context = this.CommandHandler.CommandHandlerExtended;
		}
		if (Message.MessageType != "Text")
			return context.CommandHandler.Neos.SendTextMessage(
				Message.SenderId,
				"I am only configured to handle Text messages."
			);
		switch (Message.Content.trim().split(" ")[0].toLowerCase()) {
		case context.Options.Prefix + context.Options.HelpCommand:
			context.Help(Message);
			break;
		case context.Options.Prefix + context.Options.CommandsCommand:
			context.Commands(Message);
			break;
		case context.Options.Prefix + context.Options.UsageCommand:
			context.Usage(Message);
			break;
		default:
			var CONTEXT =
					context.HelpData[
						Message.Content.trim()
							.split(" ")[0]
							.substring(context.Options.Prefix.length)
					];
			context.CommandHandler.Run(Message, CONTEXT);
		}
	}
}

/**
 *@private
 *
 * @class HelpObject
 */
class HelpObject {
	constructor(help) {
		this.HelpData = {};
		if (typeof help == "string") {
			this.HelpData["index"] = help;
			this.HelpData["usage"] = "Usage Not Available";
			return this;
		}
		for (let index in help)
			this.HelpData[index.trim().replace(" ", "_")] = help[index];
		return this;
	}
	GetHelp(index) {
		if (index == null) index = "index";
		let help = this.HelpData[index];
		if (help == null)
			help =
				"Additional Argument Required: " +
				Object.keys(this.HelpData).join(", ");

		return help;
	}
}
const util = require("util");

/**
 *@private
 *
 * @class CommandHelper
 */
class CommandHelper {
	static get MSG_LENGTH_MAX() {
		return 105;
	}
	static get CMD_PER_PAGE() {
		return 6;
	}
	constructor(CommandHandlerExtended) {
		this.CommandExtended = CommandHandlerExtended;
		this.CommandHandler = this.CommandExtended.CommandHandler;
		this.Commands = this.CommandHandler.Commands;
		this.Generate();
	}
	GetPage(index = 1) {
		if (!this.CommandPages) this.Generate();
		if (index < 1) index = 1;
		let page = index - 1;
		if (index > this.CommandPages.length || index < 1)
			return `Invalid Page: ${index}, Pages Available: ${this.CommandPages.length}`;
		return util.format(
			this.CommandPages[page],
			page + 1,
			this.CommandPages.length
		);
	}
	Generate() {
		if (!this.Commands) return false;
		this.CommandPages = new Array();
		let Commands = Object.keys(this.Commands);
		Commands.push(
			this.CommandExtended.Options.Prefix +
				this.CommandExtended.Options.HelpCommand
		);
		Commands.push(
			this.CommandExtended.Options.Prefix +
				this.CommandExtended.Options.CommandsCommand
		);
		Commands.push(
			this.CommandExtended.Options.Prefix +
				this.CommandExtended.Options.UsageCommand
		);
		Commands.sort();

		let commands = 0;
		//Build List
		let CurrentPage = new String();
		for (let command of Commands) {
			if (
				command.length + CurrentPage.length > CommandHelper.MSG_LENGTH_MAX ||
				commands + 1 > CommandHelper.CMD_PER_PAGE
			) {
				commands = 0;
				CurrentPage += "<br>Page %d - %d";
				this.CommandPages.push(CurrentPage);
				CurrentPage = command + "<br>";
				continue;
			}
			CurrentPage += command + "<br>";
			commands++;
		}
		if (CurrentPage != new String()) {
			CurrentPage += "<br>Page %d - %d";
			this.CommandPages.push(CurrentPage);
		}
	}
}
module.exports = CommandExtended;
