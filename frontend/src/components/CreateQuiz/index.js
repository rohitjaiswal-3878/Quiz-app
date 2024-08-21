import { useState } from "react";
import "./index.css";
import QAquiz from "../QAquiz";
import ModalBtn from "../../utils/ModalBtn";
import bigCross from "../../assets/big-cross.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    complete: false,
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
          complete: false,
        });
      } else {
        setShowQuizModals({
          qaQuiz: false,
          pollQuiz: true,
          cQuiz: false,
          complete: false,
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
          autoComplete="off"
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
        <ModalBtn onClose={onClose} handleSubmit={handleSubmit}>
          <span>Cancel</span>
          <span>Continue</span>
        </ModalBtn>
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

  // handle api request to create quiz
  const registerQuiz = () => {
    setShowQuizModals({
      qaQuiz: false,
      pollQuiz: false,
      cQuiz: false,
      complete: true,
    });
  };
  // JSX for adding questions in quiz. (Q & A)
  const qaQuestions = (
    <QAquiz
      onClose={onClose}
      quiz={createQuiz}
      setCreateQuiz={setCreateQuiz}
      registerQuiz={registerQuiz}
    />
  );

  // JSX for adding questions in quiz. (Poll)
  const pollQuestions = (
    <QAquiz
      onClose={onClose}
      quiz={createQuiz}
      setCreateQuiz={setCreateQuiz}
      registerQuiz={registerQuiz}
    />
  );

  // JSX for quiz created message
  const completeQuizCreation = (
    <div className="quiz-created">
      <h2>Congrats your Quiz is Published!</h2>
      <input type="text" readOnly value="link" className="quiz-created-link" />
      <button
        onClick={() => toast.success("Link copied to clipboard")}
        className="quiz-created-share"
      >
        Share
      </button>
      <img src={bigCross} alt="cross" onClick={onClose} />
      <ToastContainer limit={1} autoClose={2000} />
    </div>
  );

  return (
    <div className="create-container">
      {showQuizModals.cQuiz
        ? selectQuizType
        : showQuizModals.qaQuiz
        ? qaQuestions
        : showQuizModals.pollQuiz
        ? pollQuestions
        : showQuizModals.complete
        ? completeQuizCreation
        : ""}
    </div>
  );
}

export default CreateQuiz;
