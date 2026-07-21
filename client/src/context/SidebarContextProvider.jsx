import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export default function SideBarContextProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <SidebarContext value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext>
  );
}

export const useSidebar = () => useContext(SidebarContext);
