import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { Profile } from "./components/Profile";

import "./App.css";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

const App = () => {
  return (
    <>
      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="" element={<Dashboard />}></Route>
          </Route>
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="" element={<Profile />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
