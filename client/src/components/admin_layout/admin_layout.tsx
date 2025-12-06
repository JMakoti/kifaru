import { Outlet } from "react-router";
import AppSidebar from "./app_sidebar";
import Topbar from "./topbar";

export default function AdminLayout() {
  return (
    <div className="flex flex-row">
      <AppSidebar>
        <Topbar />
        <Outlet />
      </AppSidebar>
    </div>
  );
}
