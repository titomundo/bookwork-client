import { NavLink } from "react-router-dom";
import { Logout } from "./Logout";

export function Sidebar() {
  const active =
    "py-1 px-2 bg-emerald-700/80 text-gray-100 font-semibold rounded-md";

  return (
    <div className="p-6 text-left bg-gray-100 h-full">
      <h1 className="font-semibold text-lg text-center">Bookworm</h1>
      <ul className="flex flex-col gap-3 my-8 text-sm">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? active : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/businesses"
            className={({ isActive }) => (isActive ? active : "")}
          >
            Businesses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/locations"
            className={({ isActive }) => (isActive ? active : "")}
          >
            Locations
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reservations"
            className={({ isActive }) => (isActive ? active : "")}
          >
            Reservations
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? active : "")}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? active : "")}
          >
            Users
          </NavLink>
        </li>
      </ul>
      <Logout />
    </div>
  );
}
