import CRYPTO from "crypto";
export class CryptoHelper {
	public static readonly crypto = CRYPTO;
	public static GenerateCryptoBlob(length: number): Buffer {
		return this.crypto.randomBytes(length);
	}
	public static CryptoTokenStringLength(length: number): number {
		return ((4 * length) / 3 + 3) & -4;
	}
	public static GenerateCryptoToken(length = 128): string {
		return CryptoHelper.GenerateCryptoBlob(length)
			.toString("base64")
			.replace("/", "_");
	}
	public static GenerateSalt(): string {
		return CryptoHelper.GenerateCryptoBlob(128).toString("base64");
	}
	public static GenerateClientSecret(): string {
		return CryptoHelper.GenerateCryptoBlob(128).toString("base64");
	}
	public static HashId(id: string): string {
		return this.crypto
			.createHash("sha256")
			.update(toUTF8(id), "utf8")
			.digest("base64")
			.replace("-", "");
	}
	public static HashPassword(password: string, salt: string): string {
		const bytes = Buffer.from(password, "utf-8");
		const numArray = Buffer.from(salt, "base64");
		const buffer = Buffer.alloc(bytes.length + numArray.length);
		for (let index = 0; index < bytes.length; index++)
			buffer[index] = bytes[index];
		for (let index = 0; index < numArray.length; index++)
			buffer[index + bytes.length] = numArray[index];
		return this.crypto.createHash("sha256").update(buffer).digest("base64");
	}
	public static get PasswordRuleDescription(): string {
		return "Minimum 8 characters, 1 capital letter and 1 digit.";
	}
	public static IsValidPassword(password: string): boolean {
		return (
			password != null &&
			password.length >= 8 &&
			password.match(/[0-9]/) != null &&
			password.toLowerCase() != password.toUpperCase() &&
			password != password.toLowerCase()
		);
	}

	public static get PasswordRequirements(): string {
		return "Must have at least 8 symbols, 1 digit and 1 uppercase letter";
	}
}

function toUTF8(str: string): string {
	const utf8 = [];
	for (let i = 0; i < str.length; i++) {
		let charcode = str.charCodeAt(i);
		if (charcode < 0x80) utf8.push(charcode);
		else if (charcode < 0x800) {
			utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
		} else if (charcode < 0xd800 || charcode >= 0xe000) {
			utf8.push(
				0xe0 | (charcode >> 12),
				0x80 | ((charcode >> 6) & 0x3f),
				0x80 | (charcode & 0x3f)
			);
		}
		// surrogate pair
		else {
			i++;
			// UTF-16 encodes 0x10000-0x10FFFF by
			// subtracting 0x10000 and splitting the
			// 20 bits of 0x0-0xFFFFF into two halves
			charcode =
				0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
			utf8.push(
				0xf0 | (charcode >> 18),
				0x80 | ((charcode >> 12) & 0x3f),
				0x80 | ((charcode >> 6) & 0x3f),
				0x80 | (charcode & 0x3f)
			);
		}
	}

	return utf8.join();
}
