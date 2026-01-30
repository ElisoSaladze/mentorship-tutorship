import { request } from "~/lib/request";

const REACT_APP_API_URL = import.meta.env["VITE_API_URL"];

// Public endpoints
export const getAllCourses = async () =>
  await request(`${REACT_APP_API_URL}course`).get<Array<TYPES.CourseResponse>>();

export const getCourseById = async (id: string) =>
  await request(`${REACT_APP_API_URL}course/${id}`).get<TYPES.CourseResponse>();

export const getCoursesByProgramId = async (programId: string) =>
  await request(`${REACT_APP_API_URL}course/program/${programId}`).get<
    Array<TYPES.CourseResponse>
  >();

export const addUserToCourse = async (id: string, role: TYPES.ProgramRole) =>
  await request(`${REACT_APP_API_URL}course/${id}/addUser`).put<
    Array<TYPES.CourseResponse>
  >({
    body: role,
  });

// Admin endpoints
export const adminGetAllCourses = async () =>
  await request(`${REACT_APP_API_URL}admin/course`).get<
    Array<TYPES.CourseResponse>
  >();

export const adminGetCourseById = async (id: string) =>
  await request(`${REACT_APP_API_URL}admin/course/${id}`).get<TYPES.CourseResponse>();

export const adminGetCoursesByProgramId = async (programId: string) =>
  await request(`${REACT_APP_API_URL}admin/course/program/${programId}`).get<
    Array<TYPES.CourseResponse>
  >();

export const createCourse = async (body: TYPES.CourseRequest) =>
  await request(`${REACT_APP_API_URL}admin/course`).post<TYPES.Course>({
    body,
  });

export const updateCourse = async (id: string, body: TYPES.CourseRequest) =>
  await request(`${REACT_APP_API_URL}admin/course/${id}`).put<TYPES.Course>({
    body,
  });
