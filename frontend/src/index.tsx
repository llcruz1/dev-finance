import { store } from "./app/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
