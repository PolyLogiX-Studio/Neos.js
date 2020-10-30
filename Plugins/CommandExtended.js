class CommandExtended {
  constructor(CommandHandler, Options = {}) {
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
    context.HelpData[Command] = new HelpObject(Help);
  }
  async Help(Message) {
    var context;
    if (this instanceof CommandExtended) {
      context = this;
    } else {
      context = this.CommandHandler.CommandHandlerExtended;
    }
    let prefix = context.Options.Prefix;
    let commandData = Message.Content.trim().split(' ');
    commandData.shift(); // remove Help from the command
    let Command = commandData.shift();
    let Args = commandData;
    let helpObject = context.HelpData[Command];
    if (helpObject == null)
      return context.CommandHandler.Neos.SendTextMessage(
        Message.SenderId,
        'No Help Available'
      );

    let Help = helpObject.GetHelp(Args.shift());
    switch (typeof Help) {
      case 'function':
        return context.CommandHandler.Neos.SendTextMessage(
          Message.SenderId,
          await Help(Args)
        );
      case 'string':
        return context.CommandHandler.Neos.SendTextMessage(
          Message.SenderId,
          Help
        );
    }
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
  constructor(help) {
    this.HelpData = {};
    if (typeof help == 'string') {
      this.HelpData['index'] = help;
      this.HelpData['usage'] = 'Usage Not Available';
      return this;
    }
    for (let index in help)
      this.HelpData[index.trim().replace(' ', '_')] = help[index];
    return this;
  }
  GetHelp(index) {
    if (index == null) index = 'index';
    let help = this.HelpData[index];
    if (help == null)
      help =
        'Additional Argument Required: ' +
        Object.keys(this.HelpData).join(', ');

    return help;
  }
}
module.exports = CommandExtended;
