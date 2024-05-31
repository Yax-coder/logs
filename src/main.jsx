import React from "react";
import ReactDOM from "react-dom/client";
import 'react-loading-skeleton/dist/skeleton.css';
import "./index.css";
import { AppRouter } from "./app/app-router.jsx";
import AppLayout from "./app/app-layout.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store  from "./redux/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        <AppRouter>
          <AppLayout />
        </AppRouter>
    </Provider>
  </React.StrictMode>
);
