import React, { FC } from "react";
import { TShortSurvey, TShortUserSurvey } from "../../types/general";
import Button from "../UI/Button/Button";
import { useTranslation } from "react-i18next";
import styles from "./SurveysList.module.scss";
import { capitalize } from "../../utils/general";
import Link from "next/link";

interface ISurveysProps {
  surveys: TShortSurvey[] | TShortUserSurvey[];
  numStart: number;
}

const isUserSurvey = (
  survey: TShortSurvey | TShortUserSurvey,
): survey is TShortUserSurvey => {
  // @ts-ignore
  return !(!survey.responsesQuantity && survey.responsesQuantity !== 0);
};

export const SurveysList: FC<ISurveysProps> = ({ surveys, numStart = 0 }) => {
  const { t } = useTranslation();

  return (
    <ul className={styles.wrapper}>
      {surveys.map((survey, i) => (
        <Link key={survey.id} href={`/surveys/${survey.id}`}>
          <li className={styles.survey}>
            <div className={styles.survey__content}>
              <div className={styles.survey__title}>
                {`${numStart + i + 1}. ${capitalize(survey.name)}`}
              </div>
              <div className={styles.survey__description}>
                {survey.description}
              </div>
            </div>
            {isUserSurvey(survey) ? (
              <span className={styles.survey__responsesQuantity}>
                {survey.responsesQuantity}
              </span>
            ) : (
              <Button className={styles.survey__button}>
                {t("surveysList.button")}
              </Button>
            )}
          </li>
        </Link>
      ))}
    </ul>
  );
};
