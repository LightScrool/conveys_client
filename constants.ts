import UIConfig from "./i18n/UIConfig.json";

export const NAVIGATION_REFS: typeof UIConfig.navigation = {
  main: "/",
  mySurveys: "/my-surveys",
};

export const YP_API_CLIENT_ID = process.env.YP_API_CLIENT_ID ?? '';

export const YP_API_CLIENT_ID_AUTHORIZE_URL = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${YP_API_CLIENT_ID}`;

export const CONVEYS_BACKEND_URL = process.env.CONVEYS_BACKEND_URL ?? '';

export const SURVEYS_PAGE_LIMIT = Number(process.env.SURVEYS_PAGE_LIMIT) ?? 5;

export const SCORE_TO_CREATE = Number(process.env.SCORE_TO_CREATE) ?? 30;
