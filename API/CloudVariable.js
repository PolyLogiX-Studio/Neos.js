class CloudVariable {
  constructor($b) {
    if (!$b) $b = {};
    this.VariableOwnerId = $b.ownerId;
    this.Path = $b.path;
    this.Value = $b.value;
  }
  static GetDefinitionPath(path, ownerId, subpath) {
    let length = path.indexOf(".");
    ownerId.Out = path.substring(0, length);
    subpath.Out = path.substring(length + 1);
  }
  GetDefinitionPath(ownerId, subpath) {
    CloudVariable.GetDefinitionPath(this.Path, ownerId, subpath);
  }
}
module.exports = {CloudVariable}