import React from "react";
import "./index.css";

function CancelBtn({ onClose, handleSubmit, children }) {
  return (
    <div className="quiz-buttons">
      <button className="quiz-cancel-btn" onClick={onClose}>
        {children[0]}
      </button>
      <button className="quiz-continue-btn" onClick={handleSubmit}>
        {children[1]}
      </button>
    </div>
  );
}

export default CancelBtn;
