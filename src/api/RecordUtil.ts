import { Uri, Out, StringBuilder } from "@bombitmanbomb/utils";
import { v4 as uuidv4 } from "uuid";
export class RecordUtil {
	public static GenerateUri(ownerId: string, recordId: string): Uri {
		return new Uri(`neosrec:///${ownerId}/${recordId}`);
	}
	public static IsValidRecordID(recordId: string): boolean {
		return (
			!(recordId == null || recordId.trim() == "") &&
			recordId.startsWith("R-") &&
			recordId.length > "R-".length
		);
	}
	public static ExtractRecordID(
		recordUri: Uri,
		ownerId: Out<string>,
		recordId: Out<string>
	): boolean {
		if (
			!(recordUri instanceof Uri) ||
			recordUri.Scheme != "neosrec" ||
			recordUri.Segments.length != 3
		)
			return false;
		ownerId.Out = recordUri.Segments[1];
		if (ownerId.Out == null || ownerId.Out.trim() == "") return false;
		ownerId.Out = ownerId.Out.substr(0, ownerId.Out.length - 1);
		recordId.Out = recordUri.Segments[2];
		return (
			!(recordId.Out == null || recordId.Out.trim() == "") &&
			RecordUtil.IsValidRecordID(recordId.Out)
		);
	}
	public static ExtractRecordPath(
		recordUri: Uri,
		ownerId: Out<string>,
		recordPath: Out<string>
	): boolean {
		if (
			!(recordUri instanceof Uri) ||
			recordUri.Scheme != "neosrec" ||
			recordUri.Segments.length < 3
		)
			return false;
		ownerId.Out = recordUri.Segments[1];
		if (ownerId.Out == null || ownerId.Out.trim() == "") return false;
		ownerId.Out = ownerId.Out.substr(0, ownerId.Out.length - 1);
		const stringBuilder = new StringBuilder();
		for (let index = 2; index < recordUri.Segments.length; index++)
			stringBuilder.Append(recordUri.Segments[index]);
		recordPath.Out = stringBuilder.toString();
		return true;
	}
	public static GenerateRecordID(): string {
		return `R-${uuidv4()}`;
	}
}
