import { TitleBar } from "../components/TitleBar";
import { useAuth } from "../utils/AuthContext";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { _Link } from "../components/_Link";
import type { Location } from "../lib/definitions";

export function Locations() {
  const [locations, setLocations] = useState<Array<Location>>([]);
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchData() {
      await fetch("http://127.0.0.1:5000/api/v1/locations/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg) {
            console.log("Invalid credentials");
            return;
          }

          setLocations(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token]);

  return (
    <>
      <TitleBar title="Locations" />
      <div className="px-3">
        <div className="text-left my-4 text-xs font-medium">
          <_Link text="Create new location" to="/locations/new" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {locations.map((e) => (
            <div
              className="text-xs bg-white shadow px-4 py-4 rounded-md text-left flex flex-col gap-2"
              key={e.id}
            >
              <div className="text-gray-600">
                <ul>
                  <li>
                    <span className="font-semibold">Location name: </span>
                    {e.name}
                  </li>
                  <li>
                    <span className="font-semibold">Description: </span>
                    {e.description}
                  </li>
                  <li>
                    <span className="font-semibold">Capacity: </span>
                    {e.capacity}
                  </li>
                </ul>
              </div>
              <div className="my-1">
                <NavLink
                  to="/locations/edit"
                  state={e}
                  className="bg-teal-600/20 hover:bg-teal-600/30 text-teal-700 font-medium rounded-md py-1 text-center w-full block"
                >
                  Edit
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
