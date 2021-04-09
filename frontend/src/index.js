import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
