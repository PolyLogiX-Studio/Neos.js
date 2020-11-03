/**
 * @private
 * @param {{Reply:(Message:String)}} [Handler] Send a reply to the Sender
 * @param {String} [Sender] U-ID of the user who triggered the command
 * @param {Array<String>} [Args] Arguments to the Command
 */
function HandlerCallback(Handler, Sender, Args) {}

class EventQueue {
	constructor(CommandHandler) {
		this.CommandHandler = CommandHandler; //Refrence Parent

		this.Queue = [];
		//this.Interval = setInterval(this.RunQueue, 500)
	}
	/**
   *
   *
   * @param {*} Command
   * @param {*} Sender
   * @param {*} Args
   * @param {*} Handler
   * @memberof EventQueue
   */
	Add(Command, Sender, Args, Handler, Extra) {
		this.Queue.push({
			Command,
			Sender,
			Args,
			Handler,
			Extra
		});
		this.RunQueue(); // Disable Queue Interval for now
	}
	/**
   *
   *
   * @returns
   * @memberof EventQueue
   */
	RunQueue() {
		if (this.Queue.length == 0) return true;

		let Command = this.Queue.shift();
		this.CommandHandler.Commands[Command.Command].Run(
			Command.Sender,
			Command.Args,
			Command.Handler,
			Command.Extra
		);
	}
}
/**
 * A Plugin for Neos.js to add Command Functionality to Bots
 * @class CommandHandler
 */
class CommandHandler {
	constructor(NeosJS, Invalid = "Invalid Command") {
		this.Handler = Handler
		this.Neos = NeosJS;
		this.Invalid = Invalid;
		this.Neos.CommandHandler = this;
		this.Commands = {};
		this.Queue = new EventQueue(this);
	}
	/**
   * Run a Message for Commands
   *
   * @param {{Id,OwnerId,RecipientId,SenderId,MessageType,Content,SendTime,LastUpdateTime,ReadTime}} Message
   * @memberof CommandHandler
   */
	Run(Message, Extra) {
		var context;
		if (this instanceof CommandHandler) {
			context = this;
		} else {
			context = this.CommandHandler;
		}
		if (Message.SenderId == context.Neos.CurrentUser.Id) return false;
		let args = Message.Content.split(" ");
		let Command = args.shift();
		if (context.Commands[Command]) {
			context.Queue.Add(
				Command,
				Message.SenderId,
				args,
				new this.Handler(context.Neos, context, Message, Extra)
			);
		} else {
			context.Neos.SendTextMessage(Message.SenderId, context.Invalid);
		}
	}
	/**
   * Add a Command
   *
   * @param {String} command
   * @param {HandlerCallback} cb
   * @param {Array<String>} [whitelist]
   * @memberof CommandHandler
   */
	Add(command, cb, whitelist) {
		var context;
		if (this instanceof CommandHandler) {
			context = this;
		} else {
			context = this.CommandHandler;
		}
		if (typeof cb != "function")
			throw new Error("Command must pass ('command', Function)");
		context.Commands[command] = new Command(cb, whitelist, context);
	}
}
/**
 *
 *
 * @class Handler
 */
class Handler {
	


	constructor(Neos, Context, Message, Extra) {
		this.Neos = Neos;
		this.Message = Message;
		this.Context = Context
		this.Extra = Extra // Modding Support Extra Variable Passthrough
	}
	/**
   *
   *
   * @param {*} Message
   * @memberof Handler
   */
	Reply(Message) {
		this.Neos.SendTextMessage(this.Message.SenderId, Message);
	}
}
/**
 *
 *
 * @class Command
 */
class Command {
	/**
   *Creates an instance of Command.
   * @param {Function} cb
   * @param {Array<String>} whitelist
   * @memberof Command
   */
	constructor(cb, whitelist) {
		this.script = cb;
		this.whitelist = whitelist;
	}
	/**
   *
   *
   * @param {String} Sender
   * @param {Array<String>} Args
   * @param {Handler} Handler
   * @returns
   * @memberof Command
   */
	Run(Sender, Args, Handler) {
		if (this.whitelist && !~this.whitelist.indexOf(Sender)) return false;
		this.script(Handler, Sender, Args);
		//Command Code
	}
}

module.exports = CommandHandler;
