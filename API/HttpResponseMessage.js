/**
 *
 * @class HttpResponseMessage
 */
class HttpResponseMessage {
  constructor() {
    this.Headers = {};
    this.Content = {};
    this.Method = new String();
    this.RequestUri = new String();
  }
}
module.exports = {
  HttpResponseMessage,
};
