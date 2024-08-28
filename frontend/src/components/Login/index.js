import React from "react";
import "./index.css";
import { useState } from "react";
import { loginUser } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState({
    message: "",
    color: "",
  });
  const [requested, setRequested] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle form input
  const handleFormInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submit
  const handleFormSubmit = async (e) => {
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

    // Submitting the form if no error found.
    if (err == 0) {
      setRequested(!requested);
      const response = await loginUser(formData);
      let msg = { message: "", color: "" };

      if (response) {
        setRequested(false);
        if (response.status == 200) {
          localStorage.setItem("token", response.headers["auth-token"]);
          localStorage.setItem("name", response.data.name);
          msg.message = response.data.message;
          msg.color = "green";
          setTimeout(() => {
            navigate("/homepage/dashboard", { state: { login: true } });
          }, 500);
        } else if (response.status == 400) {
          msg.message = response.data.message;
          msg.color = "red";
        } else if (response.status == 500) {
          msg.message = response.data.message;
          msg.color = "red";
        }
      }

      setLoginMessage(msg);
    }
  };

  // Removing the error if we click on inputs.
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
      {/* Message */}
      <div
        className="login-message"
        style={{
          color: `${loginMessage.color && loginMessage.color}`,
          marginTop: "8px",
          fontSize: "0.9rem",
        }}
      >
        {loginMessage.message}
      </div>
    </div>
  );
}

export default Login;
