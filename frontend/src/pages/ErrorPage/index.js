import React from "react";
import "./index.css";

function ErrorPage() {
  return (
    <div
      className="homepage-container"
      style={{
        color: "rgba(0,0,0,0.2)",
      }}
    >
      {/* Menu */}
      <div className="homepage-menu">
        <h1
          className="homepage-menu-heading"
          style={{
            color: "rgba(0,0,0,0.2)",
          }}
        >
          Quizzie
        </h1>
        <ul className="homepage-menu-options">
          <li
            style={{
              color: "rgba(0,0,0,0.2)",
            }}
          >
            Dashboard
          </li>
          <li
            style={{
              color: "rgba(0,0,0,0.2)",
            }}
          >
            Analytics
          </li>
          <li
            style={{
              color: "rgba(0,0,0,0.2)",
            }}
          >
            Create Quiz
          </li>
        </ul>
        <div className="homepage-menu-logout">
          <div className="line"></div>
          <span>Logout</span>
        </div>
      </div>
      {/* Container */}
      <div className="homepage-body">
        <div className="error-body">
          <h1>404</h1>
          <span>Page not found</span>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
