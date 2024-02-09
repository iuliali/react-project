import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./store/Theme.context";
import { UserProvider } from "./store/User.context";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Providers = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider >
        <ThemeProvider>
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </ChakraProvider>
    </ReduxProvider>
  );
};

root.render(
  <Providers>
    <App />
  </Providers>
);
