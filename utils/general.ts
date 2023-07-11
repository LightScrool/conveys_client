import { QuestionTypes, TQuestionCreating } from "../types/general";

export const getRange = (start: number, end: number, step = 1): number[] => {
  let array = [];
  for (let i = start; i < end; i += step) {
    array.push(i);
  }
  return array;
};

export const capitalize = (text: string) => {
  if (!text?.length) return text;

  return text[0].toUpperCase() + text.substring(1);
};

export const parseInputDate = (src: string | undefined | null): Date | null => {
  const numFormat = Date.parse(`${src}Z`);
  if (!numFormat || isNaN(numFormat)) {
    return null;
  }
  const temp = new Date(numFormat);
  return new Date(temp.getTime() + temp.getTimezoneOffset() * 60000);
};

export const checkNeedsVariants = (question: TQuestionCreating): boolean =>
  question.type === QuestionTypes.fewOfList ||
  question.type === QuestionTypes.oneOfList;
