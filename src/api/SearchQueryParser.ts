import { List, StringBuilder } from "@bombitmanbomb/utils";
//TODO Impliment BaseX
export class SearchQueryParser {
	static Parse(
		search = "",
		optionalTags: List<string>,
		requiredTags: List<string>,
		excludedTags: List<string>
	): void {
		search = search.trim();
		if (search === "") return;
		let flag = false;
		const stringBuilder = new StringBuilder();
		for (let index = 0; index < search.length; index++) {
			const num = index === search.length ? 1 : 0;
			const c = num !== 0 ? " " : search[index];
			if (num !== 0 || (c == " " && !flag) || +(c === "\"") & +flag) {
				if (stringBuilder.Length > 0) {
					if (stringBuilder.String[0] === "+") {
						stringBuilder.Remove(0, 1);
						if (stringBuilder.Length > 0)
							requiredTags.Add(stringBuilder.toString());
					} else if (stringBuilder.String[0] === "-") {
						stringBuilder.Remove(0, 1);
						if (stringBuilder.Length > 0)
							excludedTags.Add(stringBuilder.toString());
					} else optionalTags.Add(stringBuilder.toString());
				}
				stringBuilder.Clear();
				flag = false;
			} else if (c === "\"") flag = true;
			else stringBuilder.Append(c);
		}
	}
}
