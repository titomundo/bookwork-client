import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Location } from "../lib/definitions";

export function CreateReservation() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const [locations, setLocations] = useState<Array<Location>>([]);
  const navigate = useNavigate();

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
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then((data) => setLocations(data))
        .catch((error) => {
          console.log(error.message);
        });
    }
    fetchData();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    await fetch("http://127.0.0.1:5000/api/v1/reservations/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        client_name: formData.get("client_name"),
        reason: formData.get("reason"),
        slot: parseInt(formData.get("slot"), 10),
        date: formData.get("date"),
        status: formData.get("status"),
        location_id: formData.get("location_id"),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        navigate("/reservations");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <TitleBar title="Create new reservation" />
      <div className="px-4 text-left">
        <div className="my-4 text-xs">
          <NavLink
            to="/reservations/"
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
            <label className="font-medium ml-0.5" htmlFor="client_name">
              Client name:
            </label>
            <input
              type="text"
              name="client_name"
              placeholder="Client Name"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium ml-0.5" htmlFor="location_id">
              Location:
            </label>
            <select
              name="location_id"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50 resize-none"
              required
            >
              {locations.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-medium ml-0.5" htmlFor="date">
              Date and Time:
            </label>
            <input
              type="datetime-local"
              name="date"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium ml-0.5" htmlFor="slot">
              Slot:
            </label>
            <input
              type="number"
              name="slot"
              max={100}
              min={1}
              placeholder="Slot"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium ml-0.5" htmlFor="reason">
              Reason:
            </label>
            <textarea
              name="reason"
              placeholder="Reason"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50 resize-none"
              rows={2}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium ml-0.5" htmlFor="status">
              Status:
            </label>
            <select
              name="status"
              className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50 resize-none"
              required
            >
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
            </select>
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
