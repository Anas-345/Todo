import { useNavigate } from "react-router";
import { handleRouter } from "../../functions/handleRoute";
import { useAuth } from "../../context/AuthContextProvider";
export default function Header() {
  const { users, setUsers } = useAuth();
  const navigate = useNavigate();

  const activeUser = users.find((u) => u.active);

  function handleClick(navigate, path) {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === activeUser.email ? { ...u, active: false } : u,
      ),
    );
    handleRouter(navigate, path);
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1
          className="text-white text-xl font-semibold tracking-tight cursor-pointer"
          onClick={() => handleRouter(navigate, "/")}
        >
          Todo App
        </h1>

        <nav>
          <ul className="flex items-center gap-1">
            {[
              {
                content: "Home",
                path: "/",
              },
              {
                content: "Dashboard",
                path: "/dashboard",
              },
              {
                content: "Todos",
                path: "/todo",
              },
            ].map((item) => (
              <li
                key={item.content}
                className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-1.5 rounded-md text-sm transition-colors duration-150 cursor-pointer"
                onClick={() => handleRouter(navigate, item.path)}
              >
                {item.content}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {activeUser ? (
            <>
              <h2>Welcome {activeUser.name}</h2>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer"
                onClick={() => handleClick(navigate, "/auth/login")}
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
