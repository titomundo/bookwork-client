import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getFormErrors } from "../lib/getFormErrors";
import { _Link } from "../components/_Link";
import type { FormError } from "../lib/definitions";

export function EditBusiness() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const business = useLocation().state;
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Array<FormError>>([]);

  const [name, setName] = useState(business.name);
  const [description, setDescription] = useState(business.description);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setErrors([]);

    const data = {
      name,
      description,
    };
    console.log(data);
    await fetch(`http://127.0.0.1:5000/api/v1/businesses/${business.id}`, {
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
        navigate("/businesses");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <TitleBar title="Edit reservation" />
      <div className="px-4 text-left">
        <div className="my-4 text-xs">
          <_Link text="Return to list" to="/businesses/" />
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
            <h3 className="text-base font-semibold">Edit Business</h3>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="name">
                Business name:
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="description">
                Description:
              </label>
              <textarea
                name="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50 resize-none"
                rows={2}
                required
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
