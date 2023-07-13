import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store/hooks";
import { selectIsAuth } from "../store/selectors/user";
import { useEffect, useState } from "react";
import { TShortSurvey } from "../types/general";
import { useBackend } from "../hooks/useBackend";
import { SURVEYS_PAGE_LIMIT } from "../constants";
import { getAnsweredSurveys } from "../utils/answeredSurveys";
import { PageContainer } from "../components/UI/PageContainer/PageContainer";
import Container from "../components/UI/Container/Container";
import { Loader } from "../components/UI/Loader/Loader";
import PagesList from "../components/PagesList/PagesList";
import { SurveysList } from "../components/SurveysList/SurveysList";
import styles from "../styles/SurveysPage.module.scss";
import { usePageYM } from "../hooks/usePageYM";

const SurveysPage = () => {
  usePageYM();

  const { t } = useTranslation();

  const isAuth = useAppSelector(selectIsAuth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<TShortSurvey[]>([]);
  const [pagesQuantity, setPagesQuantity] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { getAllSurveys } = useBackend();

  useEffect(() => {
    setIsLoading(true);
    getAllSurveys(currentPage, SURVEYS_PAGE_LIMIT).then((result) => {
      let surveys = result.surveys;
      if (!isAuth) {
        const answeredSurveys = getAnsweredSurveys();
        surveys = surveys.filter((survey) => !answeredSurveys.has(survey.id));
      }

      setPagesQuantity(result.totalPages);
      setSurveys(surveys);
      setIsLoading(false);
    });
  }, [getAllSurveys, currentPage, isAuth]);

  return (
    <PageContainer>
      <Container>
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : !pagesQuantity && !surveys?.length ? (
          <div className={styles.empty}>{t("surveysPage.empty")}</div>
        ) : (
          <>
            <PagesList
              pagesQuantity={pagesQuantity}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {!surveys?.length ? (
              <div className={styles.empty}>{t("surveysPage.empty")}</div>
            ) : (
              <SurveysList
                surveys={surveys}
                numStart={currentPage * SURVEYS_PAGE_LIMIT}
              />
            )}
          </>
        )}
      </Container>
    </PageContainer>
  );
};

export default SurveysPage;
