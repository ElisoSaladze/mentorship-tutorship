import { request } from "~/lib/request";

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];

export const getProgramScheme = async () =>
  await request(`${REACT_APP_API_URL}programScheme`).get<
    Array<TYPES.programScheme>
  >({ withoutAuth: false });

export const createProgramScheme = async (body: TYPES.programScheme) =>
  await request(`${REACT_APP_API_URL}programScheme`).post({
    body,
    withoutAuth: false,
  });

export const getProgramSchemeById = async (id: string) =>
  await request(
    `${REACT_APP_API_URL}programScheme/${id}`
  ).get<TYPES.programScheme>({ withoutAuth: false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProgramScheme = async (id: string, body: any) =>
  await request(`${REACT_APP_API_URL}programScheme/${id}`).put({
    body,
    withoutAuth: false,
  });
