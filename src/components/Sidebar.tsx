import { NavLink } from "react-router-dom";
import { Logout } from "./Logout";
import {
  CalendarDaysIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { Users } from "../pages/Users";

export function Sidebar() {
  const active =
    "py-0.5 px-1.5 bg-emerald-700/20 hover:bg-emerald-700/30 font-medium rounded-sm w-full block text-emerald-800 flex items-center";

  return (
    <div className="px-4 w-48 text-left bg-gray-50 h-full border-r border-r-gray-200 text-gray-600">
      <h1 className="px-2 py-4 font-semibold text-lg text-gray-700">
        Bookworm
      </h1>
      <ul className="flex flex-col gap-1 my-2 text-sm w-full font-medium">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? active : "px-2 w-full block"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/businesses"
            className={({ isActive }) =>
              isActive ? active : "px-2 flex items-center"
            }
          >
            <BriefcaseIcon className="size-6 pr-2" />
            <span>Businesses</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/locations"
            className={({ isActive }) =>
              isActive ? active : "px-2 flex items-center"
            }
          >
            <BuildingOfficeIcon className="size-6 pr-2" />
            <span>Locations</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reservations"
            className={({ isActive }) =>
              isActive ? active : "px-2 flex items-center"
            }
          >
            <CalendarDaysIcon className="size-6 pr-2" />
            <span>Reservations</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? active : "px-2 flex items-center"
            }
          >
            <UsersIcon className="size-6 pr-2" />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? active : "px-2 flex items-center"
            }
          >
            <UserIcon className="size-6 pr-2" />
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
      <Logout />
    </div>
  );
}
