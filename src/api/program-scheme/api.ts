import { request } from "~/lib/request";

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];

export const getProgramScheme = async () =>
  await request(`${REACT_APP_API_URL}programScheme`).get<
    Array<TYPES.ProgramSchemeResponse>
  >();

export const createProgramScheme = async (body: TYPES.ProgramSchemeRequest) =>
  await request(`${REACT_APP_API_URL}programScheme`).post<TYPES.ProgramSchemeDb>({
    body,
  });

export const updateProgramScheme = async (id: string, body: TYPES.ProgramSchemeRequest) =>
  await request(`${REACT_APP_API_URL}programScheme/${id}`).put<TYPES.ProgramSchemeDb>({
    body,
  });
