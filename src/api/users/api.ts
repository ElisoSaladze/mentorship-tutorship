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

export const getUser = async () =>
  await request(`${REACT_APP_API_URL}users/me`).get<TYPES.UserResponse>();

export const updateUser = async (body: TYPES.UpdateUserRequest) =>
  await request(`${REACT_APP_API_URL}users/me`).put<TYPES.UserResponse>({
    body,
  });

// Admin API functions
export const adminGetAllUsers = async () =>
  await request(`${REACT_APP_API_URL}admin/users`).get<Array<TYPES.UserFullResponse>>();

export const adminCreateUser = async (body: TYPES.UserRequest) =>
  await request(`${REACT_APP_API_URL}admin/users`).post<TYPES.UserFullResponse>({
    body,
  });

export const adminUpdateUser = async (id: string, body: TYPES.UserRequest) =>
  await request(`${REACT_APP_API_URL}admin/users/${id}`).put<TYPES.UserFullResponse>({
    body,
  });

export const adminDeleteUser = async (id: string) =>
  await request(`${REACT_APP_API_URL}admin/users/${id}`).delete<string>();

export const adminConfirmUser = async (id: string) =>
  await request(`${REACT_APP_API_URL}admin/users/${id}/confirm`).patch<object>();

export const getMentors = async () =>
  await request(`${REACT_APP_API_URL}users/mentors`).get<Array<TYPES.UserResponse>>();
