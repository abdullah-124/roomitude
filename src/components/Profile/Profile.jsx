// pages/Profile.jsx
import { NavLink, Outlet } from "react-router";
import Sidebar from "./Sidebar";

export default function Profile() {
  return (
    <div className="flex md:flex-row flex-col min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <main className="flex-1 padding ">
        <Outlet />
      </main>
    </div>
  );
}
