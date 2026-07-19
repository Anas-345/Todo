import { useNavigate } from "react-router";
import { handleRouter } from "../../functions/handleRoute";
import { useAuth } from "../../context/AuthContextProvider";
export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1
          className="text-white text-xl font-semibold tracking-tight cursor-pointer"
          onClick={() => handleRouter(navigate, "/")}
        >
          Todo App
        </h1>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <h2>Welcome {user.name}</h2>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer"
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
                className="text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-1.5 rounded-md text-sm transition-colors duration-150 cursor-pointer"
                onClick={() => handleRouter(navigate, "/auth/register")}
              >
                Register
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer"
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
