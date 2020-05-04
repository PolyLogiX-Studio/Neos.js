class Type {
  static Get(obj) {
    return obj.constructor.name;
  }

}
module.exports = {
  Type
}