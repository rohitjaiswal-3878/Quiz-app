import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { getQuizData } from "../../apis/quiz";
import Question from "../../components/Question";
import { storeResult } from "../../apis/result";

function TakeTest() {
  const { id } = useParams(); // Gets the id from url.
  const [quizData, setQuizData] = useState({}); // State to store the quiz data.
  const [error, setError] = useState(); // State to store the error.
  const [resultId, setResultId] = useState(""); // State to store the result ID in which result are stored.
  const runOnce = useRef(true); // Allows the useEffect to run only once.

  // Fetching the quiz details.
  useEffect(() => {
    if (runOnce.current) {
      runOnce.current = false;
      getQuizData(id)
        .then((res) => {
          if (res.status == 200) {
            if (res.data != null) {
              setQuizData(res.data);
              storeResult({
                quizId: res.data._id,
                userId: res.data.userId,
                type: res.data.type,
                questions: [],
              })
                .then((data) => {
                  setResultId(data);
                })
                .catch((err) => console.log(err));
            } else {
              setError("404 Not found!");
            }
          } else {
            setError("404 Not found!");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="test-container">
      {Object.keys(quizData) != 0 ? (
        // Question container.
        <div className="test-questions">
          <Question
            questions={quizData.questions}
            quizData={quizData}
            resultId={resultId}
          />
        </div>
      ) : error ? (
        // Error 404
        <div className="test-error">
          <span className="error-404">404</span>
          <span>Page not found!</span>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default TakeTest;
