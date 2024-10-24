import CryptoJS from 'crypto-js';

export class Encrypt {
  private static secretKey = 'bdb1234';

  public static encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, Encrypt.secretKey).toString();
  }

  public static decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, Encrypt.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
