import React from "react";
import "./index.css";
import { useState } from "react";
import Signup from "../../components/Signup";
import Login from "../../components/Login";

function Authentication() {
  const [toggleBtn, setToggleBtn] = useState({
    signUp: true,
    login: false,
  });

  const handleToggle = (e) => {
    e.preventDefault();
    if (e.target.innerText == "Sign Up") {
      setToggleBtn({ signUp: true, login: false });
    } else {
      setToggleBtn({ signUp: false, login: true });
    }
  };

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
    </div>
  );
}

export default Authentication;
