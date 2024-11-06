import React from "react";

import ToastProvider from "./providers/ToastProvider";
import QueryClientProvider from "./providers/QueryClientProvider";
import Router from "./routes";

import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <QueryClientProvider>
      <Router />
      <ToastProvider />
    </QueryClientProvider>
  );
};

export default App;
