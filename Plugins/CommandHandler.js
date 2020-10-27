class EventQueue {
  constructor(CommandHandler) {
    this.CommandHandler = CommandHandler //Refrence Parent

    this.Queue = []
    //this.Interval = setInterval(this.RunQueue, 500)
  }
  Add(Command, Sender, Args, Handler) {
    this.Queue.push({
      Command,
      Sender,
      Args,
      Handler
    });
    this.RunQueue() // Disable Queue Interval for now
  }
  RunQueue() {
    if (this.Queue.length==0) return true

      let Command = this.Queue.shift()
      this.CommandHandler.Commands[Command.Command].Run(Command.Sender, Command.Args, Command.Handler)
    
  }
}
class CommandHandler {
  constructor(NeosJS, NeosVR) {
    this.Neos = NeosJS
    this.Neos.CommandHandler = this
    this.NeosVR = NeosVR
    this.Commands = {}
    this.Queue = new EventQueue(this)
  }
  Run(Message) {
    var context
    if (this instanceof CommandHandler) {context = this} else {context = this.CommandHandler}
    if (Message.SenderId == context.Neos.CurrentUser.Id) return false
    let args = Message.Content.split(" ");
    let Command = args.shift()
    if (context.Commands[Command]) {
      context.Queue.Add(Command, Message.SenderId, args, new Handler(context.Neos, Message.SenderId))
    } else {
      return context.Neos.SendTextMessage(Message.SenderId, "Invalid Command")
    }

  }
  Add(command, cb, whitelist) {
    var context
    if (this instanceof CommandHandler) {context = this} else {context = this.CommandHandler}
    if (typeof cb != 'function') throw new Error("Command must pass ('command', Function)")
    context.Commands[command] = new Command(cb, whitelist, context)
  }
}
class Handler {
  constructor(Neos, Sender) {
    this.Neos = Neos
    this.Sender = Sender
  }
  Reply(Message) {
    this.Neos.SendTextMessage(this.Sender, Message)
  }

}
class Command {
  constructor(cb, whitelist) {
    this.script = cb
    this.whitelist = whitelist
  }
  Run(Sender, Args, Handler) {
    if (this.whitelist && !~this.whitelist.indexOf(Sender)) return false
    this.script(Handler, Sender, Args)
    //Command Code
  }
}

module.exports = CommandHandler