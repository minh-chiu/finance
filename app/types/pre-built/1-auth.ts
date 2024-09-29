import type { AccountTypeEnum, SendOtpToEnum } from "~/utils/enums/enums";
import type { VerifyOtp } from "./10-otp";
import type { User } from "./2-user";
import type { AuthTokens } from "./9-token";

export type Register = {
  fullName: string;
  email?: string;
  phone?: string;
  password: string;
  accountType: AccountTypeEnum;
};

export type Login = {
  authKey: string; // username / email / phone
  password: string;
};

export type SocialLogin = {
  idToken: string; // Google / Facebook from firebase
  accountType: AccountTypeEnum;
};

export type AuthUser = AuthTokens & { user: User };

export type SendTokenToRegister = Register & {
  expiresAt: number;
};

export type SendOtpToRegister = {
  sendOtpTo: SendOtpToEnum;
  expiresAt: number;
};

export type ForgotPasswordResponse = {
  email: string;
  expiresAt: number;
};

export type ResetPasswordWithToken = {
  email: string;
  expiresAt: number;
  isLogoutOthers?: boolean;
};

export type ResetPasswordWithOtp = VerifyOtp & {
  password: string;
  isLogoutOthers?: boolean;
};
