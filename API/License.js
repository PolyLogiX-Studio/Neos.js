class License {
  /**
   *Creates an instance of License.
   * @param {{
   * licenseGroup: string,
   * licenseKey: string,
   * PairedMachineUUID: string
   * }} $b
   * @memberof License
   */
  constructor($b) {
    if (!$b) $b = {};
    this.LicenseGroup = $b.licenseGroup;
    this.LicenseKey = $b.licenseKey;
    this.PairedMachineUUID = $b.PairedMachineUUID;
  }
}
module.exports = {
  License,
};
