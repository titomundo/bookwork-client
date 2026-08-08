import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";

type Business = {
  id: string | null;
  name: string | null;
  email: string | null;
  description: string;
  phone_number: string | null;
};

export function Businesses() {
  const [businesses, setBusinesses] = useState<Array<Business>>([]);
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchData() {
      await fetch("http://127.0.0.1:5000/api/v1/businesses/", {
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

          setBusinesses(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token]);
  return (
    <div className="w-full h-full">
      <TitleBar title="Businesses" />
      <div className="flex gap-3 w-full">
        {businesses.map((e) => (
          <div className="text-sm bg-gray-100 border border-gray-200 px-3 py-3 rounded-md text-left" key={e.id}>
            <h3 className="font-semibold">{e.name}</h3>
            <p>{e.description}</p>
            <p>{e.email}</p>
            <p>{e.phone_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
