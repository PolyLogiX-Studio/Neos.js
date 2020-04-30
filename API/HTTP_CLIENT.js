const {
  CloudResult
} = require("./CloudResult")
/**
 *
 *
 * @class HTTP_CLIENT
 */
class HTTP_CLIENT {
  constructor() {}
  /**
   *
   * @param {HttpRequestMessage} request
   * @param {TimeSpan} token
   * @returns {Promise<HttpResponseMessage>}
   * @memberof HTTP_CLIENT
   */
  async SendAsync(request) {
    let state;
    let resHeaders;
    let dat = {
      method: request.Method
    };
    dat.headers = request.Headers;
    if (
      request.Method == "POST" ||
      request.Method == "PATCH" ||
      request.Method == "PUT"
    )
      dat.body = request.Content;
    let response = await fetch(request.RequestUri, dat)
      .then(res => {
        state = res.status;
        resHeaders = res.headers;
        return res.text().then(body => {
          try {
            return JSON.parse(body);
          } catch (error) {
            return body;
          }
        });
      })
      .catch(err => console.error(err));
    let cloudResult = new CloudResult("", state, response, resHeaders);
    cloudResult.CloudResult(state, response, resHeaders);
    return cloudResult;
  }
}
module.exports = {
  HTTP_CLIENT
}