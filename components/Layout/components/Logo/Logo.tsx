import React, { FC } from "react";
import styles from "./Logo.module.scss";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import Link from "next/link";
import { NAVIGATION_REFS } from "../../../../constants";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <Link href={NAVIGATION_REFS.main}>
      <a className={classnames(className, styles.Logo)}>{t("serviceName")}</a>
    </Link>
  );
};

export default Logo;
