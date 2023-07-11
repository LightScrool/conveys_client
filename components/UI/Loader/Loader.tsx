import React, { FC } from "react";
import cn from "classnames";
import styles from "./Loader.module.scss";

interface ILoaderProps {
  className?: string;
}

export const Loader: FC<ILoaderProps> = ({ className }) => {
  return <div className={cn(styles.Loader, className)} />;
};
