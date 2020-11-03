/**
 * @private
 * @param {{Reply:(Message:String)}} [Handler] Send a reply to the Sender
 * @param {String} [Sender] U-ID of the user who triggered the command
 * @param {Array<String>} [Args] Arguments to the Command
 */
function HandlerCallback(Handler, Sender, Args) {}

/**
 *
 */
class CommandExtended {
  /**
   *
   * @param {Object} CommandHandler
   * @param {*} Options
   */
  constructor(CommandHandler, Options = {}) {
    this.Options = {};
    this.Options.Prefix = Options.Prefix || "/";
    this.Options.HelpCommand = Options.HelpCommand || "help";
    this.Options.UsageCommand = Options.UsageCommand || "usage";
    this.Options.CommandsCommand = Options.CommandsCommand || "commands";
    this.Options.HelpDefault = this.Options.CommandsCommand
      ? `Get a list of commands with ${
          this.Options.Prefix + this.Options.CommandsCommand
        }.`
      : "No Help Available, Contact the Bot Owner";
    CommandHandler.CommandHandlerExtended = this;
    this.CommandHandler = CommandHandler;
    this.CommandHandler.Handler.prototype.Usage = function () {
      this.Reply(this.Extra.GetHelp("usage"));
    };
    this.HelpData = {
      undefined: new HelpObject(this.Options.HelpDefault),
      get null() {
        return this[undefined];
      },
    };
    if (this.Options.CommandsCommand)
      this.HelpData[this.Options.CommandsCommand] = new HelpObject({
        index: "Get a list of commands",
        usage: `${this.Options.Prefix + this.Options.CommandsCommand} [Page]`,
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
    let prefix = context.Options.Prefix;
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
    let prefix = context.Options.Prefix;
    let commandData = Message.Content.trim().split(" ");
    commandData.shift(); // remove Help from the command
    let Index = commandData.shift() || 1;
    if (Number.isNaN(Number(Index)))
      return context.CommandHandler.Neos.SendTextMessage(
        Message.SenderId,
        "Invalid Argument, Expecter Integer, got String"
      );
    if (!context.CommandListInfo)
      context.CommandListInfo = new CommandHelper(context);
    return context.CommandHandler.Neos.SendTextMessage(
      Message.SenderId,
      context.CommandListInfo.GetPage(Math.floor(new Number(Index)))
    );
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
        let CONTEXT = context.HelpData[Message.Content.trim().split(" ")[0]];
        let Extra = CONTEXT;
        context.CommandHandler.Run(Message, Extra);
    }
  }
}
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
class CommandHelper {
  static MSG_LENGTH_MAX = 105;
  static CMD_PER_PAGE = 6;
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
