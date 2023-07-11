import React, {FC, ReactNode} from "react";
import styles from "./Block.module.scss";
import cn from "classnames";

interface IBlockProps {
  children: ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
}

export const Block: FC<IBlockProps> = ({title, className, children, onClick}) => {
  return (
    <div className={cn(styles.block, className)} onClick={onClick}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};
