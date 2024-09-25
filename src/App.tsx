import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/Login/ProtectedRoute";
import { loginSuccess } from "./store/authSlice";
import { useDispatch } from "react-redux";
import Layout from "./Components/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyBio from "./Components/MyBio";
import DashboardLayout from "./pages/userList/DashboardLayout";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(loginSuccess(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<DashboardLayout />} />}
          />

          <Route path="/" element={<MyBio />} />

          <Route
            path="/my-bio"
            element={<ProtectedRoute element={<MyBio />} />}
          />
          <Route path="*" element={<ProtectedRoute element={<MyBio />} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
