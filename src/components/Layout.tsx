import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="w-full flex flex-col h-screen">
      {/* <Header /> */}
      <main className="grid grid-cols-6 w-full flex-1 text-gray-700">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5">
          <div className="h-full px-8 py-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
