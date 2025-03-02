import { createRoot } from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";

import "./language";

// Styles
import "./index.css";
import { HelmetProvider } from "react-helmet-async";


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
      <AppRouter />
      </HelmetProvider>
    </PersistGate>
  </Provider>
);
