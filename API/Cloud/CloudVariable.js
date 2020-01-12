class CloudVariable {
    constructor(){
        this.VariableOwnerId = new String()
        this.Path = new String()
        this.Value = new String()
    }
    static GetDefinitionPath(path,ownerId,subpath){
        let length = path.indexOf('.')
        ownerId.value = path.substring(0,length)
        subpath.value = path.substring(length + 1)
    }
    GetDefinitionPath(ownerId,subpath){
        CloudVariable.GetDefinitionPath(this.Path,ownerId,subpath)
    }
}
module.exports = {CloudVariable}