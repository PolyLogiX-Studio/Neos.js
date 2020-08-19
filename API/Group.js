class Group {
  constructor($b) {
    if (!$b) $b = {};
    this.GroupId = $b.id || new String();
    this.AdminUserId = $b.adminUserId || new String();
    this.Name = $b.name || new String();
    this.QuotaBytes = $b.quotaBytes || new Number();
    this.UsedBytes = $b.usedBytes || new Number();
  }
}
module.exports = {
  Group
}