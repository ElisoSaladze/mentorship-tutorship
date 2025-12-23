import { request } from "~/lib/request";
const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];

export const addUsersToProgramScheme = async (
  id: string,
  role: TYPES.ProgramRole
) =>
  await request(`${REACT_APP_API_URL}programScheme/${id}/addUser`).put<
    Array<TYPES.ProgramSchemeResponse>
  >({
    body: { role },
  });

export const getProgramSchemeUsers = async (id: string) =>
  await request(`${REACT_APP_API_URL}programScheme/${id}/users`).get();

export const getAllUsers = async () =>
  await request(`${REACT_APP_API_URL}admin/users`).get<Array<TYPES.UserFullResponse>>();

export const getUser = async () =>
  await request(`${REACT_APP_API_URL}users/me`).get<TYPES.UserResponse>();

export const updateUser = async (body: TYPES.UpdateUserRequest) =>
  await request(`${REACT_APP_API_URL}users/me`).put<TYPES.UserResponse>({
    body,
  });
