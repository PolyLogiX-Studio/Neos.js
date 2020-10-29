class CommandExtended {
  constructor(CommandHandler, Options){
    this.CommandHandler = CommandHandler
    this.CommandHandler
  }
  Add(Command){}
  Run(Message){
    var context
    if (this instanceof CommandExtended) { context = this } else { context = this } // Need to test Outer Context context
  }
}
module.exports = CommandHandler