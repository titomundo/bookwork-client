import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import type { Reservation } from "../lib/definitions";
import { _Link } from "../components/_Link";

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
    const base = " rounded-sm font-medium py-0 px-1 capitalize";
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
    <>
      <TitleBar title="Reservations" />
      <div className="px-3">
        <div className="text-left my-4 text-xs font-medium">
          <_Link text="Create new reservation" to="/reservations/new" />
        </div>
        <div className="flex gap-2 text-left my-4 text-xs font-medium">
          <input
            id="startDate"
            name="startDate"
            type="date"
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="border border-gray-200 bg-white rounded-md py-0.5 px-2"
          />
          <span className="py-1 font-semibold">to</span>
          <input
            id="endDate"
            name="endDate"
            type="date"
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="border border-gray-200 bg-white rounded-md py-0.5 px-2"
          />
          <button
            className="bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-700 rounded-md py-0.5 px-2"
            onClick={clearDate}
          >
            Clear filter
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {reservations
            .filter((e) => filterDate(e.date))
            .map((e) => (
              <div
                className="text-xs bg-white shadow px-4 py-4 rounded-md text-left flex flex-col gap-2"
                key={e.id}
              >
                <div className="flex-1 flex items-center text-gray-600 font-bold">
                  <h3 className="text-base font-semibold flex-1">
                    {format(e.date, "dd-MM-yyyy@hh:mm aaaa")}
                  </h3>
                  <div className="float-right">
                    <p className={getStatus(e.status)}>{e.status}</p>
                  </div>
                </div>
                <ul className="text-gray-600">
                  <li>
                    <span className="font-semibold">Location: </span>
                    {e.location.name}
                  </li>
                  <li>
                    <span className="font-semibold">Reason: </span>
                    {e.reason}
                  </li>
                  <li>
                    <span className="font-semibold">Slot: </span>
                    <span>{e.slot}</span>
                  </li>
                  <li>
                    <span className="font-semibold">Client: </span>
                    <span>{e.client_name}</span>
                  </li>
                </ul>
                <NavLink
                  to="/reservations/edit"
                  state={e}
                  className="bg-teal-600/20 hover:bg-teal-600/30 text-teal-700 font-medium rounded-md py-1 text-center w-full block"
                >
                  Edit
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
