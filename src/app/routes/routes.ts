import { buildRoute } from "../lazy-routing";
import { paths } from "./paths";

export const routes = [
  buildRoute({
    path: "/",
    factory: () => import("~/pages/layout"),
    state: "unauthenticated",
    defaultNavigation: "home",
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
    ],
  }),
  buildRoute({
    path: paths.login,
    factory: () => import("~/pages/login"),
    state: "unauthenticated",
  }),
];
