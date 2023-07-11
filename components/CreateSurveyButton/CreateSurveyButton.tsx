import React, { FC } from "react";
import Button from "../UI/Button/Button";
import { useTranslation } from "react-i18next";
import { SCORE_TO_CREATE } from "../../constants";
import { useAppSelector } from "../../store/hooks";
import { selectUserScore } from "../../store/selectors/user";

interface ICreateSurveyButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  subtext?: string;
}

export const CreateSurveyButton: FC<ICreateSurveyButtonProps> = (props) => {
  const { t } = useTranslation();

  const score = useAppSelector(selectUserScore);
  const disabled = props.disabled ?? (!score || score < SCORE_TO_CREATE);
  const needScore = SCORE_TO_CREATE - (score ?? 0);
  const subtext =
    props.subtext || (disabled ? (t("createButton.notEnough") + (needScore)) : "");

  return (
    <Button {...props} subtext={subtext} disabled={disabled}>
      {t("createButton.text")}
    </Button>
  );
};
