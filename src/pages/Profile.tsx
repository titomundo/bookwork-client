import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";
import { TitleBar } from "../components/TitleBar";
import type { User } from "../lib/definitions";

export function Profile() {
  const [user, setUser] = useState<User>();
  const { isAuthenticated } = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchData() {
      await fetch("http://127.0.0.1:5000/api/v1/users/profile", {
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

          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token]);

  return (
    <>
      <TitleBar title="Profile" />
      {user ? (
        <div className="flex justify-center">
          <div className="w-lg my-4 text-left flex flex-col gap-2 text-sm bg-white shadow p-4 rounded-md">
            <ul>
              <li>
                <span className="font-semibold">Username: </span>
                {`${user.first_name} ${user.last_name}`}
              </li>
              <li>
                <span className="font-semibold">E-mail: </span>
                {user.email}
              </li>
              <li>
                <span className="font-semibold">Role: </span>
                {user.is_admin ? "Admin" : "Employee"}
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
