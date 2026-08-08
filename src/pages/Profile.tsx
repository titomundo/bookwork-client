import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";

type User = {
  id: string | null;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean | null;
  email: string | null;
};

export function Profile() {
  const [user, setUser] = useState<User>();
  const isAuthenticated = useAuth();
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
    <div>
      <h1>User Profile</h1>
      {user ? (
        <dl>
          <div className="flex gap-2">
            <dt>User: </dt>
            <dd>{`${user.first_name} ${user.last_name}`}</dd>
          </div>
          <div className="flex gap-2">
            <dt>E-mail: </dt>
            <dd>{user.email}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Role: </dt>
            <dd>{user.is_admin ? "Admin" : "Employee"}</dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}
