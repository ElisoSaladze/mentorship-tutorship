import { request } from "~/lib/request";
import { AuthUserResponse } from "~/providers/auth";
import Cookies from "universal-cookie";

export type AuthInput = {
  username: string;
  password: string;
};

const cookies = new Cookies();

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];
export const auth = async (body: AuthInput) =>
  await request(`${REACT_APP_API_URL}auth/login`).post<AuthUserResponse>({
    body,
  });

export const reissueToken = async () =>
  await request(`${REACT_APP_API_URL}auth/refresh`).post<AuthUserResponse>({
    body: { refreshToken: cookies.get("refreshToken") },
  });

export const register = async (data: TYPES.RegisterRequest, files: File[]) => {
  const query = new URLSearchParams();
  // Add file names to query param
  query.append("files", files.map(f => f.name).join(",") || "");

  return await request(`${REACT_APP_API_URL}auth/register`).post<AuthUserResponse>({
    body: {
      data,
      ...files.reduce((acc, file, index) => ({ ...acc, [`file${index}`]: file }), {}),
    },
    query,
    type: "file",
  });
};
