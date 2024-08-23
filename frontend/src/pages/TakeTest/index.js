import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { getQuizData } from "../../apis/quiz";
import Question from "../../components/Question";
import { storeResult } from "../../apis/result";

function TakeTest() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState({});
  const [resultId, setResultId] = useState("");
  const runOnce = useRef(true);

  // Fetching the quiz details
  useEffect(() => {
    if (runOnce.current) {
      runOnce.current = false;
      getQuizData(id)
        .then((data) => {
          setQuizData(data);
          storeResult({
            quizId: data._id,
            userId: data.userId,
            type: data.type,
            questions: [],
          })
            .then((data) => {
              setResultId(data);
            })
            .catch((err) => console.log(err));
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
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default TakeTest;
