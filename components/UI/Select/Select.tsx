import React, { FC } from "react";
import styles from "./Select.module.scss";
import cn from "classnames";

interface ISelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: { [key: string]: string };
}

export const Select: FC<ISelectProps> = ({
  placeholder,
  options,
  ...props
}) => {
  return (
    <select {...props} className={cn(styles.select, props.className)}>
      {placeholder && (
        <option className={styles.option} disabled={true} value="">
          {placeholder}
        </option>
      )}
      {options &&
        Object.keys(options).map((key) => (
          <option key={key} value={key} className={styles.option}>
            {options[key]}
          </option>
        ))}
    </select>
  );
};
