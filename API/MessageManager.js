const { Message } = require("./Message");
const { TransactionMessage } = require("./TransactionMessage");
const { Dictionary } = require("./Dictionary");
const { List } = require("./List");
const { HashSet } = require("./HashSet");
const { Out } = require("./Out");
class MessageManager {
	constructor(cloud) {
		this.lastRequest = null;
		this.lastUnreadMessage = null;
		this.Cloud = cloud;
		this.InitialmessagesFetched = new Boolean();
		this.UnreadCountByUser = new Dictionary();
		this.UnreadCount = new Number();
		Object.defineProperties(this, {
			_messagesLock: {
				value: new Object(),
				writable: false,
			},
			_messages: {
				value: new Dictionary(),
				writable: true,
			},
			_unreadCountDirty: {
				value: new Boolean(),
				writable: true,
			},
			_waitingForRequest: {
				value: new Boolean(),
				writable: true,
			},
		});
	}
	static get UPDATE_PERIOD_SECONDS() {
		return 1;
	}
	static get UPDATE_TIMEOUT_SECONDS() {
		return 30;
	}

	static get MAX_READ_HISTORY() {
		return 100;
	}
	static get MAX_UNREAD_HISTORY() {
		return 200;
	}
	MessageManager(cloud) {
		this.Cloud = cloud;
	}

	Update() {
		if (this.Cloud.CurrentUser == null) {
			return;
		}
		if (this._unreadCountDirty) {
			Object.defineProperties(this, {
				_unreadCountDirty: {
					value: false,
					writable: true,
				},
			});
			this.UnreadCount = this._messages.length;
			let messageCountChanged = this.UnreadMessageCountChanged;
			if (messageCountChanged != null) {
				messageCountChanged(this.UnreadCount);
			}
		}
		if (
			new Date(new Date() - this.lastRequest).getSeconds() <
			(this._waitingForRequest
				? MessageManager.UPDATE_TIMEOUT_SECONDS
				: MessageManager.UPDATE_PERIOD_SECONDS)
		) {
			return;
		}
		this.lastRequest = new Date();
		this._waitingForRequest = true;
		(async () => {
			await this.Cloud.GetUnreadMessages(this.lastUnreadMessage).then(
				async (cloudResult1) => {
					this._waitingForRequest = false;
					if (cloudResult1.IsError) {
						return;
					}
					var hashSet = new HashSet();
					for (let message of cloudResult1.Entity) {
						let tMessage = this.GetUserMessages(message.SenderId);
						if (!tMessage) hashSet.push(message);
						else {
							tMessage.AddMessage(message);
						}
					}
					let flag1 = false;
					for (let message of cloudResult1.Entity) {
						if (!hashSet.includes(message)) {
							if (
								this.InitialmessagesFetched &&
								message.MessageType === "CreditTransfer"
							) {
								//let content = message.ExtractContent(); //
								////let flag2 = content.RecipientId === this.Cloud.CurrentUser.Id;
								////let currentUser = this.Cloud.CurrentUser;
								/*
                            if (currentUser.Credits != null && currentUser.Credits.CONTAINSKEY(content.Token)) { //TODO: Create Function CONTAINSKEY
                                currentUser.Credits[content.Token] += flag2 ? content.Amount : -content.Amount;
                            }
                            */
								flag1 = true;
							}
							let onMessageReceived = this.onMessageReceived;
							if (onMessageReceived != null) onMessageReceived(message);
							let friend = this.Cloud.Friends.GetFriend(message.SenderId);
							if (friend != null)
								friend.LatestMessageTime = Math.max(
									new Date(),
									message.SendTime
								);
						}
					}
					//TODO: POOL RETURN
					this.MarkUnreadCountDirty();
					this.InitialmessagesFetched = true;
					if (!flag1) return;
					await setTimeout(() => {
						this.Cloud.UpdateCurrentUserInfo();
					}, 10000);
				}
			);
		})();
	}
	MarkUnreadCountDirty() {
		Object.defineProperties(this, {
			_unreadCountDirty: {
				value: true,
				writable: true,
			},
		});
	}
	Reset() {
		Object.defineProperties(this, {
			_messages: {
				value: new Dictionary(),
				writable: true,
			},
		});
		this.lastUnreadMessage = new Date();
		this.InitialmessagesFetched = false;
	}
	GetUserMessages(userId) {
		let usermessages1 = new Out();
		if (this._messages.TryGetValue(userId, usermessages1)) {
			return usermessages1.Out;
		}
		let usermessages2 = new MessageManager.UserMessages();
		usermessages2.UserMessages(userId, this);
		this._messages.Add(userId, usermessages2);
		return usermessages2;
	}

