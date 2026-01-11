import { buildRoute } from "../lazy-routing";
import { paths } from "./paths";

export const routes = [
  buildRoute({
    path: paths.home,
    factory: () => import("~/pages/unauth-layout"),
    state: "unauthenticated",
    children: [
      {
        path: paths.home,
        state: "unauthenticated",
        factory: () => import("~/pages/about-this-project"),
      },
      {
        path: paths.gallery,
        state: "unauthenticated",
        factory: () => import("~/pages/gallery"),
      },
      {
        path: paths.contact,
        state: "unauthenticated",
        factory: () => import("~/pages/contact"),
      },
      {
        path: paths.register,
        factory: () => import("~/pages/register"),
        state: "unauthenticated",
      },
      {
        path: paths.schemes,
        factory: () => import("~/pages/schemes"),
        state: "unauthenticated",
      },
    ],
  }),
  buildRoute({
    path: paths.login,
    factory: () => import("~/pages/login"),
    state: "unauthenticated",
  }),
  buildRoute({
    path: paths.main,
    factory: () => import("~/pages/auth-layout"),
    state: "authenticated",
    children: [
      {
        path: paths.userDetails,
        factory: () => import("~/pages/user-details"),
        state: "authenticated",
      },
      {
        path: paths.academicStaff,
        factory: () => import("~/pages/academic-staff"),
        state: "authenticated",
      },
      {
        path: paths.main,
        factory: () => import("~/pages/manage-schemes"),
        state: "authenticated",
      },
      {
        path: paths.manageSchemes,
        factory: () => import("~/pages/manage-schemes"),
        state: "authenticated",
      },
      {
        path: paths.adminUsers,
        factory: () => import("~/pages/admin-users"),
        state: "admin",
      },
    ],
  }),
];
