import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getFormErrors } from "../lib/getFormErrors";
import type { FormError } from "../lib/definitions";
import { _Link } from "../components/_Link";

export function EditReservation() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const reservation = useLocation().state;
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Array<FormError>>([]);
  const [client_name, setClientName] = useState(reservation.client_name);
  const [reason, setReason] = useState(reservation.reason);
  const [slot, setSlot] = useState(reservation.slot);
  const [date, setDate] = useState(reservation.date);
  const [status, setStatus] = useState(reservation.status);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setErrors([]);

    const data = {
      client_name,
      reason,
      slot,
      date: date.slice(0, -3),
      status,
      location_id: reservation.location.id,
    };

    await fetch(`http://127.0.0.1:5000/api/v1/reservations/${reservation.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          console.log(data.msg);
        } else if (data.errors) {
          setErrors(getFormErrors(data.errors));
          return;
        } else if (data.error) {
          setErrors(getFormErrors([data.error]));
          return;
        }

        navigate("/reservations");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <TitleBar title="Edit reservation" />
      <div className="px-3">
        <div className="text-left my-4 text-xs font-medium">
          <_Link text="Return to list" to="/reservations/" />
        </div>
        <ul className="text-xs text-red-700">
          {errors.map((e) => (
            <li
              key={e.name}
              className="bg-red-500/30 px-1 rounded-sm w-fit mb-1"
            >
              <span>{e.name}: </span>
              {e.msg}
            </li>
          ))}
        </ul>
        <div className="flex justify-center text-gray-600">
          <form
            className="w-lg my-4 text-left flex flex-col gap-2 text-xs bg-white shadow p-4 rounded-md"
            onSubmit={handleSubmit}
          >
            <h3 className="text-base font-semibold">Edit Reservation</h3>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="client_name">
                Client name:
              </label>
              <input
                type="text"
                name="client_name"
                value={client_name}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="date">
                Date and Time:
              </label>
              <input
                value={reservation.date}
                onChange={(e) => setDate(e.target.value)}
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
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
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
                value={reason}
                onChange={(e) => setReason(e.target.value)}
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
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="closed">Closed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-700 font-medium rounded-md py-2 text-center w-full block"
            >
              Confirm changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
