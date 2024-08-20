import { useState } from "react";
import "./index.css";
import QAquiz from "../QAquiz";
import CancelBtn from "../../utils/CancelBtn";

function CreateQuiz({ onClose }) {
  const [createQuiz, setCreateQuiz] = useState({
    quizName: "",
    quizType: "",
  });

  const [createQuizErrors, setCreateQuizErrors] = useState("");
  const [showQuizModals, setShowQuizModals] = useState({
    qaQuiz: false,
    pollQuiz: false,
    cQuiz: true,
  });

  // handle input change.
  const handleChange = (e) => {
    if (e.target.name || e.target.value) {
      setCreateQuiz({ ...createQuiz, quizName: e.target.value });
    } else {
      setCreateQuiz({ ...createQuiz, quizType: e.target.dataset.value });
    }
  };

  // handle continue button
  const handleSubmit = (e) => {
    let err = 0;

    // error handling
    if (createQuiz.quizName == "" && createQuiz.quizType == "") {
      err++;
      setCreateQuizErrors("Quiz name and quiz type is required.");
    } else if (createQuiz.quizName == "") {
      err++;
      setCreateQuizErrors("Quiz name is required.");
    } else if (createQuiz.quizType == "") {
      err++;
      setCreateQuizErrors("Quiz type is required.");
    } else {
      setCreateQuizErrors("");
    }

    // If no error found
    if (err == 0) {
      if (createQuiz.quizType == "qa") {
        setShowQuizModals({
          qaQuiz: true,
          pollQuiz: false,
          cQuiz: false,
        });
      } else {
        setShowQuizModals({
          qaQuiz: false,
          pollQuiz: true,
          cQuiz: false,
        });
      }
    }
  };

  // JSX for adding quiz type and name.
  const selectQuizType = (
    <>
      <div className="create-quiz">
        <input
          type="text"
          placeholder="Quiz name"
          name="quizName"
          id="quiz-name"
          onChange={handleChange}
        />
        <div className="quiz-type">
          <span>Quiz Type</span>

          <span
            data-name="quizType"
            className="quiz-type-options"
            data-value="qa"
            onClick={handleChange}
            style={{
              background: `${createQuiz.quizType == "qa" ? "#60B84B" : ""}`,
              color: `${createQuiz.quizType == "qa" ? "white" : ""}`,
            }}
          >
            Q & A
          </span>
          <span
            data-name="quizType"
            className="quiz-type-options"
            data-value="poll"
            onClick={handleChange}
            style={{
              background: `${createQuiz.quizType == "poll" ? "#60B84B" : ""}`,
              color: `${createQuiz.quizType == "poll" ? "white" : ""}`,
            }}
          >
            Poll Type
          </span>
        </div>
        <CancelBtn onClose={onClose} handleSubmit={handleSubmit}>
          <span>Cancel</span>
          <span>Continue</span>
        </CancelBtn>
        <div
          className="quiz-message"
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "5px",
            fontSize: "0.8rem",
          }}
        >
          {createQuizErrors}
        </div>
      </div>
    </>
  );

  // JSX for adding questions in quiz.
  const qaQuestions = <QAquiz />;

  return (
    <div className="create-container">
      {showQuizModals.cQuiz
        ? selectQuizType
        : showQuizModals.qaQuiz
        ? qaQuestions
        : showQuizModals.pollQuiz
        ? "yes"
        : "no"}
    </div>
  );
}

export default CreateQuiz;
