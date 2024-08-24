import React, { useEffect, useState } from "react";
import "./index.css";
import TrendingQuiz from "../../utils/TrendingQuiz";
import { getAllQuiz, getImpressions } from "../../apis/dashboard";

function Dashboard() {
  const [headingData, setHeadingData] = useState({
    quizzes: -1,
    questions: -1,
    impressions: -1,
  });
  const [trending, setTrending] = useState([]);

  // Loads the dashboard heading and trending quiz data.
  useEffect(() => {
    Promise.all([getAllQuiz(), getImpressions()]).then(
      ([quizData, impressionData]) => {
        let questions = 0;
        quizData.forEach((element) => {
          questions += element.questions.length;
        });

        setHeadingData({
          quizzes: quizData.length,
          questions,
          impressions: impressionData.totalImpressions,
        });
        setTrending([...impressionData.filteredImpression]);
      }
    );
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* total quizzes, questions and impressions */}
        <div className="dashboard-heading">
          <div className="dashboard-head-info total-quiz-created">
            {headingData.quizzes != -1 ? (
              <span>
                <span>{headingData.quizzes}</span> Quiz <br />
                Created
              </span>
            ) : (
              "Loading..."
            )}
          </div>
          <div className="dashboard-head-info questions-created">
            {headingData.questions != -1 ? (
              <span>
                <span>{headingData.questions}</span> Questions
                <br /> Created
              </span>
            ) : (
              "Loading..."
            )}
          </div>
          <div className="dashboard-head-info total-impressions">
            {headingData.impressions != -1 ? (
              <span>
                <span>
                  {headingData.impressions < 1000
                    ? headingData.impressions
                    : headingData.impressions % 1000 > 0
                    ? (headingData.impressions / 1000).toFixed(1) + "K"
                    : (headingData.impressions / 1000).toFixed(0) + "K"}
                </span>{" "}
                Total
                <br /> Impressions
              </span>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
        {/* Trending quizzes */}
        <div className="dashboard-trending-quiz">
          <div className="dashboard-trending-container">
            <h6>Trending Quizs</h6>
            {headingData.quizzes != -1 ? (
              trending.length == 0 ? (
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  No trending quiz present at current moment!
                </span>
              ) : (
                <div className="trending">
                  <div className="trending-quizes">
                    {trending.map((quiz, index) => (
                      <TrendingQuiz quiz={quiz} key={index} />
                    ))}
                  </div>
                </div>
              )
            ) : (
              <span
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  color: "rgba(0,0,0,1)",
                }}
              >
                Loading...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
