import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import CenterPageText from "../components/UI/CenterPageText/CenterPageText";
import {usePageYM} from "../hooks/usePageYM";

const NotFoundPage = () => {
  usePageYM();

  const { t } = useTranslation();

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return <CenterPageText>{t("pageNotFound")}</CenterPageText>;
};

export default NotFoundPage;
