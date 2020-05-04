class RecordPreprocessStatus {
  /**
   *Creates an instance of RecordPreprocessStatus.
   * @param {{
   * id: string,
   * ownerId: string,
   * recordId: string,
   * state: RecordPreprocessStatus,
   * progress: number,
   * failReason: string
   * resultDiffs: List
   * }} $b
   * @memberof RecordPreprocessStatus
   */
  constructor($b) {
    if (!$b) $b = {};
    this.PreprocessId = $b.id;
    this.OwnerId = $b.ownerId;
    this.RecordId = $b.recordId;
    this.State = $b.state;
    this.Progress = $b.progress;
    this.FailReason = $b.failReason;
    this.ResultDiffs = $b.resultDiffs;
  }
}
module.exports = {
  RecordPreprocessStatus
}