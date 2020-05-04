const {
  v4: uuidv4
} = require("uuid");
class Message {
  constructor($b) {
    if (!$b) $b = {};
    this.Id = $b.id;
    this.OwnerId = $b.ownerId;
    this.RecipientId = $b.recipientId;
    this.SenderId = $b.senderId;
    this.MessageType = $b.messageType;
    this.Content = $b.content;
    this.SendTime = $b.sendTime;
    this.LastUpdateTime = $b.lastUpdateTime;
    this.ReadTime = $b.readTime;
  }
  static GenerateId() {
    return "MSG-" + uuidv4();
  }
  ExtractContent() {
    return JSON.parse(this.Content);
  }
  SetContent(obj) {
    this.Content = JSON.stringify(obj);
  }
  get IsSent() {
    return this.SenderId == this.OwnerId;
  }
  get IsReceived() {
    return this.RecipientId == this.OwnerId;
  }
  get IsRead() {
    return this.ReadTime !== undefined;
  }
}
module.exports = {
  Message
}