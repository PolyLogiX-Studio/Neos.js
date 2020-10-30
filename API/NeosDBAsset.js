class NeosDBAsset {
  /**
   *Creates an instance of NeosDBAsset.
   * @param {{
   * hash: string,
   * bytes: number
   * }} $b
   * @memberof NeosDBAsset
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Hash = $b.hash;
    this.Bytes = $b.bytes;
  }
}
module.exports = {
  NeosDBAsset,
};
