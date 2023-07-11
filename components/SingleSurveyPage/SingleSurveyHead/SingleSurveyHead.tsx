import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SingleSurveyHead.module.scss";

interface IHeadProps {
  title: string;
  description?: string;
  expirationTime?: Date;
  className?: string;
  responsesQuantity?: number;
}

export const SingleSurveyHead: FC<IHeadProps> = ({
  title,
  description,
  expirationTime,
  className,
  responsesQuantity,
}) => {
  const { i18n, t } = useTranslation();

  const rqText = `${t(
    "singleSurveyPage.head.responsesQuantity",
  )}${responsesQuantity}`;
  const etText =
    t("singleSurveyPage.head.expirationTime") +
    expirationTime?.toLocaleString(i18n.language);

  return (
    <div className={className}>
      <div className={styles.title}>{title}</div>
      {responsesQuantity !== undefined && (
        <div className={styles.responsesQuantity}>{rqText}</div>
      )}
      {expirationTime && <div className={styles.expirationTime}>{etText}</div>}
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
};
