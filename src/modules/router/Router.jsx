import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../Auth/Login/Login";
import { authStore } from "../store/store";
import { Home } from "../Home/Home";
import { useEffect } from "react";

export const Router = observer(() => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    authStore.checkAuthentication();
  }, []);

  if (token) {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    );
  } else if (authStore.isAuth === false) {
    return (
      <Routes>
        <Route path="/login/*" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
});
