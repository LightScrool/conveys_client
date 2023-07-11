import React, { FC } from "react";
import { getRange } from "../../utils/general";
import cn from "classnames";
import styles from "./PagesList.module.scss";

interface IPagesListProps {
  pagesQuantity: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PagesList: FC<IPagesListProps> = ({
  pagesQuantity,
  currentPage,
  setCurrentPage,
}) => {
  return pagesQuantity < 2 ? null : ( // Too few elements, block is not needed
    <ul className={styles.wrapper}>
      {/* Decrement button*/}
      <li
        className={styles.button}
        onClick={() => setCurrentPage(currentPage === 0 ? 0 : currentPage - 1)}
      >
        <i className="fa-solid fa-arrow-left" />
      </li>

      {/* Page buttons*/}
      {getRange(0, pagesQuantity).map((page) => {
        return (
          <li
            key={page}
            className={cn(styles.button, {
              [styles.button_active]: page === currentPage,
            })}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </li>
        );
      })}

      {/* Increment button*/}
      <li
        className={styles.button}
        onClick={() =>
          setCurrentPage(
            currentPage === pagesQuantity ? pagesQuantity : currentPage + 1
          )
        }
      >
        <i className="fa-solid fa-arrow-right" />
      </li>
    </ul>
  );
};

export default PagesList;
