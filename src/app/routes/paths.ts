export const paths = {
  home: "/home",
  login: "/login",
  register: "/register",
  "about-this-project": "/about-this-project",
  gallery: "/gallery",
  contact: "/contact",
  schemes: "/schemes",
  schemeDetails: "/schemes/:id",
  userDetails: "/dashboard/profile",
  main: "/dashboard",
};

export type PathKey = keyof typeof paths;
export type PathValue = (typeof paths)[PathKey];
