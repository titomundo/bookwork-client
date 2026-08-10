import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";

interface Reservation {
  id: string;
  client_name: string;
  date: string;
  slot: number;
  reason: string;
  status: string;
  user_id: string;
  location_id: string;
}

export function Reservations() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  function filterDate(date: string) {
    const current = new Date(date);

    if (!startDate || !endDate) {
      return true;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= current && end >= current;
  }

  function clearDate() {
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    setStartDate(null);
    setEndDate(null);
  }

  function getStatus(status: string) {
    const base = " rounded-md font-medium py-0 px-2 capitalize";
    switch (status) {
      case "pending":
        return "bg-green-500/30 hover:bg-green-500/40 text-green-700" + base;
      case "ongoing":
        return "bg-amber-500/30 hover:bg-amber-500/40 text-amber-600" + base;
      case "closed":
        return "bg-stone-500/30 hover:bg-stone-500/40 text-stone-600" + base;
      case "cancelled":
        return "bg-red-500/30 hover:bg-red-500/40 text-red-500" + base;
      default:
        return "";
    }
  }

  useEffect(() => {
    async function fetchData() {
      await fetch("http://127.0.0.1:5000/api/v1/reservations/", {
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

          setReservations(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token]);

  return (
    <div>
      <TitleBar title="Reservations" />
      <div className="px-3">
        <div className="text-left my-4 text-xs font-medium">
          <NavLink
            to="/reservations/new"
            className="bg-sky-500/30 hover:bg-sky-500/40 text-sky-700 rounded-md py-0.5 px-2"
          >
            New Reservation
          </NavLink>
        </div>
        <div className="flex gap-2 text-left my-4 text-xs font-medium">
          <input
            id="startDate"
            name="startDate"
            type="date"
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="border border-gray-200 rounded-md py-0.5 px-2"
          />
          <span className="py-1 font-semibold">to</span>
          <input
            id="endDate"
            name="endDate"
            type="date"
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="border border-gray-200 rounded-md py-0.5 px-2"
          />
          <button
            className="bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-700 rounded-md py-0.5 px-2"
            onClick={clearDate}
          >
            Clear filter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
          {reservations
            .filter((e) => filterDate(e.date))
            .map((e) => (
              <div
                className="text-xs border border-gray-200 px-3 py-3 rounded-md text-left flex gap-1 md:flex-row flex-col"
                key={e.id}
              >
                <div className="flex-1">
                  <h3 className="text-base font-semibold">
                    {format(e.date, "dd-MM-yyyy | hh:mm aaaa")}
                  </h3>
                  <dl>
                    <div className="flex gap-2">
                      <dt className="font-semibold">Client:</dt>
                      <dd>{e.client_name}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold">Reason:</dt>
                      <dd>{e.reason}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold">Status:</dt>
                      <dd className={getStatus(e.status)}>{e.status}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold">Slot:</dt>
                      <dd>{e.slot}</dd>
                    </div>
                  </dl>
                </div>
                <div className="grid grid-row-2 xs:grid-cols-2 gap-1 p-0.5">
                  <button className="bg-lime-600/30 hover:bg-lime-600/40 text-lime-700 font-medium rounded-md py-0.5 px-6">
                    Edit
                  </button>
                  <button className="bg-stone-600/30 hover:bg-stone-600/40 text-stone-600 font-medium rounded-md py-0.5 px-6">
                    Close 
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
