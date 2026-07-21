import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router";
import AuthContextProvider from "./context/AuthContextProvider";
import TodoContextProvider from "./context/TodoContextProvider";
import SideBarContextProvider from "./context/SidebarContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TodoContextProvider>
          <SideBarContextProvider>
            <App />
          </SideBarContextProvider>
        </TodoContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
