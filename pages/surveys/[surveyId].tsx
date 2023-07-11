import { useTranslation } from "react-i18next";
import { useBackend } from "../../hooks/useBackend";
import { useEffect, useState } from "react";
import { TStatus, TSurvey, TUserSurvey } from "../../types/general";
import CenterPageText from "../../components/UI/CenterPageText/CenterPageText";
import { Loader } from "../../components/UI/Loader/Loader";
import { PageContainer } from "../../components/UI/PageContainer/PageContainer";
import Container from "../../components/UI/Container/Container";
import { useRouter } from "next/router";
import {MySingleSurvey} from "../../components/SingleSurveyPage/MySingleSurvey/MySingleSurvey";
import {AlienSingleSurvey} from "../../components/SingleSurveyPage/AlienSingleSurvey/AlienSingleSurvey";

const checkIsUserSurvey = (
  survey: TSurvey | TUserSurvey,
): survey is TUserSurvey => {
  // @ts-ignore
  return survey?.responsesQuantity || survey?.responsesQuantity === 0;
};

export const getServerSideProps = async (context) => {
  const { surveyId } = context.params;

  return {
    props: { surveyId },
  };
};

const SingleSurveyPage = ({ surveyId }) => {
  const { t } = useTranslation();

  const { getSingleSurvey } = useBackend();
  const router = useRouter();

  const [status, setStatus] = useState<TStatus>("OK");
  const [data, setData] = useState<TSurvey | TUserSurvey>();

  const isUserSurvey = data && checkIsUserSurvey(data);

  useEffect(() => {
    if (isNaN(surveyId)) {
      router.push("/");
    }

    setStatus("LOADING");
    getSingleSurvey(surveyId)
      .then((result) => {
        setData(result);
        setStatus("OK");
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          router.push("/not-found");
        }
        setStatus("ERROR");
      });
  }, [surveyId, getSingleSurvey, router]);

  return status === "ERROR" ? (
    <CenterPageText>{t("singleSurveyPage.closed")}</CenterPageText>
  ) : !data || status === "LOADING" ? (
    <CenterPageText>
      <Loader />
    </CenterPageText>
  ) : (
    <PageContainer>
      <Container>
        {isUserSurvey ? (
          <MySingleSurvey data={data as TUserSurvey} />
        ) : (
          <AlienSingleSurvey surveyId={surveyId} data={data} />
        )}
      </Container>
    </PageContainer>
  );
};

export default SingleSurveyPage;
