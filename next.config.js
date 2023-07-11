module.exports = {
  reactStrictMode: true,
  env: {
    YP_API_CLIENT_ID: process.env.YP_API_CLIENT_ID,
    CONVEYS_BACKEND_URL: process.env.CONVEYS_BACKEND_URL,
    SURVEYS_PAGE_LIMIT: process.env.SURVEYS_PAGE_LIMIT,
    SCORE_TO_CREATE: process.env.SCORE_TO_CREATE,
  },
};
