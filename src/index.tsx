import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "typeface-muli";
import "static/styles/index.css";
import { Provider } from "react-redux";
import { GlobalContextProvider } from "./context/globalContext";
import store from "redux/store";
import "./utils/stringUtils";

ReactDOM.render(
  <GlobalContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalContextProvider>,
  document.getElementById("root")
);
