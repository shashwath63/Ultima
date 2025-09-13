import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
    const ProtectedRoute = ({ children }) => {
        const isAuth = localStorage.getItem("authToken");
        return isAuth ? children : <Navigate to="/login" />;
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
    );
}

export default App;