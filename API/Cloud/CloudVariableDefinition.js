class CloudVariableDefinition {
    constructor(){
        this.DefinitionOwnerId
        this.Subpath
        this.TypeHint
        this.VariableOwnerCanRead
        this.AnyoneCanRead
        this.AnyoneCanWrite
    }
    CanRead(variableOwnerId,readerId){
        return this.AnyoneCanRead||this.VariableOwnerCanRead&&variableOwnerId==readerId||readerId== this.DefinitionOwnerId
    }
    CanWrite(variableOwnerId,writerId){
        return this.AnyoneCanWrite||this.VariableOwnerCanWrite&&variableOwnerId==writerId||writerId== this.DefinitionOwnerId
    }
}
module.exports = {CloudVariableDefinition}