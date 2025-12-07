import { request } from "~/lib/request";
import { AuthUserResponse } from "~/providers/auth";
import Cookies from "universal-cookie";

export type AuthInput = {
  username: string;
  password: string;
};

export type RegisterType = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  userRole: "ADMIN" | "STUDENT" | "TEACHER";
  year?: string;
  strengths?: string;
  motivation?: string;
  keywords?: string;
  userFeedback?: string;
  name: string;
  surname: string;
  workingPlace?: string;
  workingPosition?: string;
  experience?: string;
  mentoringCourseName?: string;
  courseDescription?: string;
  expectations?: string;
  hobbies?: string;
  roles: string[];
  programRoles: string[];
  confirmed: boolean;
};

const cookies = new Cookies();

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];
export const auth = async (body: AuthInput) =>
  await request(`${REACT_APP_API_URL}auth/login`).post<AuthUserResponse>({
    body,
  });

export const reissueToken = async () =>
  await request(`${REACT_APP_API_URL}refresh`).post<AuthUserResponse>({
    body: { refreshToken: cookies.get("refreshToken") },
  });

export const register = async (body: RegisterType) =>
  await request(`${REACT_APP_API_URL}auth/register`).post<AuthUserResponse>({
    body,
  });
