import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import type { User } from "../lib/definitions";
import { jwtDecode } from "jwt-decode";

export function Users() {
  const [users, setUsers] = useState<Array<User>>([]);
  const { isAuthenticated } = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const navigate = useNavigate();

  if (token) {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (role !== "Admin") {
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    async function fetchData() {
      await fetch("http://127.0.0.1:5000/api/v1/users/", {
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

          setUsers(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token]);

  console.log(users);

  return (
    <>
      <TitleBar title="Users" />
      <div className="px-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {users.map((e) => (
            <div
              className="text-xs bg-white shadow px-4 py-4 rounded-md text-left flex flex-col gap-2"
              key={e.id}
            >
              <div className="text-gray-600">
                <ul>
                  <li>
                    <span className="font-semibold">Name: </span>
                    {e.first_name + " " + e.last_name}
                  </li>
                  <li>
                    <span className="font-semibold">E-mail: </span>
                    {e.email}
                  </li>
                  <li>
                    <span className="font-semibold">Role: </span>
                    {e.role}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
