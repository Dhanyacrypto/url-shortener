import "./Auth.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);

      setMessage("✅ Registration Successful! Redirecting...");

      setTimeout(() => {
  navigate("/");
}, 1500);

    } catch (error) {
      setMessage(
  error.response?.data?.message ||
  "❌ Registration Failed"
);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">🔗</div>

        <h1 className="brand">URLForge</h1>

        <p className="tagline">
          Create your account and start managing
          links smarter.
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
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

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
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/"> Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;