import { ToastContainer } from "react-toastify";
import PageRouter from "./Router/PageRouter";
import { useAuth } from "./context/AuthContextProvider";
import AppLoader from "./components/AppLoader";

export function App() {
  const { isAppLoading } = useAuth();

  return (
    <div className="bg-gray-950 text-gray-200">
      <ToastContainer />
      {isAppLoading ? <AppLoader /> : <PageRouter />}
    </div>
  );
}
