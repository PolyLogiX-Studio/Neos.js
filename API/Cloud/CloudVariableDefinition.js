class CloudVariableDefinition {
    constructor() {
        this.DefinitionOwnerId = new String()
        this.Subpath = new String()
        this.TypeHint = new String()
        this.VariableOwnerCanRead = new Boolean()
        this.VariableOwnerCanWrite = new Boolean()
        this.AnyoneCanRead = new Boolean()
        this.AnyoneCanWrite = new Boolean()
    }
    CanRead(variableOwnerId, readerId) {
        return this.AnyoneCanRead || this.VariableOwnerCanRead && variableOwnerId == readerId || readerId == this.DefinitionOwnerId
    }
    CanWrite(variableOwnerId, writerId) {
        return this.AnyoneCanWrite || this.VariableOwnerCanWrite && variableOwnerId == writerId || writerId == this.DefinitionOwnerId
    }
}
module.exports = { CloudVariableDefinition }