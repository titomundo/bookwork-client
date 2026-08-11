import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { NavLink } from "react-router-dom";
import type { Business } from "../lib/definitions";

export function Businesses() {
  const [businesses, setBusinesses] = useState<Array<Business>>([]);
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchData() {
      await fetch("http://127.0.0.1:5000/api/v1/businesses/", {
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

          setBusinesses(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token]);

  return (
    <div>
      <TitleBar title="Businesses" />
      <div className="px-3">
        <div className="text-left my-4 text-xs font-medium">
          <NavLink
            to="/businesses/new"
            className="bg-sky-500/30 hover:bg-sky-500/40 text-sky-700 font-medium rounded-md py-0.5 px-2"
          >
            New Business
          </NavLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {businesses.map((e) => (
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
                    <dt className="font-semibold">E-mail:</dt>
                    <dd>{e.email}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold">Phone number:</dt>
                    <dd>{e.phone_number}</dd>
                  </div>
                </dl>
              </div>
              <div className="my-1">
                <NavLink
                  to="/businesses/edit"
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
