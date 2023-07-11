import React, { FC, ReactNode } from "react";
import styles from "./CenterPageText.module.scss";

interface CenterPageTextProps {
  children: ReactNode;
}

const CenterPageText: FC<CenterPageTextProps> = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};

export default CenterPageText;
