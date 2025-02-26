import { store } from "@assets/js/common_store"; // store 불러오기
import App from '@src/App';
import '@src/assets/styles/scss/global.scss';
import '@src/index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
