import React from "react";
import impressionIcon from "../assets/impression-icon.png";

// Trending quiz component.
function TrendingQuiz({ quiz }) {
  return (
    <div className="trending-quiz">
      <div className="trending-quiz-heading">
        <h6>
          {quiz.name.length > 9
            ? quiz.name.substring(0, 10) + "..."
            : quiz.name}
        </h6>
        <p>
          <span>{quiz.impression}</span>
          <img src={impressionIcon} alt="impression icon" />
        </p>
      </div>
      <span className="trending-quiz-created-date">
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
    </div>
  );
}

export default TrendingQuiz;
