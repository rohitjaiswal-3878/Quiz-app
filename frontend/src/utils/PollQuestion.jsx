import React from "react";
import "./index.css";

function PollQuestion({ question, qno, lastQuiz }) {
  return (
    <div
      className="qaquestion-container"
      style={{
        border: lastQuiz ? "none" : "",
      }}
    >
      <p className="qaquestion">
        Q.{qno} {question.ques}{" "}
      </p>
      <div className="qaquestion-analytics">
        <div className="poll-analyze">
          <span>{question.option1}</span>
          <p>Option 1</p>
        </div>
        <div className="poll-analyze">
          <span>{question.option2}</span>
          <p>Option 2</p>
        </div>
        <div className="poll-analyze">
          <span>{question.option3}</span>
          <p>Option 3</p>
        </div>
        <div className="poll-analyze">
          <span>{question.option4}</span>
          <p>Option 4</p>
        </div>
      </div>
    </div>
  );
}

export default PollQuestion;
