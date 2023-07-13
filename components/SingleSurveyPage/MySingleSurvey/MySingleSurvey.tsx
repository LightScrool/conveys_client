import React, { FC, useState } from "react";
import { TUserSurvey } from "../../../types/general";
import { SingleSurveyHead } from "../SingleSurveyHead/SingleSurveyHead";
import { useTranslation } from "react-i18next";
import { AnsweredQuestion } from "./AnsweredQuestion/AnsweredQuestion";
import Button from "../../UI/Button/Button";
import styles from "./MySingleSurvey.module.scss";
import { useBackend } from "../../../hooks/useBackend";
import { Popup } from "../../Popup/Popup";
import { useRouter } from "next/router";
import { sendReachGoal } from "../../../api/ym";

interface IMySingleSurveyPageProps {
  data: TUserSurvey;
}

export const MySingleSurvey: FC<IMySingleSurveyPageProps> = ({ data }) => {
  const { t } = useTranslation();
  const { openSurvey, closeSurvey, deleteSurvey, getSurveyCsv, getSurveyXlsx } =
    useBackend();
  const router = useRouter();

  const handleOpenSurvey = async () => {
    await openSurvey(data.id);
    sendReachGoal("surveyOpened");
    window.location.reload();
  };

  const handleCloseSurvey = async () => {
    await closeSurvey(data.id);
    sendReachGoal("surveyClosed");
    window.location.reload();
  };

  const handleDeleteSurvey = async () => {
    await deleteSurvey(data.id);
    sendReachGoal("surveyDeleted");
    router.push("/my-surveys");
  };

  const download = async (getUrl: () => Promise<string>) => {
    const url = await getUrl();
    window.open(url, "_blank");
  };
  const downloadXlsx = async () => {
    sendReachGoal("reportDownloadXLSX");
    await download(() => getSurveyXlsx(data.id));
  };

  const downloadCsv = async () => {
    sendReachGoal("reportDownloadCSV");
    await download(() => getSurveyCsv(data.id));
  };

  const [isDelPopupActive, setIsDelPopupActive] = useState<boolean>(false);
  const openDelPopup = () => setIsDelPopupActive(true);
  const closeDelPopup = () => setIsDelPopupActive(false);

  const ToggleButton = data.open ? (
    <Button onClick={handleCloseSurvey}>
      {t("singleSurveyPage.my.close")}
    </Button>
  ) : (
    <Button onClick={handleOpenSurvey}>{t("singleSurveyPage.my.open")}</Button>
  );

  return (
    <>
      <SingleSurveyHead
        title={data.name}
        description={data.description}
        expirationTime={data.expirationTime}
        responsesQuantity={data.responsesQuantity}
      />
      <div className={styles.buttons}>
        {ToggleButton}
        <Button onClick={openDelPopup} danger>
          {t("singleSurveyPage.my.delete")}
        </Button>
      </div>
      {data.questions.map((question, index) => (
        <AnsweredQuestion key={question.id} data={question} index={index} />
      ))}
      <div className={styles.downloadButtons}>
        <Button onClick={downloadXlsx} className={styles.downloadButtons__item}>
          {t("singleSurveyPage.my.download") + " XLSX"}
        </Button>
        <Button onClick={downloadCsv} className={styles.downloadButtons__item}>
          {t("singleSurveyPage.my.download") + " CSV"}
        </Button>
      </div>
      <Popup
        isActive={isDelPopupActive}
        closePopup={closeDelPopup}
        title={t("singleSurveyPage.my.confirm")}
      >
        <div className={styles.delPopup}>
          <Button onClick={handleDeleteSurvey} danger>
            {t("singleSurveyPage.my.delete")}
          </Button>
          <Button onClick={closeDelPopup}>
            {t("singleSurveyPage.my.cancel")}
          </Button>
        </div>
      </Popup>
    </>
  );
};
