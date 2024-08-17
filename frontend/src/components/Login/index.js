import React from "react";
import "./index.css";
import { useState } from "react";

function Login() {
  const [requested, setRequested] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleFormInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let err = 0;
    // email validation
    if (formData.email == "") {
      err++;
      setErrors((prev) => ({ ...prev, email: "email is required" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    // password validation
    if (formData.password == "") {
      err++;
      setErrors((prev) => ({ ...prev, password: "password is required" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (err == 0) {
      setRequested(!requested);
    }
  };

  const handleInputClick = (e) => {
    const name = e.target.name;
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleFormSubmit}>
        <table>
          <tbody>
            <tr>
              <td className="login-form-labels">
                <label htmlFor="login-email">Email</label>
              </td>
              <td className="login-form-inputs">
                <input
                  type="email"
                  name="email"
                  style={{
                    color: `${errors.email ? "red" : ""}`,
                    border: `${errors.email ? "1px solid red" : "none"}`,
                  }}
                  id="login-email"
                  value={errors.email ? errors.email : formData.email}
                  onChange={handleFormInput}
                  readOnly={errors.email ? true : false}
                  onClick={handleInputClick}
                />
              </td>
            </tr>
            <tr>
              <td className="login-form-labels">
                <label htmlFor="login-password">Password</label>
              </td>
              <td className="login-form-inputs">
                <input
                  type={errors.password ? "text" : "password"}
                  name="password"
                  id="login-password"
                  style={{
                    color: `${errors.password ? "red" : ""}`,
                    border: `${errors.password ? "1px solid red" : "none"}`,
                  }}
                  value={errors.password ? errors.password : formData.password}
                  onChange={handleFormInput}
                  readOnly={errors.password ? true : false}
                  onClick={handleInputClick}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="login-btn"
          type="submit"
          disabled={requested ? true : false}
        >
          {requested ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <div className="loader" style={{ display: "inline-block" }}></div>
              <span>please wait...</span>
            </div>
          ) : (
            "Log In"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
