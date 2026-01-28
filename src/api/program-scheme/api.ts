import { request } from "~/lib/request";

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];

// Public endpoint - get all program schemes
export const getProgramScheme = async () =>
  await request(`${REACT_APP_API_URL}programScheme`).get<
    Array<TYPES.ProgramSchemeResponse>
  >();

// Admin endpoints
export const adminGetAllProgramSchemes = async () =>
  await request(`${REACT_APP_API_URL}admin/programScheme`).get<
    Array<TYPES.ProgramSchemeResponse>
  >();

export const adminGetProgramScheme = async (id: string) =>
  await request(`${REACT_APP_API_URL}admin/programScheme/${id}`).get<
    TYPES.ProgramSchemeFullResponse
  >();

export const createProgramScheme = async (body: TYPES.ProgramSchemeRequest) =>
  await request(`${REACT_APP_API_URL}admin/programScheme`).post<TYPES.ProgramSchemeDb>({
    body,
  });

export const updateProgramScheme = async (id: string, body: TYPES.ProgramSchemeRequest) =>
  await request(`${REACT_APP_API_URL}admin/programScheme/${id}`).put<TYPES.ProgramSchemeDb>({
    body,
  });
