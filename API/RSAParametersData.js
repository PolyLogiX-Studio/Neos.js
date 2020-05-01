class RSAParametersData {
  /**
   *Creates an instance of RSAParametersData.
   * @param {{
   * Exponent:Number[],
   * Modulus:Number[],
   * P:Number[],
   * Q:Number[],
   * DP:Number[],
   * DQ:Number[],
   * InverseQ:Number[],
   * D:Number[]
   * }} $b
   * @memberof RSAParametersData
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Exponent = $b.Exponent;
    this.Modulus = $b.Modulus;
    this.P = $b.P;
    this.Q = $b.Q;
    this.DP = $b.DP;
    this.DQ = $b.DQ;
    this.InverseQ = $b.InverseQ;
    this.D = $b.D;
  }
  /**
   *
   * @static
   * @param {RSAParametersData} rsa
   * @memberof RSAParametersData
   */
  static RSAParametersData(rsa) {
    let rsaParametersData = new RSAParametersData(rsa);
    rsaParametersData.D = rsaParametersData.D;
    return rsaParametersData;
  }
  /**
   *
   * @static
   * @param {RSAParametersData} data
   * @memberof RSAParametersData
   */
  static RSAParameters(data) {
    return new RSAParametersData(data);
  }
}
module.exports = {
  RSAParametersData
}