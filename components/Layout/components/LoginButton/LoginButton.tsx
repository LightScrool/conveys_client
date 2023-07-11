import React, { FC } from "react";
import Button from "../../../UI/Button/Button";
import { useTranslation } from "react-i18next";
import { login } from "../../../../utils/login";

interface LoginButtonProps {
  className?: string;
}

const LoginButton: FC<LoginButtonProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Button className={className} onClick={login}>
      {t("loginButton")}
    </Button>
  );
};

export default LoginButton;
