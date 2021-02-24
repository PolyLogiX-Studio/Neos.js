/**
 * @class GitHubClient
 * @see {@link https://octokit.github.io/rest.js/v18/ Octokit}
 */
var GitHubClient = null;
try {
	GitHubClient = new (require("@octokit/rest").Octokit)();
} catch (error) {
	GitHubClient = {
		error: () =>
			new Error("This function requires Peer Dependency \"@octokit/rest\""),
		issues: {
			get: () => {
				return GitHubClient.error();
			},
		},
	};
}
module.exports = { GitHubClient };