	/**
	 *
	 *
	 * @param {List} list
	 * @memberof MessageManager
	 */
	GetAllUserMessages(list) {
		for (let message of this._messages) {
			list.push(message.Value);
		}
	}
	//event OnMessageReceived
	//event UnreadMessageCounrChange
	static get UserMessages() {
		return class {
			constructor() {
				this.UserId = new String();
				this.UnreadCount = new Number();
				this.Messages = new List();
				Object.defineProperties(this, {
					_messageIds: {
						value: new List(),
						writable: false,
					},
					_lock: {
						value: "MessageManager.UserMessages._lock",
						writable: false,
					},
					_historyLoadTask: {
						value: () => {},
						writable: true,
					},
					_historyLoaded: {
						value: new Boolean(),
						writable: true,
					},
				});
			}
			get CloudXInterface() {
				return this.Manager.Cloud;
			}
			UserMessages(userId, manager) {
				this.UserId = userId;
				this.Manager = manager;
			}
			MarkAllRead() {
				let ids = null;
				if (this.UnreadCount === 0) return;
				ids = new Array();
				for (let message of this.Messages) {
					if (!message.IsSent && !(message.ReadTime != null)) {
						message.ReadTime = new Date();
						ids.push(message.Id);
					}
				}
				this.UnreadCount = 0;
				(async () => {
					await this.Manager.Cloud.MarkMessagesRead(ids);
				})();
				this.Manager.MarkUnreadCountDirty();
			}
			CreateTextMessage(text) {
				let message = new Message();
				message.MessageType = "Text";
				message.Content = text;
				return message;
			}
			CreateInviteMessage(sessionInfo) {
				let message = new Message();
				message.Id = Message.GenerateId();
				message.SendTime = new Date();
				message.MessageType = "SessionInvite";
				message.SetContent(sessionInfo);
				return message;
			}
			async SendInviteMessage(sessionInfo) {
				return await this.SendMessage(this.CreateInviteMessage(sessionInfo));
			}
			AddSentTransactionMessage(token, amount, comment) {
				let message = new Message();
				message.Id = Message.GenerateId();
				message.OwnerId = this.Manager.Cloud.CurrentUser.Id;
				message.RecipientId = this.UserId;
				message.SenderId = message.OwnerId;
				message.SendTime = new Date();
				message.MessageType = "CreditTransfer";
				let _transaction = new TransactionMessage();
				_transaction.Token = token;
				_transaction.Amount = amount;
				_transaction.Comment = comment;
				_transaction.RecipientId = this.UserId;
				message.SetContent(_transaction);
				this.Messages.push(message);
				return message;
			}
			async SendMessage(message) {
				if (message.Id == null) message.Id = Message.GenerateId();
				message.RecipientId = this.UserId;
				message.SenderId = this.CloudXInterface.CurrentUser.Id;
				message.OwnerId = message.SenderId;
				message.SendTime = new Date();
				this.Messages.push(message);
				let friend = this.Manager.Cloud.Friends.GetFriend(message.RecipientId);
				if (friend != null) friend.LatestMessageTime = new Date();
				return await this.Manager.Cloud.SendMessage(message);
			}
			async SendTextMessage(text) {
				return await this.SendMessage(this.CreateTextMessage(text));
			}
			async EnsureHistory() {
				if (this._historyLoaded) return;
				let isFirstRequest = false;
				if (this._historyLoaded) return;
				if (this._historyLoadTask == null) {
					isFirstRequest = true;
					this._historyLoadTask = this.Manager.Cloud.GetMessageHistory(
						this.UserId,
						MessageManager.MAX_READ_HISTORY
					);
				}
				let cloudResult = await this._historyLoadTask;
				if (!isFirstRequest) return;
				if (cloudResult.IsError) {
					this._historyLoadTask = null;
				} else {
					this.Messages = cloudResult.Entity;
					this.Messages.reverse();
					this.UnreadCount = this.Messages.filter(
						(m) => !(m.ReadTime != null)
					).length;
					this._historyLoaded = true;
				}
			}
			AddMessage(message) {
				if (this._messageIds.includes(message.Id)) return false;
				this.Messages.Add(message);
				this._messageIds.Add(message.Id);
				if (message.IsReceived && !(message.ReadTime != null))
					++this.UnreadCount;
				while (
					this.Messages.length > MessageManager.MAX_UNREAD_HISTORY ||
					(this.Messages.length > MessageManager.MAX_UNREAD_HISTORY &&
						(this.Messages[0].IsSent || this.Messages[0].ReadTime != null))
				) {
					this._messageIds.Remove(this.Messages[0].Id);
					this.Messages.RemoveAt(0);
				}
				return true;
			}
			GetMessages(messages) {
				messages.AddRange(this.Messages);
			}
		};
	}
}
module.exports = {
	MessageManager,
};
