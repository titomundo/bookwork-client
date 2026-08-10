import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Business } from "../lib/definitions";

export function CreateLocation() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const [businesses, setBusinesses] = useState<Array<Business>>([]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    await fetch("http://127.0.0.1:5000/api/v1/locations/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.get("name"),
        capacity: parseInt(formData.get("capacity"), 10),
        description: formData.get("description"),
        business_id: formData.get("business_id"),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <TitleBar title="Create new location" />
      <div className="px-4 text-left">
        <div className="my-4 text-xs">
          <NavLink
            to="/locations/"
            className="bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-700 font-medium rounded-md py-0.5 px-2"
          >
            Return to list
          </NavLink>
        </div>
        <form
          className="w-lg my-4 text-left flex flex-col gap-2 text-sm "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="font-medium ml-0.5" htmlFor="name">
              Location name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium ml-0.5" htmlFor="capacity">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              max={100}
              min={1}
              placeholder="Capacity"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium ml-0.5" htmlFor="business">
              Description:
            </label>
            <select
              name="business_id"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50 resize-none"
              required
            >
              {businesses.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium ml-0.5" htmlFor="description">
              Description:
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50 resize-none"
              rows={2}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-sky-500/30 hover:bg-sky-500/40 text-sky-700 font-medium rounded-md py-0.5 px-2 mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
