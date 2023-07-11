import {IConveysBackend, IGetAllSurveysResponse} from "./types";
import {ICreateSurveyData, TShortUserSurvey, TSurvey, TUserInfo, TUserSurvey,} from "../types/general";
import {CONVEYS_BACKEND_URL} from "../constants";
import axios, {AxiosInstance} from "axios";

export default class ConveysBackend implements IConveysBackend {
  api: AxiosInstance;

  constructor(token: string) {
    this.api = axios.create({
      baseURL: CONVEYS_BACKEND_URL + "/api",
    });
    this.api.interceptors.request.use((config) => {
      config.headers.Authorization = `OAuth ${token}`;
      return config;
    });
  }

  getUserInfo = async (): Promise<TUserInfo> => {
    const response = await this.api.get("/user/info");
    return response.data;
  };

  getUserSurveys = async (): Promise<TShortUserSurvey[]> => {
    const response = await this.api.get("/user/surveys");
    return response.data;
  };

  getAllSurveys = async (
    page: number = 0,
    limit: number = 0
  ): Promise<IGetAllSurveysResponse> => {
    const response = await this.api.get("/surveys", {
      headers: { page, limit },
    });
    return response.data;
  };

  getSingleSurvey = async (
    surveyId: number
  ): Promise<TSurvey | TUserSurvey> => {
    const response = await this.api.get(`/surveys/${surveyId}`);
    const expirationTime = response?.data?.expirationTime
      ? new Date(response.data.expirationTime)
      : undefined;
    return { ...response.data, expirationTime };
  };

  getSurveyCsv = async (surveyId: number): Promise<string> => {
    const response = await this.api.get(`/surveys/${surveyId}/csv`);
    return this.api.defaults.baseURL + response.data.url;
  };

  getSurveyXlsx = async (surveyId: number): Promise<string> => {
    const response = await this.api.get(`/surveys/${surveyId}/xlsx`);
    return this.api.defaults.baseURL + response.data.url;
  };

  createSurvey = async (
    data: ICreateSurveyData<Date | null>
  ): Promise<number> => {
    const response = await this.api.post("/surveys", data);
    return response.data.id;
  };

  responseSurvey = async (
    surveyId: number,
    answers: {
      [questionId: number]: Array<string | number>;
    }
  ): Promise<void> => {
    await this.api.post(`/surveys/${surveyId}/response`, answers);
  };

  closeSurvey = async (surveyId: number): Promise<void> => {
    await this.api.patch(`/surveys/${surveyId}/close`);
  };

  openSurvey = async (surveyId: number): Promise<void> => {
    await this.api.patch(`/surveys/${surveyId}/open`);
  };

  deleteSurvey = async (surveyId: number): Promise<void> => {
    await this.api.delete(`/surveys/${surveyId}`);
  };
}
