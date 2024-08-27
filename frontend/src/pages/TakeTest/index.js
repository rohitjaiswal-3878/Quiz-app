import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { getQuizData } from "../../apis/quiz";
import Question from "../../components/Question";
import { storeResult } from "../../apis/result";

function TakeTest() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState({});
  const [error, setError] = useState();
  const [resultId, setResultId] = useState("");
  const runOnce = useRef(true);

  // Fetching the quiz details
  useEffect(() => {
    if (runOnce.current) {
      runOnce.current = false;
      getQuizData(id)
        .then((res) => {
          if (res.status == 200) {
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
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="test-container">
      {Object.keys(quizData) != 0 ? (
        <div className="test-questions">
          <Question
            questions={quizData.questions}
            quizData={quizData}
            resultId={resultId}
          />
        </div>
      ) : error ? (
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
