export const paths = {
  home: "/home",
  login: "/login",
  register: "/register",
  'about-this-project': "/about-this-project",
};

export type PathKey = keyof typeof paths;
export type PathValue = (typeof paths)[PathKey];
