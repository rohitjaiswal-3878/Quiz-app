import React from "react";
import "./index.css";
import { useState } from "react";
import toolTip from "../../assets/tool-tip.png";

function Signup() {
  const [requested, setRequested] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = 0;
    // Name validation
    if (formData.name == "") {
      err++;
      setErrors((prev) => ({ ...prev, name: "name is required" }));
    } else if (!formData.name.match(/^[a-zA-Z\. ]+$/)) {
      err++;
      setErrors((prev) => ({ ...prev, name: "Invalid name" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }

    // Email validation
    if (formData.email == "") {
      err++;

      setErrors((prev) => ({ ...prev, email: "email is required" }));
    } else if (
      !formData.email.match(
        /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
      )
    ) {
      err++;

      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    // Password validation
    if (formData.password == "") {
      err++;

      setErrors((prev) => ({
        ...prev,
        password: "password is required",
      }));
    } else if (
      !formData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      err++;

      if (formData.password.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "atleast 8 characters",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "Weak password",
        }));
      }
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    // confirm password validation
    if (formData.confirmPassword == "") {
      err++;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "confirm password is required",
      }));
    } else if (formData.confirmPassword != formData.password) {
      err++;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "password doesn't match",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
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
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td className="signup-form-labels">
                {" "}
                <label htmlFor="signup-name">Name</label>
              </td>
              <td className="signup-form-inputs">
                {" "}
                <input
                  type="text"
                  name="name"
                  id="signup-name"
                  style={{
                    color: `${errors.name ? "red" : ""}`,
                    border: `${errors.name ? "1px solid red" : "none"}`,
                  }}
                  value={errors.name ? errors.name : formData.name}
                  onChange={handleFormChange}
                  readOnly={errors.name ? true : false}
                  onClick={handleInputClick}
                />
              </td>
            </tr>
            <tr>
              <td className="signup-form-labels">
                <label htmlFor="signup-email">Email</label>
              </td>
              <td className="signup-form-inputs">
                <input
                  type="email"
                  name="email"
                  id="signup-email"
                  style={{
                    color: `${errors.email ? "red" : ""}`,
                    border: `${errors.email ? "1px solid red" : "none"}`,
                  }}
                  value={errors.email ? errors.email : formData.email}
                  onChange={handleFormChange}
                  readOnly={errors.email ? true : false}
                  onClick={handleInputClick}
                />
              </td>
            </tr>
            <tr>
              <td className="signup-form-labels">
                <label htmlFor="signup-password">Password</label>
              </td>
              <td className="signup-form-inputs">
                <input
                  type={errors.password ? "text" : "password"}
                  name="password"
                  id="signup-password"
                  style={{
                    color: `${errors.password ? "red" : ""}`,
                    border: `${errors.password ? "1px solid red" : "none"}`,
                  }}
                  value={errors.password ? errors.password : formData.password}
                  onChange={handleFormChange}
                  readOnly={errors.password ? true : false}
                  onClick={handleInputClick}
                />

                <div className="tooltip" id="signup-tool-tip">
                  <img src={toolTip} alt="tooltip" />
                  <span className="tooltiptext">
                    Password length should be atleast 8 characters and must
                    contain atleast one uppercase letter,one lowercase
                    letter,one number, and one special character.
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="signup-form-labels">
                <label htmlFor="signup-confirm-password">
                  Confirm password
                </label>
              </td>
              <td className="signup-form-inputs">
                <input
                  type={errors.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="signup-confirm-password"
                  style={{
                    color: `${errors.confirmPassword ? "red" : ""}`,
                    border: `${
                      errors.confirmPassword ? "1px solid red" : "none"
                    }`,
                  }}
                  value={
                    errors.confirmPassword
                      ? errors.confirmPassword
                      : formData.confirmPassword
                  }
                  onChange={handleFormChange}
                  readOnly={errors.confirmPassword ? true : false}
                  onClick={handleInputClick}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="signup-btn"
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
            "Sign-Up"
          )}
        </button>
      </form>
    </div>
  );
}

export default Signup;
