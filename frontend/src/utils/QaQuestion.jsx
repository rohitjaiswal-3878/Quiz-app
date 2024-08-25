import React from "react";

function QaQuestion({ question, qno, lastQuiz }) {
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
        <div className="attempted analyze">
          <span>{question.attempted}</span>
          <p>people Attempted the question</p>
        </div>
        <div className="right analyze">
          <span>{question.right}</span>
          <p>people Answered Correctly</p>
        </div>
        <div className="wrong analyze">
          <span>{question.wrong}</span>
          <p>people Answered Incorrectly</p>
        </div>
      </div>
    </div>
  );
}

export default QaQuestion;
