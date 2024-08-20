import React from "react";
import "./index.css";
import deleteIcon from "../assets/delete.png";

function Text() {
  return (
    <div className="quiz-text">
      <input type="radio" name="questionOpt" id="quiz-text-radio" />
      <input type="text" placeholder="Text" className="quiz-text-input" />
      <img
        src={deleteIcon}
        alt="delete icon"
        style={{
          width: "12px",
          marginLeft: "5px",
          objectFit: "contain",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default Text;
