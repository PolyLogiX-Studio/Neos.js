/**
 *
 *
 * @class SessionUpdate
 */
class SessionUpdate {
  /**
   *Creates an instance of SessionUpdate.
   * @param {{
   * hostedSessions:List<SessionInfo>,
   * removedSessions:List<String>}} $b
   * @memberof SessionUpdate
   */
  constructor($b) {
    this.HostedSessions = $b.hostedSessions;
    this.RemovedSessions = $b.removedSessions;
  }
}
module.exports = {
  SessionUpdate
}