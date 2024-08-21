import React from "react";
import "./index.css";
import deleteIcon from "../assets/delete.png";

function Text({
  handleOptionInput,
  setSelOption,
  inputValue,
  removeDelete,
  handleDelete,
  selectAnswer,
  answer,
  placeholder,
}) {
  return (
    <div className="quiz-text">
      <input
        type="radio"
        name="questionOpt"
        id="quiz-text-radio"
        onChange={selectAnswer}
        checked={answer == "right" ? true : false}
      />

      <input
        type="text"
        placeholder={
          typeof placeholder == "object" ? placeholder[0] : placeholder
        }
        className="quiz-text-input"
        onChange={handleOptionInput}
        name="text"
        value={typeof placeholder == "object" ? inputValue.text : inputValue}
        onClick={setSelOption}
        style={{
          backgroundColor: `${answer == "right" ? "#60b84b" : "white"}`,
          color: `${answer == "right" ? "white" : "black"}`,
          width: `${typeof placeholder == "object" ? "32%" : ""}`,
        }}
      />

      {typeof placeholder == "object" && (
        <input
          type="text"
          placeholder={placeholder[1]}
          className="quiz-text-input"
          onChange={handleOptionInput}
          name="imageURL"
          value={
            typeof placeholder == "object" ? inputValue.imageURL : inputValue
          }
          onClick={setSelOption}
          style={{
            backgroundColor: `${answer == "right" ? "#60b84b" : "white"}`,
            color: `${answer == "right" ? "white" : "black"}`,
            width: `${typeof placeholder == "object" ? "51%" : ""}`,
          }}
        />
      )}

      {!removeDelete && (
        <img
          onClick={handleDelete}
          src={deleteIcon}
          alt="delete icon"
          style={{
            width: "12px",
            marginLeft: "5px",
            objectFit: "contain",
            cursor: "pointer",
          }}
        />
      )}
    </div>
  );
}

export default Text;
