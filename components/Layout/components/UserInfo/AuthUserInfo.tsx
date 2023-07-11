import React, { FC } from "react";
import styles from "./UserInfo.module.scss";
import Image from "next/image";
import classnames from "classnames";
import { useLogout } from "../../../../hooks/useLogout";
import { useAppSelector } from "../../../../store/hooks";
import {
  selectUserName,
  selectUserScore,
} from "../../../../store/selectors/user";

interface AuthAccInfoProps {
  className?: string;
}

const AuthUserInfo: FC<AuthAccInfoProps> = ({ className }) => {
  const score = useAppSelector(selectUserScore);
  const nickName = useAppSelector(selectUserName);

  const logout = useLogout() as () => {};

  return (
    <div className={classnames(className, styles.AuthAccInfo)}>
      <span className={styles.score}>
        {score}
        <Image src="/star.svg" alt="Баллы" width={25.5} height={25.5} />
      </span>
      <span className={styles.nickname}>{nickName}</span>
      <Image
        className={styles.logout}
        src="/logout.svg"
        alt="Выйти"
        width={25.5}
        height={25.5}
        onClick={logout}
      />
    </div>
  );
};

export default AuthUserInfo;
