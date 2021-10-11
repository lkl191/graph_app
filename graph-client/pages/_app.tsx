import "../styles/main.scss";
//import { AuthProvider } from "../context/auth";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/dist/next-server/lib/router/router";
import dynamic from "next/dynamic";

import client from "../components/graphql/client";
import Header from "../components/header";
import Footer from "../components/footer";
import Meta from "../components/meta";
import * as gtag from "../lib/gtag";
import router from "next/router";

const CrispWithNoSSR = dynamic(() => import("../components/crisp"), {
  ssr: false,
});


interface MyWindow extends Window {
  $crisp: [],
  CRISP_WEBSITE_ID: string
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  useEffect(() => {
    (window as MyWindow & typeof globalThis).$crisp = [];
    (window as MyWindow & typeof globalThis).CRISP_WEBSITE_ID = "9c37b529-f47c-42d5-be15-d7db88635701";
    (() => {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("body")[0].appendChild(s);
    })();
  });
  return (
    <>
      <ApolloProvider client={client}>
        <Meta />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
