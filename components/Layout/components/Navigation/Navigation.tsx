import React, { useMemo } from "react";
import "./Navigation.module.scss";
import { useTranslation } from "react-i18next";
import styles from "./Navigation.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import { NAVIGATION_REFS } from "../../../../constants";

const Navigation = () => {
  const { t } = useTranslation("translation", { keyPrefix: "navigation" });

  const items = useMemo(
    () => Object.keys(NAVIGATION_REFS) as (keyof typeof NAVIGATION_REFS)[],
    [],
  );

  const { pathname } = useRouter();

  const checkIsActive = (path: string) => path === pathname;

  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <Link key={item} href={NAVIGATION_REFS[item]}>
          <a
            className={classnames(styles.item, {
              [styles.item_active]: checkIsActive(NAVIGATION_REFS[item]),
            })}
          >
            {t(item)}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
