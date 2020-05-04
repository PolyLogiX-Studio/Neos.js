const {
  CryptoHelper
} = require("./CryptoHelper")
class LoginCredentials {
  /**
   *Creates an instance of LoginCredentials.
   * @param {{
   * ownerId: string,
   * username: string,
   * email: string,
   * password: string,
   * recoverCode: string,
   * sessionCode: string
   * secretMachineId: string,
   * rememberMe: Boolean
   * }} $b
   * @memberof LoginCredentials
   */
  constructor($b) {
    if (!$b) $b = {};
    this.OwnerId = $b.ownerId;
    this.Username = $b.username;
    this.Email = $b.email;
    this.Password = $b.password;
    this.RecoverCode = $b.recoverCode;
    this.SessionToken = $b.sessionCode;
    this.SecretMachineId = $b.secretMachineId;
    this.RememberMe = $b.rememberMe;
  }
  Preprocess() {
    if (this.Username) this.Username = this.Username.trim();
    if (this.Email) this.Email = this.Email.trim();
  }
  /**
   *
   * @readonly
   * @memberof LoginCredentials
   * @returns {Boolean}
   */
  get IsPasswordValid() {
    return CryptoHelper.IsValidPassword(this.Password);
  }
}
module.exports = {
  LoginCredentials
}