// External dependencies
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";

// Internal imports
import AppRouter from "./routes/AppRouter";
import store, { persistor } from "./store";

// Styles and configurations
import "./language";
import "./index.css";

// Root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <AppRouter />
      </HelmetProvider>
    </PersistGate>
  </Provider>
);
