import React, { FC, useMemo } from "react";
import { QuestionTypes, TQuestionCreating } from "../../../types/general";
import { useTranslation } from "react-i18next";
import { THandleChange, TValues } from "../types";
import cn from "classnames";
import { Select } from "../../UI/Select/Select";
import { Input } from "../../UI/Input/Input";
import {Field, FieldArray as BadTypeFieldArray, FieldArrayConfig} from "formik";
import Button from "../../UI/Button/Button";
import { checkNeedsVariants } from "../../../utils/general";
import { Block } from "../../UI/Block/Block";
import styles from "./InputQuestion.module.scss";

const FieldArray = BadTypeFieldArray as FC<FieldArrayConfig>

interface IInputQuestionProps {
  question: TQuestionCreating;
  index: number;
  values: TValues;
  handleChange: THandleChange;
  deleteQuestion: () => void;
}

export const InputQuestion: FC<IInputQuestionProps> = ({
  question,
  index,
  values,
  handleChange,
  deleteQuestion,
}) => {
  const { t } = useTranslation();

  const needsVariants = checkNeedsVariants(question);

  const typesOptions = useMemo(
    () => ({
      [QuestionTypes.text]: t("createSurvey.questions.types.text"),
      [QuestionTypes.number]: t("createSurvey.questions.types.number"),
      [QuestionTypes.oneOfList]: t("createSurvey.questions.types.oneOfList"),
      [QuestionTypes.fewOfList]: t("createSurvey.questions.types.fewOfList"),
    }),
    [t],
  );

  return (
    <Block>
      <div className={styles.head}>
        <div className={styles.head__title}>
          {`${t("createSurvey.questions.title")}${index + 1}`}
        </div>
        <i
          onClick={deleteQuestion}
          className={cn("fa-xmark", "fa-solid", styles.head__xMark)}
        ></i>
      </div>
      <div className={styles.isNecessary}>
        <Field
          type="checkbox"
          name={`questions.${index}.isNecessary`}
          className={styles.isNecessary__checkbox}
        />
        <span>{t("createSurvey.questions.isNecessary")}</span>
      </div>
      <Select
        options={typesOptions}
        name={`questions.${index}.type`}
        value={values.questions[index].type}
        onChange={handleChange}
        placeholder="Тип"
        className={styles.type}
      />
      <Input
        name={`questions.${index}.text`}
        value={values.questions[index].text}
        onChange={handleChange}
        type="text"
        placeholder={t("createSurvey.questions.text")}
        autoComplete="off"
        rows={4}
        className={styles.text}
        maxLength={1023}
      />
      {needsVariants && (
        <FieldArray name={`questions.${index}.variants`}>
          {({ remove, push }) => (
            <>
              {question.variants?.map((variant, variantIndex) => (
                <div key={variantIndex} className={styles.variant}>
                  <Input
                    name={`questions.${index}.variants.${variantIndex}`}
                    value={values.questions[index].variants[variantIndex]}
                    onChange={handleChange}
                    type="text"
                    placeholder={
                      t("createSurvey.questions.variant.text") +
                      (variantIndex + 1)
                    }
                    autoComplete="off"
                    className={styles.variant__input}
                  />
                  <i
                    onClick={() => remove(variantIndex)}
                    className={cn(
                      "fa-xmark",
                      "fa-solid",
                      styles.variant__xMark,
                    )}
                  ></i>
                </div>
              ))}
              <div className={styles.variantsGeneral}>
                <Button
                  type="button"
                  onClick={() => {
                    push("");
                  }}
                >
                  {t("createSurvey.questions.variant.addButton")}
                </Button>
                <div className={styles.variantsGeneral__otherVariant}>
                  <span>{t("createSurvey.questions.otherVariant")}</span>
                  <Field
                    type="checkbox"
                    name={`questions.${index}.otherVariant`}
                    className={styles.variantsGeneral__checkbox}
                  />
                </div>
              </div>
            </>
          )}
        </FieldArray>
      )}
    </Block>
  );
};
