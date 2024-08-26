import React, { useEffect, useState } from "react";
import "./index.css";
import QaQuestion from "../../utils/QaQuestion";
import PollQuestion from "../../utils/PollQuestion";
import backIcon from "../../assets/back.png";
import { getQuizAnalytics } from "../../apis/analytics";

function QuizAnalysis({ setComponents, quiz }) {
  const [quizAnalytics, setQuizAnalytics] = useState([]);

  // Handles back click
  const handleBackClick = () => {
    setComponents({
      quizzesTable: true,
      quizAnalytics: false,
    });
  };

  // Gets all the analytics of particular quiz.
  useEffect(() => {
    getQuizAnalytics(quiz.quizId).then((data) => setQuizAnalytics(data));
  }, []);

  return (
    <div className="quiz-analysis-container">
      <img
        src={backIcon}
        alt="back icon"
        id="analysis-back-icon"
        onClick={handleBackClick}
      />
      {/* quiz name, created at, and impression */}
      <div className="quiz-analysis-heading">
        <span className="quiz-name">{quiz.name} Question Analysis</span>
        <p className="date-impression">
          <span>
            Created on :{" "}
            {new Date(quiz.created).toLocaleDateString("default", {
              month: "short",
              day: "numeric",
            })}
            ,{" "}
            {new Date(quiz.created).toLocaleDateString("default", {
              year: "numeric",
            })}
          </span>
          <span>Impressions : {quiz.impression}</span>
        </p>
      </div>

      {/* All the questions and their analytics */}
      {quizAnalytics.length != 0 ? (
        <div className="quiz-analysis-questions">
          {quizAnalytics.map((ele, index) => {
            if (ele.attempted >= 0) {
              return (
                <QaQuestion
                  key={index}
                  question={ele}
                  qno={index + 1}
                  lastQuiz={index == quizAnalytics.length - 1}
                />
              );
            } else if (ele.option1 >= 0) {
              return (
                <PollQuestion
                  key={index}
                  question={ele}
                  qno={index + 1}
                  lastQuiz={index == quizAnalytics.length - 1}
                />
              );
            }
          })}
        </div>
      ) : (
        <span style={{ fontSize: "0.3em" }}>Loading...</span>
      )}
    </div>
  );
}

export default QuizAnalysis;
