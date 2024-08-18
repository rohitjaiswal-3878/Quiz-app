import { useState } from "react";
import "./index.css";

function CreateQuiz({ onClose }) {
  const [createQuiz, setCreateQuiz] = useState({
    quizName: "",
    quizType: "",
  });

  const [createQuizErrors, setCreateQuizErrors] = useState("");

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
  };

  const selectQuizType = (
    <>
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
      <div className="quiz-buttons">
        <button className="quiz-cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button className="quiz-continue-btn" onClick={handleSubmit}>
          Continue
        </button>
      </div>
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
    </>
  );
  return <div className="create-container">{selectQuizType}</div>;
}

export default CreateQuiz;
