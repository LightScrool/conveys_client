import longTermStorage from "../longTermStorage";

const KEY = "answeredSurveys";

export const getAnsweredSurveys = (): Set<number> => {
  const temp = JSON.parse(longTermStorage.getItem(KEY) || "[]");
  return temp.map ? new Set(temp.map(Number)) : new Set();
};

export const setAnsweredSurveys = (data: Set<number>) => {
  longTermStorage.setItem(KEY, JSON.stringify(Array.from(data)));
};

export const addAnsweredSurvey = (item: number) => {
  const data = getAnsweredSurveys();
  data.add(item);
  setAnsweredSurveys(data);
};
