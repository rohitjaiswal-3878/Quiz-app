import React from "react";
import "./index.css";
import { useState } from "react";
import Signup from "../../components/Signup";
import Login from "../../components/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Authentication() {
  const navigate = useNavigate();
  const location = useLocation();

  const [toggleBtn, setToggleBtn] = useState({
    signUp: true,
    login: false,
  });

  // Handle toggle of signup and login button
  const handleToggle = (e) => {
    e.preventDefault();
    if (e.target.innerText == "Sign Up") {
      setToggleBtn({ signUp: true, login: false });
    } else {
      setToggleBtn({ signUp: false, login: true });
    }
  };

  // If token exists redirect to dashboard page.
  useEffect(() => {
    if (location.state != null) {
      if (location.state.Logout) toast.success("Logged out successfully!");
    }
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/homepage");
    }
  }, []);

  return (
    <div className="authentication">
      <div className="auth-container">
        <h1>Quizzie</h1>
        <div className="auth-toggle">
          <div
            className={`auth-signup-btn btn ${
              toggleBtn.signUp && " btn-selected"
            }`}
            onClick={handleToggle}
          >
            Sign Up
          </div>
          <div
            className={`auth-login-btn btn ${
              toggleBtn.login && " btn-selected"
            }`}
            onClick={handleToggle}
          >
            Log In
          </div>
        </div>
        {toggleBtn.signUp ? <Signup setToggleBtn={setToggleBtn} /> : <Login />}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Authentication;
