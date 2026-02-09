export const paths = {
  home: "/",
  login: "/login",
  register: "/register",
  "about-this-project": "/about-this-project",
  gallery: "/gallery",
  contact: "/contact",
  schemes: "/schemes",
  schemeDetails: "/schemes/:id",
  userDetails: "/homepage/profile",
  main: "/homepage",
  adminUsers: "/homepage/admin/users",
  manageSchemes: "/homepage/schemas",
  academicStaff: "/homepage/staff",
};

export type PathKey = keyof typeof paths;
export type PathValue = (typeof paths)[PathKey];
