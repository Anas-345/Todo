import { useNavigate } from "react-router";
import { handleRouter } from "../../functions/handleRoute";
import { useAuth } from "../../context/AuthContextProvider";
export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 items-center">
        <h1
          className="text-white text-lg sm:text-xl font-semibold tracking-tight cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/")}
        >
          Todo App
        </h1>

        <h2 className="hidden sm:block text-gray-400 text-sm text-center truncate">
          {user ? `Welcome, ${user.name}` : ""}
        </h2>

        <div className="flex items-center justify-end gap-2 sm:gap-3 flex-wrap">
          {user ? (
            <>
              <h2 className="sm:hidden text-gray-400 text-sm mr-1 truncate">
                {user.name}
              </h2>
              <button
                className="text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer"
                onClick={() => handleRouter(navigate, "/auth/register")}
              >
                Register
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150 cursor-pointer"
                onClick={() => handleRouter(navigate, "/auth/login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
