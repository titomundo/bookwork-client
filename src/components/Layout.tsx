import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export function Layout() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <div className="w-full flex flex-col h-screen">
      {isAuthenticated ? "" : <Header />}
      <main className="flex w-full h-full flex-1 text-gray-700">
        <div className="flex-none">{isAuthenticated && <Sidebar />}</div>
        <div className="w-full h-screen overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
