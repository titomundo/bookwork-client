import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";

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
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;

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
      <div className="flex gap-3 w-full">
        {reservations.map((e) => (
          <div
            className="text-sm bg-gray-100 border border-gray-200 px-3 py-3 rounded-md text-left"
            key={e.id}
          >
            <h3 className="font-semibold">{e.date}</h3>
            <p>{`Client: ${e.client_name}`}</p>
            <p>{`Reason: ${e.reason}`}</p>
            <p>{`Slot: ${e.slot}`}</p>
            <p>{`Status: ${e.status}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
