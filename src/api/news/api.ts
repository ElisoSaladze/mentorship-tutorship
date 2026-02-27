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

// Admin endpoints
export const adminCreateNews = async (
  body: TYPES.NewsRequest,
  files: File[] = [],
) => {
  const query = new URLSearchParams();
  query.append("files", files.map((f) => f.name).join(","));

  const formData = new FormData();

  formData.append(
    "data",
    new Blob([JSON.stringify(body)], { type: "application/json" }),
  );

  files.forEach((file, index) => {
    formData.append(`file${index}`, file);
  });

  return await request(`${REACT_APP_API_URL}admin/news`).post({
    body: formData,
    query,
  });
};

export const adminDeleteNews = async (id: string) =>
  await request(`${REACT_APP_API_URL}admin/news/${id}`).delete<void>();
