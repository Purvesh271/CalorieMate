import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});

// attach token automatically
client.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // check auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  // REGISTER
    const handleRegister = async (
        name,
        email,
        password,
        currentWeight,
        targetWeight
        ) => {
        try {
            const res = await client.post("/register", {
            name,
            email,
            password,
            currentWeight,
            targetWeight,
            });

            if (res.status === httpStatus.CREATED) {
            navigate("/login");
            return res.data.message;
            }
        } catch (err) {
            console.error("REGISTER ERROR:", err.response?.data || err.message);
            throw new Error(
            err.response?.data?.message || "Registration failed"
            );
        }
    };


  // LOGIN
  const handleLogin = async (email, password) => {
    try {
      const res = await client.post("/login", { email, password });

      if (res.status === httpStatus.OK) {
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (err) {
      throw err;
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  // DASHBOARD / PROFILE
  const getUserProfile = async () => {
    try {
      const res = await client.get("/getUserProfile");
      setUserData(res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // NUTRITION HISTORY
  const getNutritionHistory = async () => {
    try {
      const res = await client.get("/get_all_activity");
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const value = {
    userData,
    isAuthenticated,
    handleRegister,
    handleLogin,
    handleLogout,
    getUserProfile,
    getNutritionHistory,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);