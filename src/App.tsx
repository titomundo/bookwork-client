import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/Layout";

import "./App.css";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { Businesses } from "./pages/Businesses";
import { Reservations } from "./pages/Reservations";
import { Locations } from "./pages/Locations";
import { Users } from "./pages/Users";
import { CreateBusinesses } from "./pages/CreateBusiness";
import { CreateLocation } from "./pages/CreateLocation";
import { CreateReservation } from "./pages/CreateReservation";
import { EditReservation } from "./pages/EditReservation";
import { EditLocation } from "./pages/EditLocation";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route path="" element={<Dashboard />}></Route>
            </Route>

            <Route path="/profile" element={<ProtectedRoute />}>
              <Route path="" element={<Profile />}></Route>
            </Route>

            <Route path="/businesses" element={<ProtectedRoute />}>
              <Route path="" element={<Businesses />}></Route>
            </Route>
            <Route path="/businesses/new" element={<ProtectedRoute />}>
              <Route path="" element={<CreateBusinesses />}></Route>
            </Route>

            <Route path="/locations" element={<ProtectedRoute />}>
              <Route path="" element={<Locations />}></Route>
            </Route>
            <Route path="/locations/new" element={<ProtectedRoute />}>
              <Route path="" element={<CreateLocation />}></Route>
            </Route>
            <Route path="/locations/edit" element={<ProtectedRoute />}>
              <Route path="" element={<EditLocation/>}></Route>
            </Route>

            <Route path="/reservations" element={<ProtectedRoute />}>
              <Route path="" element={<Reservations />}></Route>
            </Route>
            <Route path="/reservations/new" element={<ProtectedRoute />}>
              <Route path="" element={<CreateReservation />}></Route>
            </Route>
            <Route path="/reservations/edit" element={<ProtectedRoute />}>
              <Route path="" element={<EditReservation />}></Route>
            </Route>

            <Route path="/users" element={<ProtectedRoute />}>
              <Route path="" element={<Users />}></Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
