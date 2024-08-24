import React from "react";
import "./index.css";
import TrendingQuiz from "../../utils/TrendingQuiz";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-heading">
          <div className="dashboard-head-info total-quiz-created">
            <span>
              <span>12</span> Quiz <br />
              Created
            </span>
          </div>
          <div className="dashboard-head-info questions-created">
            <span>
              <span>110</span> Questions
              <br /> Created
            </span>
          </div>
          <div className="dashboard-head-info total-impressions">
            <span>
              <span>1.4k</span> Total
              <br /> Impressions
            </span>
          </div>
        </div>
        <div className="dashboard-trending-quiz">
          <div className="dashboard-trending-container">
            <h6>Trending Quizs</h6>
            <div className="trending">
              <div className="trending-quizes">
                <TrendingQuiz />
                <TrendingQuiz />
                <TrendingQuiz />
                <TrendingQuiz />
                <TrendingQuiz />
                <TrendingQuiz />
                <TrendingQuiz />
                <TrendingQuiz />
                <TrendingQuiz />
                <TrendingQuiz />
                <TrendingQuiz />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
