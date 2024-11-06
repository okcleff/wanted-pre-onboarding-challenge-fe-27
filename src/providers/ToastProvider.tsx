import { ToastContainer } from "react-toastify";

import { TOAST_AUTO_CLOSE_TIME } from "../constants";

import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return <ToastContainer autoClose={TOAST_AUTO_CLOSE_TIME} theme="colored" />;
};
export default ToastProvider;
