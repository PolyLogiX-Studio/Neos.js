class CloudVariable {
    constructor(){
        this.ownerId
        this.path
        this.value
    }
    get VariableOwnerId(){return this.ownerId}
    set VariableOwnerId(value){this.ownerId = value}
    get Path(){return this.path}
    set Path(value) {this.path = value}
    get Value(){return this.value}
    set Value(value){this.value = value}
    //GetDefinitionPath(){}
    static GetDefinitionPath(path,ownerId,subpath){
        let length = path.indexOf('.')
        ownerId.value = path.substring(0,length)
        subpath.value = path.substring(length + 1)
    }
}
module.exports = {CloudVariable}