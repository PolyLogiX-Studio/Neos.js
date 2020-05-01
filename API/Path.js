class Path {
  static GetExtension(str) {
    return str.match(/\.[a-zA-Z0-9]+$/)[0];
  }
  static GetFileNameWithoutExtension(str) {
    return str.replace(/\.[^/.]+$/, "");
  }
}
module.exports = {
  Path
}