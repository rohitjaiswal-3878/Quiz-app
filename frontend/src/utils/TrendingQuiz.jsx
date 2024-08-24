import React from "react";
import impressionIcon from "../assets/impression-icon.png";

function TrendingQuiz() {
  return (
    <div className="trending-quiz">
      <div className="trending-quiz-heading">
        <h6>Quiz 1</h6>
        <p>
          <span>667</span>
          <img src={impressionIcon} alt="impression icon" />
        </p>
      </div>
      <span className="trending-quiz-created-date">
        Created at : 04 Sep, 2023
      </span>
    </div>
  );
}

export default TrendingQuiz;
