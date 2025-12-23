export const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  "about-this-project": "/about-this-project",
  gallery: "/gallery",
  contact: "/contact",
  schemes: "/schemes",
  schemeDetails: "/schemes/:id",
  userDetails: "/dashboard/profile",
  main: "/dashboard",
  adminUsers: "/dashboard/admin/users",
  manageSchemes: "/dashboard/schemas",
};

export type PathKey = keyof typeof paths;
export type PathValue = (typeof paths)[PathKey];
