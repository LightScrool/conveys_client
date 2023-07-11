import React from "react";
import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import UserInfo from "../UserInfo/UserInfo";
import Container from "../../../UI/Container/Container";

const Header = () => {
  return (
    <header className={styles.Header}>
      <Container>
        <div className={styles.inner}>
          <Logo />
          <Navigation />
          <UserInfo />
        </div>
      </Container>
    </header>
  );
};

export default Header;
