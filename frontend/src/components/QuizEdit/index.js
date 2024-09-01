import React from "react";
import "./index.css";
import { useState, useEffect } from "react";
import { editQuizById, getQuizById } from "../../apis/analytics";
import ModalBtn from "../../utils/ModalBtn";
import toast from "react-hot-toast";

function QuizEdit({ quizId, onClose }) {
  const [quiz, setQuiz] = useState({}); // State to store the quiz data.
  const [selQuestion, setSelQuestion] = useState(0); // State to store the selected question.
  const [error, setError] = useState(); // State to store the error.
  const [loader, setLoader] = useState(false); // State to store the loader status when update is clicked.
  const [resetLoader, setResetLoader] = useState(false); // State to store the loader status of reset button.

  // Gets initial quiz data.
  function getInitialData() {
    getQuizById(quizId).then((data) => {
      setQuiz(data);
      setResetLoader(false);
    });
  }

  // Loads the quiz using quizId.
  useEffect(() => {
    getInitialData();
  }, []);

  // Handle the input changes.
  const handleInputChange = (e, oIndex) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "content") {
      quiz.questions[selQuestion][name] = value;
    }
    if (name == "text" || name == "imageURL") {
      quiz.questions[selQuestion].options[oIndex][name] = value;
    }
    if (e.target.dataset.name == "timer") {
      quiz.questions[selQuestion][e.target.dataset.name] =
        e.target.dataset.value;
    }
    setQuiz({ ...quiz });
  };

  // Handle question selection.
  const handleQuestionSelection = (i) => {
    setSelQuestion(i);
    setError("");
  };

  // Handle update quiz
  const handleUpdate = () => {
    let err = 0;

    // Checks for error.
    quiz.questions.forEach((element) => {
      if (element.content == "") {
        err++;
      }
      element.options.forEach((opt) => {
        if (opt.text == "" && element.qType == "text") {
          err++;
        } else if (opt.imageURL == "" && element.qType == "image") {
          err++;
        } else if (
          (opt.text == "" || opt.imageURL == "") &&
          element.qType == "text&img"
        ) {
          err++;
        }
      });
    });

    if (err == 0) {
      setLoader(true);
      editQuizById(quiz, quizId).then((res) => {
        if (res.status != 200) {
          toast.error("Something went wrong!");
          setLoader(false);
        } else {
          setLoader(false);
          toast.success(res.data.message);
          onClose();
        }
      });
    } else {
      setError("Input fields cannot be empty!!");
    }
  };

  return (
    <div className="quiz-edit">
      {Object.keys(quiz).length != 0 ? (
        <>
          {/* number of questions */}
          <div className="qa-quiz-heading">
            <div className="qa-no-of-questions">
              <ul className="qa-questions">
                {quiz.questions.map((question, index) => (
                  <li
                    key={index}
                    onClick={() => handleQuestionSelection(index)}
                    style={{
                      border: selQuestion == index ? "0.8px solid #60B84B" : "",
                    }}
                  >
                    {index + 1}
                  </li>
                ))}
                <button
                  id="quiz-edit-reset"
                  onClick={() => {
                    setResetLoader(true);
                    getInitialData();
                  }}
                  disabled={resetLoader}
                >
                  Reset
                </button>
                {resetLoader && <div className="loader"></div>}
              </ul>
            </div>
            <span className="qa-questions-limit">Max 5 questions</span>
          </div>

          {/* Question and its type */}
          <div className="qa-quiz-name-type">
            <input
              type="text"
              placeholder="Q&A Question"
              id="qa-quiz-name"
              name="content"
              autoComplete="off"
              value={quiz.questions[selQuestion].content}
              onChange={handleInputChange}
            />
            <div className="qa-quiz-options">
              <span>Option type</span>
              <div className="qa-quiz-types">
                <div className="qa-quiz-option">
                  <input
                    type="radio"
                    name="qType"
                    id="qa-option-1"
                    value="text"
                    checked={quiz.questions[selQuestion].qType == "text"}
                    disabled={true}
                  />
                  <label htmlFor="qa-option-1">Text</label>
                </div>
                <div className="qa-quiz-option">
                  <input
                    type="radio"
                    name="qType"
                    id="qa-option-2"
                    value="image"
                    checked={quiz.questions[selQuestion].qType == "image"}
                    disabled={true}
                  />
                  <label htmlFor="qa-option-2">Image URL</label>
                </div>
                <div className="qa-quiz-option">
                  <input
                    type="radio"
                    name="qType"
                    id="qa-option-3"
                    value="text&img"
                    checked={quiz.questions[selQuestion].qType == "text&img"}
                    disabled={true}
                  />
                  <label htmlFor="qa-option-3">Text & Image URL</label>
                </div>
              </div>
            </div>
          </div>

          {/* Options and timer */}
          <div className="qa-quiz-chooses">
            <div className="quiz-edit-options-container">
              {quiz.questions[selQuestion].options.map((opt, optIndex) => (
                <div className="quiz-edit-options" key={optIndex}>
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, optIndex)}
                    name={
                      quiz.questions[selQuestion].qType == "text" ||
                      quiz.questions[selQuestion].qType == "text&img"
                        ? "text"
                        : "imageURL"
                    }
                    value={
                      quiz.questions[selQuestion].qType == "text" ||
                      quiz.questions[selQuestion].qType == "text&img"
                        ? opt.text
                        : opt.imageURL
                    }
                    style={{
                      width:
                        quiz.questions[selQuestion].qType == "text&img"
                          ? "30%"
                          : "",
                      marginRight:
                        quiz.questions[selQuestion].qType == "text&img"
                          ? "10px"
                          : "",
                      backgroundColor: opt.answer == "right" ? "#60B84B" : "",
                      color: opt.answer == "right" ? "white" : "",
                    }}
                    autoComplete="off"
                  />
                  {quiz.questions[selQuestion].qType == "text&img" && (
                    <input
                      type="text"
                      onChange={(e) => handleInputChange(e, optIndex)}
                      value={opt.imageURL}
                      name="imageURL"
                      autoComplete="off"
                      style={{
                        backgroundColor: opt.answer == "right" ? "#60B84B" : "",
                        color: opt.answer == "right" ? "white" : "",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            {quiz.type == "qa" && (
              <div className="qa-quiz-timer">
                <span>Timer</span>
                <div className="timer">
                  <span
                    style={{
                      backgroundColor:
                        quiz.questions[selQuestion].timer == "off"
                          ? "#D60000"
                          : "",
                      color:
                        quiz.questions[selQuestion].timer == "off"
                          ? "white"
                          : "",
                    }}
                    data-name="timer"
                    data-value="off"
                    onClick={(e) => handleInputChange(e)}
                  >
                    OFF
                  </span>
                  <span
                    style={{
                      backgroundColor:
                        quiz.questions[selQuestion].timer == "5"
                          ? "#D60000"
                          : "",
                      color:
                        quiz.questions[selQuestion].timer == "5" ? "white" : "",
                    }}
                    data-name="timer"
                    data-value="5"
                    onClick={(e) => handleInputChange(e)}
                  >
                    5 sec
                  </span>
                  <span
                    style={{
                      backgroundColor:
                        quiz.questions[selQuestion].timer == "10"
                          ? "#D60000"
                          : "",
                      color:
                        quiz.questions[selQuestion].timer == "10"
                          ? "white"
                          : "",
                    }}
                    data-name="timer"
                    data-value="10"
                    onClick={(e) => handleInputChange(e)}
                  >
                    10 sec
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Cancel and save button */}
          {loader ? (
            <div style={{ margin: "10px auto" }} className="loader"></div>
          ) : (
            <ModalBtn onClose={onClose} handleSubmit={handleUpdate}>
              <span>Cancel</span>
              <span>Update</span>
            </ModalBtn>
          )}

          {/* Error container */}
          {error && (
            <span
              style={{
                color: "red",
                width: "100%",
                textAlign: "center",
                fontSize: "0.8rem",
                fontWeight: "550",
              }}
            >
              {error}
            </span>
          )}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default QuizEdit;
