import React, { useEffect, useRef, useState } from "react";
//import "./index.css";
import { editQuizById, getQuizById } from "../../apis/analytics";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backIcon from "../../assets/back.png";

// This component is not in use currently!!!!

function EditQuiz({ quizId, setComponents }) {
  const [quiz, setQuiz] = useState({});

  // Gets initial quiz data.
  function getInitialData() {
    getQuizById(quizId).then((data) => {
      setQuiz(data);
    });
  }

  // Loads the quiz using quizId.
  useEffect(() => {
    getInitialData();
  }, []);

  // handle the input changes.
  const handleInputChange = (e, qIndex, oIndex) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "content") {
      quiz.questions[qIndex][name] = value;
    }
    if (name == "text" || name == "imageURL") {
      quiz.questions[qIndex].options[oIndex][name] = value;
    }
    if (e.target.dataset.name == "timer") {
      quiz.questions[qIndex][e.target.dataset.name] = e.target.dataset.value;
    }
    setQuiz({ ...quiz });
  };

  // Handle save button
  const handleSaveButton = () => {
    let err = 0;
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
      editQuizById(quiz, quizId).then((res) => {
        if (res.status != 200) {
          toast.error("Something went wrong!");
        } else {
          toast.success(res.data.message);
        }
      });
    } else {
      toast.error("Input fields cannot be empty!!");
    }
  };

  // Handle back button.
  const handleBack = () => {
    setComponents({
      quizzesTable: true,
      quizAnalytics: false,
      deleteConfirm: false,
      editQuiz: false,
    });
  };

  return (
    <div className="edit-quiz">
      <img src={backIcon} alt="" id="back-icon" onClick={handleBack} />
      {/* save and reset button */}
      <div className="edit-uiz-heading">
        <h1>Edit Quiz</h1>
        <div>
          <button onClick={handleSaveButton}>Save</button>
          <button onClick={getInitialData}>Reset</button>
        </div>
      </div>
      {Object.keys(quiz) != 0 ? (
        quiz.questions.map((question, index) => (
          // Questions to edit
          <div className="edit-quiz-questions" key={index}>
            <div>
              <label htmlFor="edit-quiz-question">Q.{index + 1}</label>
              <input
                type="text"
                value={question.content}
                name="content"
                id="edit-quiz-question"
                onChange={(e) => handleInputChange(e, index)}
                autoComplete="off"
              />
            </div>
            {/* Options */}
            <div className="edit-quiz-options">
              {question.options.map((opt, optIndex) => (
                <div key={optIndex}>
                  <input
                    autoComplete="off"
                    type="text"
                    value={
                      question.qType == "text" || question.qType == "text&img"
                        ? opt.text
                        : opt.imageURL
                    }
                    className="edit-quiz-option"
                    placeholder={
                      question.qType == "text" || question.qType == "text&img"
                        ? "Text"
                        : "Image URL"
                    }
                    style={{
                      backgroundColor: opt.answer == "right" ? "#60B84B" : "",
                      color: opt.answer == "right" ? "white" : "",
                    }}
                    name={
                      question.qType == "text" || question.qType == "text&img"
                        ? "text"
                        : "imageURL"
                    }
                    onChange={(e) => handleInputChange(e, index, optIndex)}
                  />
                  {question.qType == "text&img" && (
                    <input
                      autoComplete="off"
                      value={opt.imageURL}
                      className="edit-quiz-option"
                      placeholder="Image URL"
                      style={{
                        backgroundColor: opt.answer == "right" ? "#60B84B" : "",
                        color: opt.answer == "right" ? "white" : "",
                      }}
                      name="imageURL"
                      onChange={(e) => handleInputChange(e, index, optIndex)}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Timer */}
            {quiz.type == "qa" && (
              <div className="edit-quiz-timer">
                <span>Timer</span>
                <span
                  className="edit-time"
                  style={{
                    backgroundColor: question.timer == "off" ? "red" : "",
                    color: question.timer == "off" ? "white" : "",
                  }}
                  data-name="timer"
                  data-value="off"
                  onClick={(e) => handleInputChange(e, index)}
                >
                  Off
                </span>
                <span
                  className="edit-time"
                  style={{
                    backgroundColor: question.timer == "5" ? "red" : "",
                    color: question.timer == "5" ? "white" : "",
                  }}
                  data-name="timer"
                  data-value="5"
                  onClick={(e) => handleInputChange(e, index)}
                >
                  5 sec
                </span>
                <span
                  className="edit-time"
                  style={{
                    backgroundColor: question.timer == "10" ? "red" : "",
                    color: question.timer == "10" ? "white" : "",
                  }}
                  data-name="timer"
                  data-value="10"
                  onClick={(e) => handleInputChange(e, index)}
                >
                  10 sec
                </span>
              </div>
            )}
          </div>
        ))
      ) : (
        <span style={{ fontSize: "0.4em" }}>Loading...</span>
      )}
      <ToastContainer />
    </div>
  );
}

export default EditQuiz;
