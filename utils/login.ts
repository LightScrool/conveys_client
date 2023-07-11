import { YP_API_CLIENT_ID_AUTHORIZE_URL } from "../constants";

export const login = () => {
  try {
    window.location.assign(YP_API_CLIENT_ID_AUTHORIZE_URL);
  } catch (e) {}
};
