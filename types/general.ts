export type TStatus = "LOADING" | "OK" | "ERROR";

export type TUserInfo = {
  id: string;
  name: string;
  score: number;
};

export type TShortSurvey = {
  id: number;
  name: string;
  description: string;
};

export type TShortUserSurvey = {
  id: number;
  name: string;
  description: string;
  responsesQuantity: number;
};

export enum QuestionTypes {
  "oneOfList" = "oneOfList",
  "fewOfList" = "fewOfList",
  "text" = "text",
  "number" = "number",
}

export type TQuestionCreating = {
  text: string;
  type: QuestionTypes;
  isNecessary?: boolean;
  variants: string[];
  otherVariant?: boolean;
};

export interface ICreateSurveyData<T> {
  name: string;
  description?: string;
  expirationTime?: T;
  questions: Array<TQuestionCreating>;
}

export interface TQuestion extends TQuestionCreating {
  id: number;
}

export type TSurvey = {
  id: number;
  name: string;
  description?: string;
  open: boolean;
  userId: string;
  expirationTime?: Date;
  questions: Array<TQuestion>;
};

export type Answer = {
  id: number;
  value: Array<string> | null;
};

export interface TAnsweredQuestion extends TQuestion {
  answers: Array<Answer>;
}

export interface TUserSurvey extends TSurvey {
  responsesQuantity: number;
  questions: Array<TAnsweredQuestion>;
}
