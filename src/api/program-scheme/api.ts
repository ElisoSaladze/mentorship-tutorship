import { request } from "~/lib/request";

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];

// Public endpoint - get all program schemes
export const getProgramScheme = async (page = 0, size = 12) => {
  const query = new URLSearchParams();
  query.append("page", String(page));
  query.append("size", String(size));
  return await request(`${REACT_APP_API_URL}programScheme`).get<
    TYPES.PageResponse<TYPES.ProgramSchemeResponse>
  >({ query });
};

// Admin endpoints
export const adminGetAllProgramSchemes = async (page = 0, size = 10) => {
  const query = new URLSearchParams();
  query.append("page", String(page));
  query.append("size", String(size));
  return await request(`${REACT_APP_API_URL}admin/programScheme`).get<
    TYPES.PageResponse<TYPES.ProgramSchemeResponse>
  >({ query });
};

export const adminGetProgramScheme = async (id: string) =>
  await request(
    `${REACT_APP_API_URL}admin/programScheme/${id}`,
  ).get<TYPES.ProgramSchemeFullResponse>();

export const createProgramScheme = async (
  body: TYPES.ProgramSchemeRequest,
  files: File[] = [],
) => {
  const query = new URLSearchParams();
  query.append("files", files.map((f) => f.name).join(",") || "");

  return await request(
    `${REACT_APP_API_URL}admin/programScheme`,
  ).post<TYPES.ProgramSchemeDb>({
    body: {
      data: body,
      ...files.reduce(
        (acc, file, index) => ({ ...acc, [`file${index}`]: file }),
        {},
      ),
    },
    query,
    type: "file",
  });
};

export const updateProgramScheme = async (
  id: string,
  body: TYPES.ProgramSchemeRequest,
  files: File[] = [],
) => {
  const query = new URLSearchParams();
  query.append("files", files.map((f) => f.name).join(",") || "");

  return await request(
    `${REACT_APP_API_URL}admin/programScheme/${id}`,
  ).put<TYPES.ProgramSchemeDb>({
    body: {
      data: body,
      ...files.reduce(
        (acc, file, index) => ({ ...acc, [`file${index}`]: file }),
        {},
      ),
    },
    query,
    type: "file",
  });
};

export const deleteProgramScheme = async (id: string) =>
  await request(`${REACT_APP_API_URL}admin/programScheme/${id}`).delete();
