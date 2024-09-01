import React from "react";
import "./index.css";

// Poll question in test.
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
      <div className="pollquestion-analytics">
        {question.options.map((option, index) => (
          <div className="poll-analyze" key={index}>
            <span className="count">{question[`option${index + 1}`]}</span>
            <div
              className="poll-analyze-content"
              style={{
                justifyContent: question.qType == "text&img" ? "end" : "",
              }}
            >
              {option.text && <span>{option.text}</span>}
              {option.imageURL && (
                <div
                  className="pollquestion-img"
                  style={{
                    width: question.qType == "image" ? "100%" : "",
                    height: question.qType == "image" ? "80%" : "",
                  }}
                >
                  <img src={option.imageURL} alt="image" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PollQuestion;
