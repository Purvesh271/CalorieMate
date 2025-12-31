import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";
import { showError, showInfo, showSuccess } from "../utils/toast";

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

        showSuccess("Logged in successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      showError(err.response?.data?.message || "Invalid email or password");
      throw err;
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setIsAuthenticated(false);
    navigate("/");
    showInfo("Logged out successfully");
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

  // UPDATE PROFILE
  const updateUserProfile = async (updatedData) => {
    try {
      const res = await client.put("/updateProfile", updatedData);

      if (res.status === httpStatus.OK) {
        setUserData(res.data);
        return res.data;
      }
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err.response?.data || err.message);
      throw err;
    }
  };

  // NUTRITION HISTORY
  const getNutritionHistory = async () => {
    try {
      const res = await axios.get(
        `${server}/api/v1/nutrition/today`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data; // daily log object for today
    } catch (err) {
      console.error(
        "GET NUTRITION ERROR:",
        err.response?.data || err.message
      );
      throw err;
    }
  };

  // WEEKLY NUTRITION HISTORY
  const getWeeklyNutritionHistory = async () => {
    try {
      const res = await axios.get(
        `${server}/api/v1/nutrition/history/weekly`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return res.data.data; // array of daily logs for the week
    } catch (err) {
      console.error("GET WEEKLY HISTORY ERROR:", err.response?.data || err.message);
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
    updateUserProfile,
    getNutritionHistory,
    getWeeklyNutritionHistory,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);