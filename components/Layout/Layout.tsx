import Header from "./components/Header/Header";
import { useAuth } from "../../hooks/useAuth";
import { useActions, useAppSelector } from "../../store/hooks";
import { selectIsAuth } from "../../store/selectors/user";
import { useBackend } from "../../hooks/useBackend";
import { useEffect } from "react";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  useAuth();

  const isAuth = useAppSelector(selectIsAuth);
  const { getUserInfo } = useBackend();
  const actions = useActions();
  const loadUserInfo = actions.user.loadUserInfo;

  useEffect(() => {
    if (isAuth) {
      loadUserInfo(getUserInfo);
    }
  }, [getUserInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className={styles.app}>
      <Header />
      {children}
    </main>
  );
};

export default Layout;
