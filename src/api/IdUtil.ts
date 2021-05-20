import { OwnerType } from "./OwnerType";
import { StringBuilder } from "@bombitmanbomb/utils";
import { v4 as uuidv4 } from "uuid";
export class IdUtil {
	public static MAX_NAME_LENGTH = 20;
	public static GetOwnerType(id: string): OwnerType {
		if (id == null) return OwnerType.INVALID;
		if (id.startsWith("M-")) return OwnerType.Machine;
		if (id.startsWith("U-")) return OwnerType.User;
		return id.startsWith("G-") ? OwnerType.Group : OwnerType.INVALID;
	}
	public static GenerateId(
		ownerType: OwnerType,
		name: string | null = null,
		randomAppend = 0
	): string {
		name =
			name != null
				? name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
				: null;
		const stringBuilder = new StringBuilder();
		if (name != null) {
			for (const c of name) {
				if (
					c.toLowerCase() != c.toUpperCase() ||
					!isNaN((c as unknown) as number)
				)
					stringBuilder.Append(c);
				if (c == " " || c == "_") stringBuilder.Append("-");
				if (stringBuilder.Length == 20) break;
			}
		}
		if (stringBuilder.Length == 0 || randomAppend > 0) {
			if (stringBuilder.Length > 0) stringBuilder.Append("-");
			let str = uuidv4();
			if (randomAppend > 0) str = str.substr(0, randomAppend);
			stringBuilder.Append(str);
		}
		switch (ownerType) {
		case OwnerType.Machine:
			stringBuilder.Insert(0, "M-");
			break;
		case OwnerType.User:
			stringBuilder.Insert(0, "U-");
			break;
		case OwnerType.Group:
			stringBuilder.Insert(0, "G-");
			break;
		default:
			throw new Error("Invalid owner type");
		}
		return stringBuilder.toString();
	}
}
