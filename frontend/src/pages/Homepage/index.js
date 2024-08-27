import React, { useEffect } from "react";
import "./index.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyModal from "../../components/MyModal";
import CreateQuiz from "../../components/CreateQuiz";

function Homepage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({
    dashboard: location.pathname == "/homepage/dashboard" ? true : false,
    analytics: location.pathname == "/homepage/analytics" ? true : false,
    createQuiz: false,
  });

  // Handles button click
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
      setSelected({
        dashboard: false,
        analytics: false,
        createQuiz: true,
      });
      setShowModal(true);
    }
  };

  // Checks for token
  useEffect(() => {
    console.log("yes");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, []);

  // Quiz modal
  const onClose = () => {
    setShowModal(false);
    setSelected({
      dashboard: location.pathname == "/homepage/dashboard" ? true : false,
      analytics: location.pathname == "/homepage/analytics" ? true : false,
      createQuiz: false,
    });
  };
  const createQuiz = (
    <MyModal onClose={onClose}>
      <CreateQuiz onClose={onClose} />
    </MyModal>
  );

  return (
    <div className="homepage-container">
      {/* Menu */}
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
      {/* Container */}
      <div className="homepage-body">
        <Outlet context={[selected, setSelected]} />
        {showModal && createQuiz}
      </div>
    </div>
  );
}

export default Homepage;
