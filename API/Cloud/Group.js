class Group {
    constructor(){
        this.GroupId = new String()
        this.AdminUserId = new String()
        this.Name = new String()
        this.QuotaBytes = new BigInt()
        this.UsedBytes = new BigInt()
    }
}
module.exports = {Group}