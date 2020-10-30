class ServerStatistics {
  /**
   *Creates an instance of ServerStatistics.
   * @param {{
   * lastUpdate: Date,
   * responseTimeMilliseconds:Number
   * }} $b
   * @memberof ServerStatistics
   */
  constructor($b) {
    if (!$b) $b = {};
    this.LastUpdate = $b.lastUpdate;
    this.ResponseTimeMilliseconds = $b.responseTimeMilliseconds;
  }
}
module.exports = {
  ServerStatistics,
};
