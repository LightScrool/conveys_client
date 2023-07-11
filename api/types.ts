import {
  ICreateSurveyData,
  TShortSurvey,
  TShortUserSurvey,
  TSurvey,
  TUserInfo,
  TUserSurvey,
} from "../types/general";

export interface IGetAllSurveysResponse {
  totalPages: number;
  surveys: TShortSurvey[];
}

export interface IConveysBackend {
  getUserInfo: () => Promise<TUserInfo>;
  getUserSurveys: () => Promise<TShortUserSurvey[]>;
  getAllSurveys: (
    page: number,
    limit: number
  ) => Promise<IGetAllSurveysResponse>;

  getSingleSurvey: (id: number) => Promise<TSurvey | TUserSurvey>;

  getSurveyXlsx: (surveyId: number) => Promise<string>;

  getSurveyCsv: (surveyId: number) => Promise<string>;

  createSurvey: (data: ICreateSurveyData<Date | null>) => Promise<number>;

  responseSurvey: (
    surveyId: number,
    answers: {
      [questionId: number]: Array<string | number>;
    }
  ) => Promise<void>;

  closeSurvey: (surveyId: number) => Promise<void>;
  openSurvey: (surveyId: number) => Promise<void>;
  deleteSurvey: (surveyId: number) => Promise<void>;
}
