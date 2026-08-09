import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="w-full flex flex-col h-screen">
      {/* <Header /> */}
      <main className="flex w-full flex-1 text-gray-700">
        <div className="flex-none">
          <Sidebar />
        </div>
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
