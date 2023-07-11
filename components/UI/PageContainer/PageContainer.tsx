import React, { FC, ReactNode } from "react";
import styles from "./PageContainer.module.scss";

interface IPageContainerProps {
  children: ReactNode;
}

export const PageContainer: FC<IPageContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
