import { NavLink } from "react-router-dom";
import { Logout } from "./Logout";
import {
  CalendarDaysIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

export function Sidebar() {
  const active = "bg-emerald-700/20 hover:bg-emerald-700/30 text-emerald-800";
  const base = " py-0.5 px-1.5 flex items-center rounded-sm";

  function getClass(isActive: boolean) {
    return isActive ? active + base : base;
  }

  return (
    <div className="px-4 w-48 text-left bg-gray-100 h-full border-r border-r-gray-200 text-gray-600">
      <div className="flex flex-col h-full py-3">
        <h1 className="text-center px-2 font-semibold text-lg text-gray-700">
          Bookworm
        </h1>
        <ul className="flex-1 flex flex-col gap-1 my-6 text-sm w-full font-medium">
          <li>
            <NavLink
              to="/businesses"
              className={({ isActive }) => getClass(isActive)}
            >
              <BriefcaseIcon className="size-6 pr-2" />
              <span>Businesses</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/locations"
              className={({ isActive }) => getClass(isActive)}
            >
              <BuildingOfficeIcon className="size-6 pr-2" />
              <span>Locations</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reservations"
              className={({ isActive }) => getClass(isActive)}
            >
              <CalendarDaysIcon className="size-6 pr-2" />
              <span>Reservations</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => getClass(isActive)}
            >
              <UserIcon className="size-6 pr-2" />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
        <Logout />
      </div>
    </div>
  );
}
