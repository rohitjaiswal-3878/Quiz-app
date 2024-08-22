import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { getQuizData } from "../../apis/quiz";
import Question from "../../components/Question";

function TakeTest() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState({});

  // Fetching the quiz details
  useEffect(() => {
    getQuizData(id)
      .then((data) => setQuizData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="test-container">
      {Object.keys(quizData) != 0 ? (
        <div className="test-questions">
          <Question questions={quizData.questions} />
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default TakeTest;
