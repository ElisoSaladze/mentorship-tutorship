import { request } from "~/lib/request";
const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];

export const addUsersToProgramScheme = async (
  id: string,
  role: "TUTOR" | "MENTOR" | "SEEKER"
) =>
  await request(`${REACT_APP_API_URL}programScheme/${id}/addUser`).put({
    body: { role },
  });

export const getProgramSchemeUsers = async (id: string) =>
  await request(`${REACT_APP_API_URL}programScheme/${id}/users`).get({});
