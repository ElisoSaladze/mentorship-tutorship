import { request } from "~/lib/request";

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];

// Public endpoint - get all news
export const getNews = async () =>
  await request(`${REACT_APP_API_URL}news`).get<Array<TYPES.NewsResponse>>();

// Admin endpoints
export const adminCreateNews = async (body: TYPES.NewsRequest, files: File[] = []) => {
  const query = new URLSearchParams();
  query.append("files", files.map(f => f.name).join(",") || "");

  return await request(`${REACT_APP_API_URL}admin/news`).post<TYPES.NewsResponse>({
    body: {
      data: body,
      ...files.reduce((acc, file, index) => ({ ...acc, [`file${index}`]: file }), {}),
    },
    query,
    type: "file",
  });
};

export const adminDeleteNews = async (id: string) =>
  await request(`${REACT_APP_API_URL}admin/news/${id}`).delete<void>();
