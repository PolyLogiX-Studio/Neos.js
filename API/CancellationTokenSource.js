const {
  v4: uuidv4
} = require("uuid");
class CancellationTokenSource {
  constructor(timeout) {
    this.Token = uuidv4();
  }
}
module.exports = {CancellationTokenSource}