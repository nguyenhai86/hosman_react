import "./styles/reset.css";
import "./styles/global.scss";

import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import reportWebVitals from "./reportWebVitals";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { ToastContainer } from "react-toastify";
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const reduxStore = createStore(rootReducer, composedEnhancer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
