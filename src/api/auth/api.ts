import { request } from "~/lib/request";
import { AuthUserResponse } from "~/providers/auth";
import Cookies from "universal-cookie";

export type AuthInput = {
  username: string;
  password: string;
};

export type RegisterType = {
  username: string;
  password: string;
  repeatPassword: string;
  roles: string[];
  programRoles: string[];
  confirmed: boolean;
};

const cookies = new Cookies();

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];
export const auth = async (body: AuthInput) =>
  await request(`${REACT_APP_API_URL}login`).post<AuthUserResponse>({
    body,
  });

export const reissueToken = async () =>
  await request(`${REACT_APP_API_URL}refresh`).post<AuthUserResponse>({
    body: { refreshToken: cookies.get("refreshToken") },
  });

export const register = async (body: RegisterType) =>
  await request(`${REACT_APP_API_URL}users`).post<AuthUserResponse>({
    body,
  });
