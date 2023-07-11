import React, { FC, useMemo } from "react";
import styles from "./ListAnswers.module.scss";
import { Answer } from "../../../../../types/general";

interface IListAnswersProps {
  answers: Answer[];
}

export const ListAnswers: FC<IListAnswersProps> = ({ answers }) => {
  const nonEmptyAnswers = useMemo(() => {
    return answers.filter((answer) => answer.value?.length && answer.value[0]);
  }, [answers]);

  return (
    <>
      {nonEmptyAnswers.map((answer) => (
        <div key={answer.id} className={styles.answer}>
          {/*@ts-ignore*/}
          {answer.value[0]}
        </div>
      ))}
    </>
  );
};
