export let globalAccessToken: string | null = null;

export const setGlobalAccessToken = (token: string | null) => {
  globalAccessToken = token;
};
