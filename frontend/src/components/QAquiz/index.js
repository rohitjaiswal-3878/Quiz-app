import React from "react";
import "./index.css";
import crossIcon from "../../assets/cross.png";
import plusIcon from "../../assets/plus.png";
import Text from "../../utils/Text";
import AddOption from "../../utils/AddOption";
import CancelBtn from "../../utils/CancelBtn";

function QAquiz() {
  return (
    <div className="qa-quiz-container">
      <div className="qa-quiz-heading">
        <div className="qa-no-of-questions">
          <ul className="qa-questions">
            <li>1</li>
            <div className="qa-question">
              <li>2</li>
              <img src={crossIcon} alt="cross" />
            </div>
          </ul>
          <img src={plusIcon} alt="plus" className="qa-plus-icon" />
        </div>
        <span className="qa-questions-limit">Max 5 questions</span>
      </div>
      <div className="qa-quiz-name-type">
        <input
          type="text"
          placeholder="Poll Question"
          id="qa-quiz-name"
          name="quesitonName"
        />
        <div className="qa-quiz-options">
          <span>Option type</span>
          <div className="qa-quiz-types">
            <div className="qa-quiz-option">
              <input type="radio" name="questionType" id="qa-option-1" />
              <label htmlFor="qa-option-1">Text</label>
            </div>
            <div className="qa-quiz-option">
              <input type="radio" name="questionType" id="qa-option-2" />
              <label htmlFor="qa-option-2">Image URL</label>
            </div>
            <div className="qa-quiz-option">
              <input type="radio" name="questionType" id="qa-option-3" />
              <label htmlFor="qa-option-3">Text & Image URL</label>
            </div>
          </div>
        </div>
      </div>
      <div className="qa-quiz-chooses">
        <div className="qa-quiz-add-option">
          <Text />
          <Text />
          <Text />

          <AddOption />
        </div>
        <div className="qa-quiz-timer">
          <span>Timer</span>
          <div className="timer">
            <span>OFF</span>
            <span>5 sec</span>
            <span>10 sec</span>
          </div>
        </div>
      </div>
      <CancelBtn>
        <span>Cancel</span>
        <span>Create Quiz</span>
      </CancelBtn>
    </div>
  );
}

export default QAquiz;
