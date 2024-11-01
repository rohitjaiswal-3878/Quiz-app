import { useState } from "react";
import "./index.css";
import QAquiz from "../QAquiz";
import ModalBtn from "../../utils/ModalBtn";
import bigCross from "../../assets/big-cross.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { saveQuiz } from "../../apis/quiz";
import { useLocation } from "react-router-dom";

function CreateQuiz({ onClose }) {
  const location = useLocation();
  const [createQuiz, setCreateQuiz] = useState({
    name: "",
    type: "",
    questions: [],
  }); // State to store the quiz.
  const [quizLink, setQuizLink] = useState(""); // State to store the quiz link.
  const [errors, setErrors] = useState(""); // State to store the error of server side.
  const [createQuizErrors, setCreateQuizErrors] = useState(""); // State to store the error of quiz creation.
  const [showQuizModals, setShowQuizModals] = useState({
    qaQuiz: false,
    pollQuiz: false,
    cQuiz: true,
    complete: false,
  }); // State to store which modal should be shown.

  // Handle input change.
  const handleChange = (e) => {
    if (e.target.name || e.target.value) {
      setCreateQuiz({ ...createQuiz, name: e.target.value });
    } else {
      setCreateQuiz({ ...createQuiz, type: e.target.dataset.value });
    }
  };

  // Handle continue button.
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

  // Handle api request to create quiz.
  const registerQuiz = async () => {
    const response = await saveQuiz(createQuiz);
    if (response.status == 500) {
      let msg = response.data.err.message;
      setErrors(msg);
    } else if (response.status == 200) {
      let currentURL = window.location.href.replace(location.pathname, ""); // Copying link to clipboard.
      let link = `${currentURL}/test/${response.data.newQuiz._id}`;
      setQuizLink(link);
      setErrors("");
      setShowQuizModals({
        qaQuiz: false,
        pollQuiz: false,
        cQuiz: false,
        complete: true,
      });
    }
  };

  // JSX for adding questions in quiz. (Q & A).
  const qaQuestions = (
    <QAquiz
      onClose={onClose}
      quiz={createQuiz}
      setCreateQuiz={setCreateQuiz}
      registerQuiz={registerQuiz}
      validationError={setErrors}
    />
  );

  // JSX for adding questions in quiz. (Poll).
  const pollQuestions = (
    <QAquiz
      onClose={onClose}
      quiz={createQuiz}
      setCreateQuiz={setCreateQuiz}
      registerQuiz={registerQuiz}
      validationError={setErrors}
    />
  );

  // JSX for quiz created message.
  const completeQuizCreation = (
    <div className="quiz-created">
      <h2>Congrats your Quiz is Published!</h2>
      <input
        type="text"
        defaultValue={quizLink}
        className="quiz-created-link"
      />
      <button
        onClick={async () => {
          await window.navigator.clipboard.writeText(quizLink);
          toast.success("Link copied to clipboard");
        }}
        className="quiz-created-share"
      >
        Share
      </button>
      <img src={bigCross} alt="cross" onClick={onClose} />
      <ToastContainer limit={1} autoClose={2000} transition={Zoom} />
    </div>
  );

  return (
    <div className="create-container">
      {/* Conditional rendering */}
      {showQuizModals.cQuiz
        ? selectQuizType
        : showQuizModals.qaQuiz
        ? qaQuestions
        : showQuizModals.pollQuiz
        ? pollQuestions
        : showQuizModals.complete
        ? completeQuizCreation
        : ""}

      {/* Error */}
      <span
        style={{
          color: "red",
          fontSize: "0.75rem",
          width: "50%",
          marginLeft: "11%",
          fontWeight: "550",
        }}
      >
        {errors}
      </span>
    </div>
  );
}

export default CreateQuiz;
