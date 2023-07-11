import React, { FC } from "react";
import styles from "./GeneralInputs.module.scss";
import { useTranslation } from "react-i18next";
import { Input } from "../../UI/Input/Input";
import { THandleChange, TValues } from "../types";

interface IGeneralInputsProps {
  values: TValues;
  handleChange: THandleChange;
}

export const GeneralInputs: FC<IGeneralInputsProps> = ({
  values,
  handleChange,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Input
        type="text"
        placeholder={t("createSurvey.name")}
        className={styles.name}
        name="name"
        autoComplete="off"
        value={values.name}
        onChange={handleChange}
      />
      <Input
        type="text"
        rows={3}
        placeholder={t("createSurvey.description")}
        className={styles.description}
        name="description"
        autoComplete="off"
        value={values.description}
        onChange={handleChange}
        maxLength={511}
      />
      <div className={styles.time}>
        <span className={styles.time__text}>
          {t("createSurvey.expirationTime")}
        </span>
        <Input
          className={styles.time__input}
          type="datetime-local"
          name="expirationTime"
          autoComplete="off"
          value={values.expirationTime}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
