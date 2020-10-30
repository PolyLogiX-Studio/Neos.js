/**
 *
 * @template T
 * @class CloudResult
 */
class CloudResult {
  /**
   *Creates an instance of CloudResult.
   * @param {*} entity
   * @param {*} state
   * @param {*} content
   * @memberof CloudResult
   */
  constructor(entity = undefined, state, content, resHeaders) {
    this.CloudResult(state, content, resHeaders, entity);
  }
  ToString() {
    return 'CloudResult - State: ' + this.State + ' Content: ' + this.Content;
  }
  /**
   * @param {HttpStatusCode} state
   * @param {string} content
   * @returns undefined
   * @memberof CloudResult
   */
  CloudResult(state, content, headers) {
    this.State = state;
    this.Content = content;

    if (headers != null) {
      this.Headers = {};
      for (let item of headers) this.Headers[item[0]] = item[1];
    }
    if (!this.IsError) return;
    if (content == null) return;
    try {
      this.Content = JSON.parse(content).Message;
    } catch (error) {
      this.Content = content;
    }
  }
  /**
   * Cet the Result Content Entity
   * @readonly
   * @memberof CloudResult
   */
  get Entity() {
    return this.Content;
  }
  /**
   * Is Valid?
   *
   * @readonly
   * @memberof CloudResult
   */
  get IsOK() {
    if (this.State != 200) return this.State == 204;
    return true;
  }
  /**
   * Is Invalid?
   *
   * @readonly
   * @memberof CloudResult
   */
  get IsError() {
    return !this.IsOK;
  }
  IsSuccessStatusCode() {
    return this.IsOK();
  }
}
module.exports = {
  CloudResult,
};
