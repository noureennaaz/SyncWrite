// import React from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./middlewares/Auth";
import { DocProvider } from "./middlewares/Doc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <AuthProvider>
      <DocProvider>
      <App />
      </DocProvider>
    </AuthProvider>
    </Provider>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);
