import { TitleBar } from "../components/TitleBar";
import { useAuth } from "../utils/AuthContext";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
    <div>
      <TitleBar title="Locations" />
      <div className="px-3">
        <div className="text-left my-4 text-xs font-medium">
          <NavLink
            to="/locations/new"
            className="bg-sky-500/30 hover:bg-sky-500/40 text-sky-700 font-medium rounded-md py-0.5 px-2"
          >
            New Location
          </NavLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {locations.map((e) => (
            <div
              className="text-xs border border-gray-200 bg-gray-50 px-3 py-3 rounded-md text-left flex gap-1 md:flex-row flex-col"
              key={e.id}
            >
              <div className="flex-1">
                <dl>
                  <div className="flex gap-2">
                    <dt className="font-semibold">Name:</dt>
                    <dd>{e.name}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold">Description:</dt>
                    <dd>{e.description}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold">Capacity:</dt>
                    <dd>{e.capacity}</dd>
                  </div>
                </dl>
              </div>
              <div className="my-1">
                <NavLink
                  to="/locations/edit"
                  state={e}
                  className="bg-stone-600/30 hover:bg-stone-600/40 text-stone-700 font-medium rounded-md py-0.5 px-6"
                >
                  Edit
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
