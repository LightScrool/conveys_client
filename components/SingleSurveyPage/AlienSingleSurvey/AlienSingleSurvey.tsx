import React, { FC, useLayoutEffect, useMemo, useState } from "react";
import { QuestionTypes, TSurvey } from "../../../types/general";
import styles from "./AlienSingleSurvey.module.scss";
import { SingleSurveyHead } from "../SingleSurveyHead/SingleSurveyHead";
import { useTranslation } from "react-i18next";
import { Formik, FormikErrors } from "formik";
import Button from "../../UI/Button/Button";
import { InputAnswer } from "./InputAnswer/InputAnswer";
import { TValues } from "./types";
import { useBackend } from "../../../hooks/useBackend";
import { Loader } from "../../UI/Loader/Loader";
import { useActions, useAppSelector } from "../../../store/hooks";
import { selectIsAuth } from "../../../store/selectors/user";
import {
  addAnsweredSurvey,
  getAnsweredSurveys,
} from "../../../utils/answeredSurveys";
import {sendReachGoal} from "../../../api/ym";

interface IAlienSingleSurveyPageProps {
  surveyId: number;
  data: TSurvey;
}

export const AlienSingleSurvey: FC<IAlienSingleSurveyPageProps> = ({
  surveyId,
  data,
}) => {
  const { t } = useTranslation();

  const initialValues = useMemo<TValues>(() => {
    return data.questions.reduce<TValues>((result, question) => {
      result[question.id] =
        question.type === QuestionTypes.fewOfList ? [] : [""];
      return result;
    }, {});
  }, [data]);

  const validate = (values: TValues) => {
    const errors: FormikErrors<TValues> = {};

    data.questions.forEach((question) => {
      if (!question.isNecessary) return;

      const answer = values[question.id];
      if (!answer[0] && answer[0] !== 0) {
        errors[question.id] = "Обязательный ворос";
      }
    });

    return errors;
  };

  const { responseSurvey, getUserInfo } = useBackend();

  const isAuth = useAppSelector(selectIsAuth);
  const actions = useActions();
  const loadUserInfo = actions.user.loadUserInfo;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const answeredSurveys = getAnsweredSurveys();
  useLayoutEffect(() => {
    if (answeredSurveys.has(surveyId)) {
      setIsAnswered(true);
    }
  }, [answeredSurveys, surveyId]);

  const onSubmit = async (values: TValues) => {
    setIsLoading(true);
    await responseSurvey(surveyId, values);
    setIsLoading(false);
    setIsAnswered(true);
    sendReachGoal("surveyAnswered");

    if (isAuth) {
      loadUserInfo(getUserInfo);
    } else {
      addAnsweredSurvey(surveyId);
    }
  };

  return isAnswered ? (
    <div className={styles.answered}>
      {t("singleSurveyPage.alien.answered")}
    </div>
  ) : isLoading ? (
    <Loader className={styles.loader} />
  ) : (
    <>
      <SingleSurveyHead
        title={data.name}
        description={data.description}
        expirationTime={data.expirationTime}
        className={styles.head}
      />
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit, isValid, setValues }) => (
          <form onSubmit={handleSubmit}>
            {data.questions.map((question, index) => (
              <InputAnswer
                key={question.id}
                question={question}
                index={index}
                values={values}
                setValues={setValues}
                handleChange={handleChange}
              />
            ))}
            <Button
              disabled={!isValid}
              subtext={isValid ? "" : t("singleSurveyPage.alien.notValid")}
              className={styles.submitButton}
              type="submit"
            >
              {t("singleSurveyPage.alien.submitButton.text")}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};
