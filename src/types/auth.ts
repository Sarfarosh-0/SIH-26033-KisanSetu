// Required TypeScript Types for AgriMarket Auth Flow

export type UserRole = "farmer" | "buyer";

export type AuthStep = "phone" | "otp";

export interface LoginState {
  role: UserRole;
  step: AuthStep;
  phone: string;
  otp: string;
}

export interface AuthSuccessPayload {
  role: UserRole;
  phone: string;
  method: "otp" | "google";
  userProfile?: {
    name: string;
    state?: string;
    district?: string;
  };
}
