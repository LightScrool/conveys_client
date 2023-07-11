import { useOnlyAuth } from "../../hooks/useOnlyAuth";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { TShortSurvey } from "../../types/general";
import { useBackend } from "../../hooks/useBackend";
import { PageContainer } from "../../components/UI/PageContainer/PageContainer";
import Container from "../../components/UI/Container/Container";
import { Loader } from "../../components/UI/Loader/Loader";
import { SurveysList } from "../../components/SurveysList/SurveysList";
import { CreateSurveyButton } from "../../components/CreateSurveyButton/CreateSurveyButton";
import styles from "../../styles/MySurveysPage.module.scss";
import { useRouter } from "next/router";

const MySurveysPage = () => {
  useOnlyAuth();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<TShortSurvey[]>([]);

  const { getUserSurveys } = useBackend();

  useEffect(() => {
    setIsLoading(true);
    getUserSurveys().then((result) => {
      setSurveys(result);
      setIsLoading(false);
    });
  }, [getUserSurveys]);

  const router = useRouter();
  const createSurvey = () => {
    router.push("/surveys/create");
  };

  return (
    <PageContainer>
      <Container>
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <>
            {!surveys?.length ? (
              <div className={styles.empty}>{t("mySurveysPage.empty")}</div>
            ) : (
              <SurveysList surveys={surveys} numStart={0} />
            )}
            <CreateSurveyButton
              onClick={createSurvey}
              className={styles.button}
            />
          </>
        )}
      </Container>
    </PageContainer>
  );
};

export default MySurveysPage;
