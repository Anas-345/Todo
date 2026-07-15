import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PageRouter from "./Router/PageRouter";

export function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-200">
      <ToastContainer />
      <Header />
      <div className="flex-1">
        <PageRouter />
      </div>
      <Footer />
    </div>
  );
}
