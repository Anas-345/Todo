import { Outlet } from "react-router";
import SideBar from "../../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
