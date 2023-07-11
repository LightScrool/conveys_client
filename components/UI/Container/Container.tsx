import React, { FC } from "react";
import styles from "./Container.module.scss";

type ContainerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};

export default Container;
