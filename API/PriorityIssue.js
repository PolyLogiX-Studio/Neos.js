class PriorityIssue {
	constructor($b) {
		if (!$b) $b = {};
		this.TASK_KEY = "update-priority-issues";
		this.PRIORITY_ISSUES_ID = "PriorityIssues";
		this.Title = $b.Title;
		this.IssueNumber = $b.issueNumber;
		this.IssueURL = $b.issueURL;
		this.VoteCount = $b.voteCount;
		this.ActivePledgeScore = $b.activePledgeScore;
		this.LifetimePledgeScore = $b.lifetimePledgeScore
	}
}
module.exports = {
	PriorityIssue,
};
