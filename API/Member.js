class Member {
  constructor($b) {
    if (!$b) $b = {};
    this.UserId = $b.id ?? new String();
    this.GroupId = $b.ownerId ?? new String();
    this.QuotaBytes = $b.quotaBytes ?? new Number();
    this.UsedBytes = $b.usedBytes ?? new Number();
  }
}
module.exports = {
  Member
}