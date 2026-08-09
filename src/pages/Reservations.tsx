import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { format } from "date-fns";

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
            className="bg-sky-700/30 hover:bg-sky-700/40 text-sky-800 font-medium rounded-md py-0.5 px-2"
            onClick={clearDate}
          >
            Clear filter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
          {reservations
            .filter((e) => filterDate(e.date))
            .map((e) => {
              const date = new Date(e.date);

              return (
                <div
                  className="text-xs border border-gray-200 px-3 py-3 rounded-md text-right flex gap-1"
                  key={e.id}
                >
                  <div>
                    <h3 className="font-semibold">
                      {format(date, "dd-MM-yyyy")}
                    </h3>
                    <h3 className="font-semibold">
                      {format(date, "hh:mm aaaa")}
                    </h3>
                  </div>
                  <dl>
                    <div className="flex gap-1">
                      <dt className="text-right font-semibold">Client:</dt>
                      <dd>{e.client_name}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-right font-semibold">Reason:</dt>
                      <dd>{e.reason}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-right font-semibold">Status:</dt>
                      <dd>{e.status}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-right font-semibold">Slot:</dt>
                      <dd>{e.slot}</dd>
                    </div>
                  </dl>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
