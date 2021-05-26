export class TemporaryUtility {
	public static FilterViveportUsername(username: string): string {
		const num = username.indexOf("(movieguest");
		if (num < 0) return username;
		const str = username.substr(num + "(movieguest".length);
		return !isNaN(parseInt(str.substr(0, str.length - 1)))
			? "movieguest" + str.substr(0, str.length - 1).padStart(3, "0")
			: username;
	}
}
