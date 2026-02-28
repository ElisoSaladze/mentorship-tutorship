import { request } from "~/lib/request";

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];

// Public endpoint - get all news

export const getNews = async (page = 0, size = 10) => {
  const query = new URLSearchParams();
  query.append("page", String(page));
  query.append("size", String(size));
  return await request(`${REACT_APP_API_URL}news`).get<
    TYPES.PageResponse<TYPES.NewsResponse>
  >({ query });
};

export const getNewsById = async (id: string) =>
  await request(`${REACT_APP_API_URL}news/${id}`).get<TYPES.NewsResponse>();

// Admin endpoints
export const adminCreateNews = async (
  body: TYPES.NewsRequest,
  files: File[] = [],
) => {
  const query = new URLSearchParams();

  return await request(`${REACT_APP_API_URL}admin/news`).post({
    body: {
      data: body,
      ...files.reduce(
        (acc, file, index) => ({ ...acc, [`file${index}`]: file }),
        {},
      ),
    },
    type: "file",
    query,
  });
};

export const adminDeleteNews = async (id: string) =>
  await request(`${REACT_APP_API_URL}admin/news/${id}`).delete<void>();
