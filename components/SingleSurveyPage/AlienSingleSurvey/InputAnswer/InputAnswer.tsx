import React, { FC, SetStateAction, useRef, useState } from "react";
import styles from "./InputAnswer.module.scss";
import { Block } from "../../../UI/Block/Block";
import { checkNeedsVariants } from "../../../../utils/general";
import { Field } from "formik";
import { Input } from "../../../UI/Input/Input";
import { QuestionTypes, TQuestion } from "../../../../types/general";
import { useTranslation } from "react-i18next";
import { THandleChange, TValues } from "../types";

interface IInputAnswerProps {
  question: TQuestion;
  index: number;
  values: TValues;
  setValues: (
    values: SetStateAction<TValues>,
    shouldValidate?: boolean | undefined,
  ) => void;
  handleChange: THandleChange;
}

type MyChangeEventHandler = React.ChangeEventHandler<HTMLInputElement> &
  React.ChangeEventHandler<HTMLTextAreaElement>;

export const InputAnswer: FC<IInputAnswerProps> = ({
  question,
  index,
  values,
  setValues,
  handleChange,
}) => {
  const { t } = useTranslation();

  const name =
    question.type === QuestionTypes.fewOfList
      ? String(question.id)
      : `${question.id}.0`;

  const [otherVariantValue, setOtherVariantValue] = useState<string>("");
  const otherVariantRef = useRef<HTMLInputElement>(null);
  const otherVariantInputHandleChange: MyChangeEventHandler = (element) => {
    setOtherVariantValue((prevOtherVariantValue) => {
      const newOtherVariantValue = element.target.value;

      setValues((prevValues) => {
        const newValues = { ...prevValues };

        const prevQuestionVal = prevValues[question.id];
        const otherIndex = prevQuestionVal.findIndex(
          (val) => val === prevOtherVariantValue,
        );

        const newQuestionVal = [...prevQuestionVal];
        if (otherIndex === -1) {
          newQuestionVal.push(newOtherVariantValue);
        } else {
          newQuestionVal[otherIndex] = newOtherVariantValue;
        }

        newValues[question.id] = newQuestionVal;

        return newValues;
      }, true);

      return newOtherVariantValue;
    });
  };

  return (
    <Block
      title={`${index + 1}. ${question.text}${
        question.isNecessary ? " *" : ""
      }`}
    >
      {checkNeedsVariants(question) ? (
        <>
          {question.variants.map((variant) => (
            <div key={variant} className={styles.variant}>
              <Field
                type={
                  question.type === QuestionTypes.fewOfList
                    ? "checkbox"
                    : "radio"
                }
                name={name}
                value={variant}
                className={styles.variant__checkbox}
              />
              <span>{variant}</span>
            </div>
          ))}
          {question.otherVariant && (
            <>
              <div className={styles.variant}>
                <input
                  ref={otherVariantRef}
                  type={
                    question.type === QuestionTypes.fewOfList
                      ? "checkbox"
                      : "radio"
                  }
                  name={name}
                  value={otherVariantValue}
                  onChange={handleChange}
                  className={styles.variant__checkbox}
                />
                <span>{t("singleSurveyPage.alien.otherVariant")}</span>
              </div>
              {otherVariantRef?.current?.checked && (
                <Input
                  className={styles.otherInput}
                  value={otherVariantValue}
                  onChange={otherVariantInputHandleChange}
                  type="text"
                  rows={3}
                  placeholder={t("singleSurveyPage.alien.inputText")}
                  autoComplete="off"
                />
              )}
            </>
          )}
        </>
      ) : (
        <Input
          name={name}
          value={values[question.id][0]}
          onChange={handleChange}
          type={question.type === QuestionTypes.number ? "number" : "text"}
          rows={question.type === QuestionTypes.number ? 1 : 3}
          placeholder={t(
            question.type === QuestionTypes.number
              ? "singleSurveyPage.alien.inputNum"
              : "singleSurveyPage.alien.inputText",
          )}
          autoComplete="off"
        />
      )}
    </Block>
  );
};
