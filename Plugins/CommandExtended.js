class CommandExtended {
  constructor(CommandHandler, Options) {
    this.Options = {};
    this.Options.Prefix = Options.Prefix || '/';
    this.Options.HelpCommand = Options.HelpCommand || 'help';
    this.Options.CommandsCommand = Options.CommandsCommand || 'commands';
    CommandHandler.CommandHandlerExtended = this;
    this.CommandHandler = CommandHandler;
    this.HelpData = {};
  }
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
    context.Help[Command] = new HelpObject(Command, Help);
  }
  Help(Message) {
    var context;
    if (this instanceof CommandExtended) {
      context = this;
    } else {
      context = this.CommandHandler.CommandHandlerExtended;
    }
    context.CommandHandler.Neos.SendTextMessage(
      Message.SenderId,
      'Command Coming Soon'
    );
  }
  Commands(Message) {
    var context;
    if (this instanceof CommandExtended) {
      context = this;
    } else {
      context = this.CommandHandler.CommandHandlerExtended;
    }
    context.CommandHandler.Neos.SendTextMessage(
      Message.SenderId,
      'Command Coming Soon'
    );
  }
  Run(Message) {
    var context;
    if (this instanceof CommandExtended) {
      context = this;
    } else {
      context = this.CommandHandler.CommandHandlerExtended;
    }
    if (Message.MessageType != 'Text')
      return context.CommandHandler.Neos.SendTextMessage(
        Message.SenderId,
        'I am only configured to handle Text messages.'
      );
    switch (Message.Content.trim().split(' ')[0].toLowerCase()) {
      case context.Options.Prefix + context.Options.HelpCommand:
        context.Help(Message);
        break;
      case context.Options.Prefix + context.Options.CommandsCommand:
        context.Commands(Message);
        break;
      default:
        context.CommandHandler.Run(Message);
    }
  }
}
class HelpObject {
  constructor() {}
}
module.exports = CommandExtended;
