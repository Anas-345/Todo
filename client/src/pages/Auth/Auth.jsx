import { Outlet } from "react-router";

export default function Auth() {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
