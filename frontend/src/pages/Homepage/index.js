import React, { useEffect } from "react";
import "./index.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState({
    dashboard: location.pathname == "/homepage/dashboard" ? true : false,
    analytics: location.pathname == "/homepage/analytics" ? true : false,
    createQuiz: location.pathname == "/homepage/create" ? true : false,
  });

  const handleButtonClick = (e) => {
    const text = e.target.innerText;

    if (text == "Dashboard") {
      navigate("/homepage/dashboard");
      setSelected({
        dashboard: true,
        analytics: false,
        createQuiz: false,
      });
    } else if (text == "Analytics") {
      navigate("/homepage/analytics");
      setSelected({
        dashboard: false,
        analytics: true,
        createQuiz: false,
      });
    } else if (text == "Create Quiz") {
      navigate("/homepage/create");
      setSelected({
        dashboard: false,
        analytics: false,
        createQuiz: true,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, []);

  return (
    <div className="homepage-container">
      <div className="homepage-menu">
        <h1 className="homepage-menu-heading">Quizzie</h1>
        <ul className="homepage-menu-options">
          <li
            className={selected.dashboard ? "selected" : ""}
            onClick={handleButtonClick}
          >
            Dashboard
          </li>
          <li
            className={selected.analytics ? "selected" : ""}
            onClick={handleButtonClick}
          >
            Analytics
          </li>
          <li
            className={selected.createQuiz ? "selected" : ""}
            onClick={handleButtonClick}
          >
            Create Quiz
          </li>
        </ul>
        <div className="homepage-menu-logout">
          <div className="line"></div>
          <span
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </span>
        </div>
      </div>
      <div className="homepage-body">
        <Outlet />
      </div>
    </div>
  );
}

export default Homepage;