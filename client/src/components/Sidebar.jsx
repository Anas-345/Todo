import { useNavigate } from "react-router";
import { useSidebar } from "../context/SidebarContextProvider";

export default function SideBar() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
    setSidebarOpen(false);
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-30 h-screen
          w-64 bg-gray-900 border-r border-gray-800 flex flex-col py-7 shrink-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:sticky md:translate-x-0 md:w-55 md:min-h-screen
        `}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors md:hidden cursor-pointer p-4"
        >
          ✕
        </button>

        <div className="px-6 pb-8 border-b border-gray-800">
          <div
            className="text-white text-xl font-semibold tracking-tight cursor-pointer"
            onClick={() => handleClick("/")}
          >
            ✓ Todo App
          </div>
          <div className="text-gray-500 text-[11px] tracking-[2px] uppercase mt-0.5">
            Stay Organized
          </div>
        </div>

        <nav className="px-3 py-5 flex-1">
          <p className="text-gray-500 text-[10px] uppercase tracking-[2px] px-3 mb-2">
            Main
          </p>
          <button
            onClick={() => handleClick("/dashboard")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white active:scale-95 text-sm font-medium cursor-pointer transition-all duration-200 mb-0.5"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleClick("/dashboard/todo")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white active:scale-95 text-sm font-medium cursor-pointer transition-all duration-200 mb-0.5"
          >
            My Todos
          </button>
        </nav>
      </div>
    </>
  );
}
