import React, { FC } from "react";
import styles from "./Button.module.scss";
import classnames from "classnames";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  subtext?: string;
  danger?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  subtext,
  disabled,
  className,
  type,
  danger = false,
  ...props
}) => {
  const combineClasses = classnames(styles.Button, className, {
    [styles.disabled]: disabled,
    [styles.withSubtext]: subtext,
    [styles.danger]: danger,
  });

  return (
    <button
      disabled={!!disabled}
      type={type}
      className={combineClasses}
      {...props}
    >
      {subtext ? (
        <div className={styles.textWrapper}>
          <div>{children}</div>
          <div className={styles.subtext}>{subtext}</div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
