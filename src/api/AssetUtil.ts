import fs from "fs"
import CRYPTO from "crypto"
export class AssetUtil {
  public static get COMPUTE_VERSION(){
    return 5
  }
  /** Generate a hash signature for a given file.
   * Will read the file and create a sha256 hash.
   * @param {string} file File Location
   */
   public static GenerateHashSignature(file: string) : string;
  /** Generate a hash signature for a given file stream.
   *  
   * @param {Buffer} file File Data
   */
  public static GenerateHashSignature(fileStream: Buffer) : string;
  public static GenerateHashSignature(file: string|Buffer): string {
    if (file instanceof Buffer){
      return CRYPTO.createHash("sha256").update(file).digest("hex").replace("-","").toLocaleLowerCase()
    } else if (typeof file === "string"){
      return this.GenerateHashSignature(fs.readFileSync(file))
    } else {
      throw Error("Invalid Input Type, Expected Buffer or string.")
    }
  }
}
