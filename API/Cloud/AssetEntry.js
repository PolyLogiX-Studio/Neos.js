class AssetEntry {
    constructor(){
        this.id
        this.OwnerId
        this.Entry
        this.ComputeLock
    }
    get AssetHash(){
        if (this.OwnerId==null|| !this.OwnerId.startsWith("A-")){
            console.error("OwnerId is invalid, cannot extract asset hash from it");
        }
        return this.OwnerId.substring("A-".length);
    }
    set AssetHash(value) {
        this.OwnerId = "A-" + value
    }
}
module.exports = {AssetEntry}