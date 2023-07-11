import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Answer } from "../../../../../types/general";
import styles from "./ChartAnswers.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface IChartAnswersProps {
  answers: Answer[];
}

export const ChartAnswers: FC<IChartAnswersProps> = ({ answers }) => {
  const labels = Array.from(
    answers.reduce<Set<string>>((result: Set<string>, answer) => {
      if (!answer.value?.[0]) return result;

      answer.value.forEach((value) => result.add(value));

      return result;
    }, new Set()),
  );

  const answersSets = answers.reduce<Array<Set<string>>>((result, answer) => {
    if (!answer.value?.[0]) return result;

    result.push(new Set(answer.value));

    return result;
  }, []);

  const data = labels.map((label) => {
    return answersSets.reduce<number>((result, answersSet) => {
      return answersSet.has(label) ? result + 1 : result;
    }, 0);
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Bar
      data={{
        labels,
        datasets: [{ data, backgroundColor: "rgba(0, 191, 255, 0.5)" }],
      }}
      options={options}
      className={styles.chart}
    />
  );
};
