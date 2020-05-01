class CloudVariableDefinition {
  constructor($b) {
    if (!$b) $b = {};
    this.DefinitionOwnerId = $b.definitionOwnerId;
    this.Subpath = $b.subpath;
    this.TypeHint = $b.typeHint;
    this.DefaultValue = $b.defaultvalue;
    this.VariableOwnerCanRead = $b.variableOwnerCanRead;
    this.VariableOwnerCanWrite = $b.variableOwnerCanWrite;
    this.AnyoneCanRead = $b.anyoneCanRead;
    this.AnyoneCanWrite = $b.anyoneCanWrite;
  }
  CanRead(variableOwnerId, readerId) {
    return (
      this.AnyoneCanRead ||
      (this.VariableOwnerCanRead && variableOwnerId == readerId) ||
      readerId == this.DefinitionOwnerId
    );
  }
  CanWrite(variableOwnerId, writerId) {
    return (
      this.AnyoneCanWrite ||
      (this.VariableOwnerCanWrite && variableOwnerId == writerId) ||
      writerId == this.DefinitionOwnerId
    );
  }
}
module.exports = {CloudVariableDefinition}