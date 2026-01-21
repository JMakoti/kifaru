import { Outlet } from "react-router-dom";
import AppSidebar from "./appsidebar";
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
