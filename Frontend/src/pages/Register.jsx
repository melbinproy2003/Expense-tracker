import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", formData);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Register</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input className="login-input" type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <input className="login-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="login-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input className="login-input" type="password" name="cpassword" placeholder="Conform Password" onChange={handleChange} required />
          <button className="login-button" type="submit">Register</button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
