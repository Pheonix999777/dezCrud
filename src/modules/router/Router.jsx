import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes } from "react-router-dom";
import { authStore } from "../store/store";
import { Home } from "../Home/Home";
import { useEffect } from "react";
import Login from "../Auth/Login/Login";

export const Router = observer(() => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/home" />}
      />
    </Routes>
  );
});
