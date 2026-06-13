import "./Auth.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      setMessage("✅ Login Successful!");

setTimeout(() => {
  navigate("/dashboard");
}, 1000);

    } catch (error) {
      setMessage(
  error.response?.data?.message ||
  "❌ Login Failed"
);
    }
  };

  return (
  <div className="auth-container">

    <div className="auth-card">

      <div className="logo">
        🔗
      </div>

      <h1 className="brand">
        URLForge
      </h1>

      <p className="tagline">
        Shorten. Track. Analyze.
      </p>
      {
  message && (
    <div className="auth-message">
      {message}
    </div>
  )
}

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="auth-btn"
          type="submit"
        >
          Login
        </button>

      </form>

      <div className="auth-footer">

        Don't have an account?

        <Link to="/register">
          {" "}Register
        </Link>

      </div>

    </div>

  </div>
);
}

export default Login;