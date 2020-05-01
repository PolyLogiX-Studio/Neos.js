class Membership {
  constructor($b) {
    if (!$b) $b = {};
    this.UserId = $b.ownerId || new String();
    this.GroupId = $b.id || new String();
    this.GroupName = $b.groupName || new String();
  }
}
module.exports = {Membership}