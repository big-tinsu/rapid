import { AES, enc } from "crypto-js";

export const encrypt = (data: string) => {
  const encrypts = AES.encrypt(data, process.env.NEXT_PUBLIC_ENCRYPTION_KEY!).toString();
  return encrypts;
};

export const decrypt = (data: string) => {
  const decrypts = AES.decrypt(data, process.env.NEXT_PUBLIC_ENCRYPTION_KEY!).toString(enc.Utf8);
  return decrypts;
};

export const encryptData = (data: any) => {
  return encrypt(JSON.stringify(data));
};

export const decryptData = (data: any) => {
  return decrypt(JSON.parse(data));
};
