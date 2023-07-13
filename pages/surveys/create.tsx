import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { TValues } from "../../components/CreateSurveyPage/types";
import { useOnlyAuth } from "../../hooks/useOnlyAuth";
import {
  ICreateSurveyData,
  QuestionTypes,
  TQuestionCreating,
} from "../../types/general";
import { useBackend } from "../../hooks/useBackend";
import { useActions } from "../../store/hooks";
import { checkNeedsVariants, parseInputDate } from "../../utils/general";
import {
  FieldArray as BadTypeFieldArray,
  FieldArrayConfig,
  Formik,
  FormikErrors,
} from "formik";
import { useRouter } from "next/router";
import { PageContainer } from "../../components/UI/PageContainer/PageContainer";
import Container from "../../components/UI/Container/Container";
import { Loader } from "../../components/UI/Loader/Loader";
import styles from "../../styles/CreateSurveyPage.module.scss";
import { GeneralInputs } from "../../components/CreateSurveyPage/GeneralInputs/GeneralInputs";
import { InputQuestion } from "../../components/CreateSurveyPage/InputQuestion/InputQuestion";
import Button from "../../components/UI/Button/Button";
import { CreateSurveyButton } from "../../components/CreateSurveyButton/CreateSurveyButton";
import { usePageYM } from "../../hooks/usePageYM";
import { sendReachGoal } from "../../api/ym";

const FieldArray = BadTypeFieldArray as FC<FieldArrayConfig>;

const getInitialQuestion = (): TQuestionCreating => ({
  isNecessary: true,
  text: "",
  type: QuestionTypes.text,
  variants: [""],
  otherVariant: false,
});

const getInitialValues = (): TValues => ({
  name: "",
  description: "",
  expirationTime: "",
  questions: [getInitialQuestion()],
});

const CreateSurveyPage = () => {
  usePageYM();

  useOnlyAuth();

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createSurvey, getUserInfo } = useBackend();

  const actions = useActions();
  const loadUserInfo = actions.user.loadUserInfo;

  const router = useRouter();

  const onSubmit = async (values: TValues) => {
    const expirationTime = parseInputDate(values.expirationTime);
    const questions = values.questions.map((question) =>
      checkNeedsVariants(question)
        ? question
        : {
            text: question.text,
            type: question.type,
            isNecessary: question.isNecessary,
            variants: [],
          },
    );

    const data: ICreateSurveyData<Date | null> = {
      ...values,
      expirationTime,
      questions,
    };

    setIsLoading(true);
    createSurvey(data)
      .then((newSurveyId) => {
        loadUserInfo(getUserInfo);
        if (newSurveyId || newSurveyId === 0) {
          router.push(`/surveys/${newSurveyId}`);
        }
      })
      .catch(() => {
        alert("Ошибка!");
      })
      .finally(() => {
        sendReachGoal("surveyCreated");
        setIsLoading(false);
      });
  };

  const validate = (values: TValues) => {
    const errors: FormikErrors<TValues> = {};
    if (!values.name) {
      errors.name = "Обязательное поле!";
    }

    const expirationTime = parseInputDate(values.expirationTime);
    if (expirationTime && expirationTime < new Date()) {
      errors.expirationTime = "Время истечения должно быть в будущем!";
    }

    for (const question of values.questions) {
      if (!question.text) {
        errors.questions = "Не заполнен текст вопроса!";
      }
      if (checkNeedsVariants(question)) {
        for (const variant of question.variants) {
          if (!variant) {
            errors.questions = "Пустой вариант!";
          }
        }
      }
    }

    return errors;
  };

  return (
    <PageContainer>
      <Container>
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <Formik
            initialValues={getInitialValues()}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleSubmit, isValid }) => (
              <form onSubmit={handleSubmit}>
                <GeneralInputs handleChange={handleChange} values={values} />
                <FieldArray name="questions">
                  {({ remove, push }) => (
                    <>
                      <div className={styles.questions}>
                        {values.questions.map((question, index) => (
                          <InputQuestion
                            key={index}
                            values={values}
                            handleChange={handleChange}
                            question={question}
                            index={index}
                            deleteQuestion={() => {
                              remove(index);
                            }}
                          />
                        ))}
                      </div>
                      <Button
                        type="button"
                        className={styles.addButton}
                        onClick={() => {
                          push(getInitialQuestion());
                        }}
                      >
                        {t("createSurvey.addButton")}
                      </Button>
                    </>
                  )}
                </FieldArray>
                <CreateSurveyButton
                  disabled={!isValid}
                  subtext={isValid ? "" : t("createSurvey.notValid")}
                  className={styles.submitButton}
                  type="submit"
                />
              </form>
            )}
          </Formik>
        )}
      </Container>
    </PageContainer>
  );
};

export default CreateSurveyPage;
