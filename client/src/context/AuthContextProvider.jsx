import { createContext, useContext, useEffect, useState } from "react";
import { handleProfile } from "../services/axios";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  async function readProfile(token) {
    if (!token) {
      setUser(null);
      setIsAppLoading(false)
      return;
    }
    const res = await handleProfile(token);
    if (!res) {
      localStorage.removeItem("token");
      setUser(null);
      setIsAppLoading(false)
      return;
    }
    setUser(res);
    setIsAppLoading(false)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    readProfile(token);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, readProfile , isAppLoading}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
