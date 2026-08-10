import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { NavLink } from "react-router-dom";

export function CreateBusinesses() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;

  async function createBusiness(e) {
    e.preventDefault();
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
      <TitleBar title="Create new businesses" />
      <div className="px-4 text-left">
        <div className="my-4 text-xs">
          <NavLink
            to="/businesses/"
            className="bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-700 font-medium rounded-md py-0.5 px-2"
          >
            Return to list
          </NavLink>
        </div>
        <form
          className="w-lg my-4 text-left flex flex-col gap-2 text-sm "
          onSubmit={createBusiness}
        >
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
            className="bg-sky-500/30 hover:bg-sky-500/40 text-sky-700 font-medium rounded-md py-0.5 px-2 mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
