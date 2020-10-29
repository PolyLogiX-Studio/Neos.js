class CommandExtended {
  constructor(CommandHandler, Options ) {
    this.Options = {}
    this.Options.Prefix = Options.Prefix || "/"
    this.Options.EnableHelp = Options.EnableHelp || "help"
    this.Options.CommandList = Options.CommandList || "commands"
    this.CommandHandler = CommandHandler
    this.CommandHandler.CommandHandlerExtended = this
    this.Help = {}
  }
  Add(Command, Script, Help, Whitelist) {
    var context
    if (this instanceof CommandExtended) {
      context = this
    } else {
      context = this.CommandHandler.CommandHandlerExtended
    }
    context.CommandHandler.Add(context.Options.Prefix + Command, Script, Whitelist)
    context.Help[Command] = new HelpObject(Command, Help)
  }
  Help(Message){
    var context
    if (this instanceof CommandExtended) {
      context = this
    } else {
      context = this.CommandHandler.CommandHandlerExtended
    }
  }
  Commands(Message){
    var context
    if (this instanceof CommandExtended) {
      context = this
    } else {
      context = this.CommandHandler.CommandHandlerExtended
    }
  }
  Run(Message) {
    var context
    if (this instanceof CommandExtended) {
      context = this
    } else {
      context = this.CommandHandler.CommandHandlerExtended
    }
    if (Message.MessageType != "Text") return context.CommandHandler.Neos.SendTextMessage(Message.SenderId, "I am only configured to handle Text messages.")
    switch (Message.Content.split()[0].toLowerCase()) {
      case context.Options.Prefix + context.Options.EnableHelp:
        context.Help(Message)
        break
      case context.Options.Prefix + context.Options.CommandList:
        context.Commands(Message)
        break
      default:
        context.CommandHandler.Run(Message)
    }
  }
}
class HelpObject {
  constructor() {}
}
module.exports = CommandExtended