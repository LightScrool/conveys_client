import React, { FC, useState } from "react";
import styles from "./AnsweredQuestion.module.scss";
import { QuestionTypes, TAnsweredQuestion } from "../../../../types/general";
import { Block } from "../../../UI/Block/Block";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { ListAnswers } from "./ListAnswers/ListAnswers";
import { ChartAnswers } from "./ChartAnswers/ChartAnswers";

interface IAnsweredQuestionProps {
  data: TAnsweredQuestion;
  index: number;
}

export const AnsweredQuestion: FC<IAnsweredQuestionProps> = ({
  data,
  index,
}) => {
  const { t } = useTranslation();
  const title = t("singleSurveyPage.my.questions.title") + (index + 1);

  const [show, setShow] = useState<boolean>(false);
  const toggle = () => setShow((prev) => !prev);

  return (
    <Block
      className={show ? undefined : styles.ptr}
      title={title}
      onClick={show ? undefined : toggle}
    >
      {show && (
        <>
          <div className={styles.text}>{data.text}</div>
          <div className={styles.answersTitle}>
            {t("singleSurveyPage.my.questions.answersTitle")}
          </div>
          {data.type === QuestionTypes.text ? (
            <ListAnswers answers={data.answers} />
          ) : (
            <ChartAnswers answers={data.answers} />
          )}
        </>
      )}
      <i
        onClick={!show ? undefined : toggle}
        className={cn(
          styles.toggleChevron,
          "fa-solid",
          show ? "fa-chevron-up" : "fa-chevron-down",
        )}
      />
    </Block>
  );
};
