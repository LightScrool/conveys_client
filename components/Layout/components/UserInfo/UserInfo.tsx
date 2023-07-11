import React, { FC } from "react";
import "./UserInfo.module.scss";
import AuthUserInfo from "./AuthUserInfo";
import LoginButton from "../LoginButton/LoginButton";
import { useAppSelector } from "../../../../store/hooks";
import { selectIsAuth } from "../../../../store/selectors/user";

interface AccInfoProps {
  className?: string;
}

const UserInfo: FC<AccInfoProps> = ({ className }) => {
  const isAuth = useAppSelector(selectIsAuth);

  return isAuth ? (
    <AuthUserInfo className={className} />
  ) : (
    <LoginButton className={className} />
  );
};

export default UserInfo;
