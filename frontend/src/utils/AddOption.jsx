import React from "react";

function AddOption({ handleClick }) {
  return (
    <button className="add-option-btn" onClick={handleClick}>
      Add option
    </button>
  );
}

export default AddOption;
