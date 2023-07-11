import React, {FC} from "react";
import cn from "classnames";
import styles from "./Input.module.scss";

type TBase = React.InputHTMLAttributes<HTMLTextAreaElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

interface IInputProps extends TBase {
  rows?: number;
}

export const Input: FC<IInputProps> = (props) => {
  const rows = props?.rows || 1;

  return rows === 1 ? (
    <input maxLength={255} {...props} className={cn(styles.input, props.className)}/>
  ) : (
    <textarea maxLength={255}  {...props} className={cn(styles.input, props.className)}/>
  );
};
