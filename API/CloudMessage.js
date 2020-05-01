/**
 *
 *
 * @class CloudMessage
 */
class CloudMessage {
  /**
   *Creates an instance of CloudMessage.
   * @memberof CloudMessage
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Message = $b.Message || new String();
  }
  static ExtractMessage(content) {
    try {
      return content.Message || content;
    } catch (err) {
      return content;
    }
  }
}
module.exports = {CloudMessage}