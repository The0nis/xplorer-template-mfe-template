import { deCrypter, encrypter } from "./encrypt";

// Define types for the user, otpStatus, account, etc. as per your application needs.
type User = { [key: string]: any }; // Replace with your User type
type OtpStatus = { [key: string]: any }; // Replace with your OtpStatus type

// User
export const addUserToLocalStorage = (user: User): void => {
  const encryptedUser = encrypter(user);
  localStorage.setItem("user", encryptedUser);
};

export const getUserFromLocalStorage = (): User | null => {
  const result = localStorage.getItem("user");
  const decryptedUser = result ? deCrypter(result) : null;
  return decryptedUser;
};

export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem("user");
};

// Otp Status
export const addTokenStatusToLocalStorage = (otpStatus: OtpStatus): void => {
  const encryptedUser = encrypter(otpStatus);
  localStorage.setItem("otpStatus", encryptedUser);
};

export const getTokenStatusFromLocalStorage = (): OtpStatus | null => {
  const result = localStorage.getItem("otpStatus");
  const decryptedUser = result ? deCrypter(result) : null;
  return decryptedUser;
};

export const removeTokenStaFromLocalStorage = (): void => {
  localStorage.removeItem("otpStatus");
};



