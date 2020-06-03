import React from "react";
import App from "next/app";
import { Provider } from "mobx-react";

import initializeStore from "../stores/stores";
import "react-markdown-editor-lite/lib/index.css";

class CustomApp extends App {
  static async getInitialProps(appContext) {
    const mobxStore = initializeStore();
    appContext.ctx.mobxStore = mobxStore;
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  mobxStore = null;

  constructor(props) {
    super(props);
    const isServer = typeof window === "undefined";
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Provider {...this.mobxStore}>
          <Component {...pageProps} />
        </Provider>
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          a {
            text-decoration: none !important;
            color: white;
          }
          a:link {
            color: white;
            text-decoration: none !important;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default CustomApp;
