import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Profile } from "./components/Profile";
import { Layout } from "./components/Layout";

import "./App.css";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { Dashboard } from "./components/Dashboard";

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
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
