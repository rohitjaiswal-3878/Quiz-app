import { useState } from "react";
import "./index.css";
import QAquiz from "../QAquiz";
import CancelBtn from "../../utils/CancelBtn";

function CreateQuiz({ onClose }) {
  const [createQuiz, setCreateQuiz] = useState({
    name: "",
    type: "",
    questions: [],
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
      setCreateQuiz({ ...createQuiz, name: e.target.value });
    } else {
      setCreateQuiz({ ...createQuiz, type: e.target.dataset.value });
    }
  };

  // handle continue button
  const handleSubmit = (e) => {
    let err = 0;

    // error handling
    if (createQuiz.name == "" && createQuiz.type == "") {
      err++;
      setCreateQuizErrors("Quiz name and quiz type is required.");
    } else if (createQuiz.name == "") {
      err++;
      setCreateQuizErrors("Quiz name is required.");
    } else if (createQuiz.type == "") {
      err++;
      setCreateQuizErrors("Quiz type is required.");
    } else {
      setCreateQuizErrors("");
    }

    // If no error found
    if (err == 0) {
      if (createQuiz.type == "qa") {
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
            data-name="type"
            className="quiz-type-options"
            data-value="qa"
            onClick={handleChange}
            style={{
              background: `${createQuiz.type == "qa" ? "#60B84B" : ""}`,
              color: `${createQuiz.type == "qa" ? "white" : ""}`,
            }}
          >
            Q & A
          </span>
          <span
            data-name="type"
            className="quiz-type-options"
            data-value="poll"
            onClick={handleChange}
            style={{
              background: `${createQuiz.type == "poll" ? "#60B84B" : ""}`,
              color: `${createQuiz.type == "poll" ? "white" : ""}`,
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
  const qaQuestions = <QAquiz onClose={onClose} quiz={createQuiz} />;

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
