import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "react-image-gallery/styles/css/image-gallery.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FireBaseContext } from "./hoc/Firebase";

ReactDOM.render(
  <FireBaseContext.Provider value={new Firebase()}>
    <App />
  </FireBaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
