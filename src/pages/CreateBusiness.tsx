import { useAuth } from "../utils/AuthContext";
import { getFormErrors } from "../lib/getFormErrors";
import { TitleBar } from "../components/TitleBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { _Link } from "../components/_Link";

export function CreateBusinesses() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const [errors, setErrors] = useState<Array<FormError>>([]);
  const navigate = useNavigate();

  async function createBusiness(e) {
    e.preventDefault();
    setErrors([]);
    const formData = new FormData(e.target);

    await fetch("http://127.0.0.1:5000/api/v1/businesses/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.get("client_name"),
        email: formData.get("email"),
        description: formData.get("description"),
        phone_number: formData.get("phone_number"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          console.log(data.msg);
        } else if (data.errors) {
          setErrors(getFormErrors(data.errors));
          return;
        }

        navigate("/businesses");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <TitleBar title="Create new businesses" />
      <div className="px-4 text-left">
        <div className="my-4 text-xs">
          <_Link text="Return to list" to="/businesses/" />
        </div>
        <ul className="text-xs text-red-700">
          {errors.map((e) => (
            <li className="bg-red-500/30 px-1 rounded-sm w-fit mb-1">
              <span>{e.name}: </span>
              {e.msg}
            </li>
          ))}
        </ul>
        <div className="flex justify-center text-gray-600">
          <form
            className="w-lg my-4 text-left flex flex-col gap-2 text-xs bg-white shadow p-4 rounded-md"
            onSubmit={createBusiness}
          >
            <h3 className="text-base font-semibold">New Businesses</h3>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="client_name">
                Businesses name:
              </label>
              <input
                type="text"
                name="client_name"
                placeholder="Name"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="font-medium ml-0.5" htmlFor="email">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium ml-0.5" htmlFor="phone_number">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="Phone Number"
                  className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
                />
              </div>
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
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-700 font-medium rounded-md py-2 text-center w-full block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
