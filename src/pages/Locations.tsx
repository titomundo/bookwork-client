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
        <div className="flex gap-3 w-full">
          {locations.map((e) => (
            <div
              className="text-sm bg-gray-100 border border-gray-200 px-3 py-3 rounded-md text-left"
              key={e.id}
            >
              <h3 className="font-semibold">{e.name}</h3>
              <p>{`Description: ${e.description}`}</p>
              <p>{`Capacity: ${e.capacity}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
