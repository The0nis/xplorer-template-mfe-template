import CryptoJS from "crypto-js";

export const key: string | undefined = import.meta.env.VITE_SECRETKEY;
export const IV: string | undefined = import.meta.env.VITE_ENCRYPTION_IV;

if (!key || !IV) {
  throw new Error("Encryption key and IV must be provided in environment variables. Activities");
}

export const secretKey = CryptoJS.enc.Utf8.parse(key);
export const intiVector = CryptoJS.enc.Utf8.parse(IV);
export const options = {
  keySize: 128 / 8,
  iv: intiVector,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
}; 

export const encrypter = (data: any): string => {
  const preEncrypteds = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, {
    iv: intiVector,
    mode: CryptoJS.mode.CBC,
    keySize: 128 / 8,
  });
  const result = preEncrypteds.toString(CryptoJS.format.Hex);
  return result;
};

export const deCrypter = (response: string): any => {
  const dataHex = CryptoJS.enc.Hex.parse(response);
  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext: dataHex } as any,
    secretKey,
    options
  );

  const decString = decrypted.toString(CryptoJS.enc.Utf8);

  let result: any = decString;
  try {
    if (decString.includes("{")) {
      result = JSON.parse(decString);
    }
  } catch (error) {
    console.error("Error parsing decrypted data as JSON:", error);
  }

  return result;
};
