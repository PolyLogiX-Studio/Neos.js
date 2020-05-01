class Submission {
  constructor($b) {
    if (!$b) $b = {};
    this.Id = $b.id;
    this.GroupId = $b.ownerId;
    this.TargetRecordId = $b.targetRecordId;
    this.SubmissionTime = $b.submissionTime;
    this.SubmittedById = $b.submittedById;
    this.Featured = $b.featuredByUserId;
    this.FeaturedByUserId = $b.featuredByUserId;
    this.FeaturedTimestamp = $b.featuredTimestamp;
  }
}
module.exports = {
  Submission
}