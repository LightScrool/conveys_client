import Head from "next/head";
import Layout from "../components/Layout/Layout";
import {Provider} from "react-redux";
import {store} from "../store";
import "../i18n";
import "../styles/globals.scss";

const App = ({Component, pageProps}) => (
  <>
    <Provider store={store}>
      <Head>
        <meta name="description" content="Онлайн сервис для проведения опросов"/>
        <title>Conveys</title>

        <link rel="icon" href="/favicon.ico"/>
        <meta name="theme-color" content="#000000"/>
        <link rel="apple-touch-icon" href="/logo192.png"/>
        <link rel="manifest" href="/manifest.json"/>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v6.1.1/css/all.css"
        />

        <link rel="stylesheet" href="/no-script-styles.css"/>
      </Head>
      <Layout>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="popup-container"></div>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </>
);

export default App;
