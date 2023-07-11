import React, { FC, MouseEventHandler, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Popup.module.scss";
import cn from "classnames";

interface IPopupProps {
  isActive: boolean;
  closePopup: () => void;
  title: string;
  children: ReactNode;
}

const PopupPortal: FC<{ children: ReactNode }> = ({ children }) => {
  const containerElement = document.getElementById("popup-container");

  return !containerElement
    ? null
    : ReactDOM.createPortal(children, containerElement);
};

export const Popup: FC<IPopupProps> = ({
  isActive,
  closePopup,
  title,
  children,
}) => {
  const close = () => setTimeout(closePopup, 0);
  const stopPropagation: MouseEventHandler = (event) => event.stopPropagation();

  return !isActive ? null : (
    <PopupPortal>
      <div className={styles.background} onClick={close}>
        <div className={cn(styles.popup)} onClick={stopPropagation}>
          <div className={styles.title}>
            <span>{title}</span>
            <i
              onClick={close}
              className={cn("fa-xmark", "fa-solid", styles.xMark)}
            ></i>
          </div>
          <div className={styles.inner}>{children}</div>
        </div>
      </div>
    </PopupPortal>
  );
};
