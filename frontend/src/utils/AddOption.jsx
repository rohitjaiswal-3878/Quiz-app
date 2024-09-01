import React from "react";

// Add option button in quiz creation.
function AddOption({ handleClick }) {
  return (
    <button className="add-option-btn" onClick={handleClick}>
      Add option
    </button>
  );
}

export default AddOption;
