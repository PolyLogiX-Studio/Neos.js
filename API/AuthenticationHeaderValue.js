class AuthenticationHeaderValue {
  constructor(bearer, token) {
    this.Authorization = bearer + ' ' + token;
  }
}
module.exports = {
  AuthenticationHeaderValue,
};
