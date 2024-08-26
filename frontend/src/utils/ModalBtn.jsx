import React from "react";
import "./index.css";

function ModalBtn({ onClose, handleSubmit, children, deleteType }) {
  return (
    <div className="quiz-buttons">
      <button
        className="quiz-cancel-btn"
        onClick={onClose}
        style={{
          backgroundColor: deleteType ? "#FF4B4B" : "",
          color: deleteType ? "white" : "",
        }}
      >
        {children[0]}
      </button>
      <button
        className="quiz-continue-btn"
        onClick={handleSubmit}
        style={{
          backgroundColor: deleteType ? "white" : "",
          color: deleteType ? "black" : "",
        }}
      >
        {children[1]}
      </button>
    </div>
  );
}

export default ModalBtn;
