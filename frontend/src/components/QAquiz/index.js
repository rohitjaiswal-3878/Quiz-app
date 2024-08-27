import React, { useState } from "react";
import "./index.css";
import crossIcon from "../../assets/cross.png";
import plusIcon from "../../assets/plus.png";
import Text from "../../utils/Text";
import AddOption from "../../utils/AddOption";
import ModalBtn from "../../utils/ModalBtn";

function QAquiz({
  onClose,
  quiz,
  setCreateQuiz,
  registerQuiz,
  validationError,
}) {
  const [selQuestion, setSelQuestion] = useState(0);
  const [selOption, setSelOption] = useState(0);
  const [error, setError] = useState("");
  const [totalQuestions, setTotalQuestions] = useState([
    {
      qType: "text",
      content: "",
      options: [
        {
          text: "",
          imageURL: "",
          answer: "",
        },
        {
          text: "",
          imageURL: "",
          answer: "",
        },
      ],
      timer: "off",
    },
  ]);

  // handle create quiz button
  const handleCreateQuiz = (e) => {
    if (handleError() == 0) {
      setError("");
      quiz.questions = totalQuestions;
      setCreateQuiz({ ...quiz });
      registerQuiz();
    }
  };

  // handle Errors
  const handleError = () => {
    let err = 0;
    let errMsg = "";

    let question = totalQuestions[selQuestion];
    let ansSel = false;
    question.options.forEach((opt, index) => {
      if (opt.answer == "right" && quiz.type == "qa") ansSel = true;

      if (question.qType == "text" || question.qType == "image") {
        if (opt.imageURL == "" && opt.text == "") {
          errMsg = "Please fill the options to proceed!";
        }
      } else if (question.qType == "text&img") {
        if (opt.imageURL == "" || opt.text == "") {
          errMsg = "Please fill the options to proceed!";
        }
      }
    });

    if (question.content == "" || question.qType == "") {
      err++;
      setError("Please fill all the details before proceeding!");
    } else if (errMsg && ansSel) {
      err++;
      setError(errMsg);
    } else if (errMsg && quiz.type == "poll") {
      err++;
      setError(errMsg);
    } else if (!ansSel && quiz.type == "qa") {
      err++;
      setError("Please select answer to proceed!");
    }

    return err;
  };

  // handles question selecting
  const handleSelectedQuestion = (index) => {
    setError("");
    validationError("");
    validationError("");
    setSelQuestion(index);
  };

  // Handles to add new question
  const handleAddQuestion = (e) => {
    if (totalQuestions.length <= 4 && handleError() == 0) {
      let newQues = {
        qType: "text",
        content: "",
        options: [
          {
            text: "",
            imageURL: "",
            answer: "",
          },
          {
            text: "",
            imageURL: "",
            answer: "",
          },
        ],
        timer: "off",
      };
      setError("");
      validationError("");
      setTotalQuestions([...totalQuestions, newQues]);
      setSelQuestion(totalQuestions.length);
    }
  };

  // Handles closing the question
  const handleQuestionClose = (e) => {
    const index = e.target.dataset.index;
    const newQuestions = totalQuestions.filter((ques, i) => i != index);

    setError("");
    validationError("");
    setTotalQuestions(newQuestions);
    setSelQuestion(newQuestions.length - 1);
  };

  // Handle adding new options
  const handleAddOption = (e) => {
    if (totalQuestions[selQuestion].options.length < 4) {
      const newOption = [
        ...totalQuestions[selQuestion].options,
        {
          text: "",
          imageURL: "",
          answer: "",
        },
      ];
      totalQuestions[selQuestion].options = newOption;
      setTotalQuestions([...totalQuestions]);
    }
  };

  // Handle Options text input.
  const handleOptionInput = (e, i) => {
    if (totalQuestions[selQuestion].qType == "text") {
      totalQuestions[selQuestion].options[i].text = e.target.value;
    } else if (totalQuestions[selQuestion].qType == "image") {
      totalQuestions[selQuestion].options[i].imageURL = e.target.value;
    } else {
      totalQuestions[selQuestion].options[i][e.target.name] = e.target.value;
    }
    setTotalQuestions([...totalQuestions]);
  };

  // Handle option remove.
  const handleOptionRemove = (i) => {
    const newOption = totalQuestions[selQuestion].options.filter(
      (opt, index) => index != i
    );
    totalQuestions[selQuestion].options = newOption;
    setTotalQuestions([...totalQuestions]);
  };

  // Handle Select answer.
  const handleSelectAnswer = (e, i) => {
    const newArray = totalQuestions[selQuestion].options.map((opt, index) => {
      if (index == i) {
        return { ...opt, answer: "right" };
      } else {
        return { ...opt, answer: "wrong" };
      }
    });
    totalQuestions[selQuestion].options = newArray;
    setTotalQuestions([...totalQuestions]);
  };

  // handles to add questions details in state.
  const handleQuestionDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    totalQuestions[selQuestion][name] = value;
    if (name == "qType") {
      totalQuestions[selQuestion].options = [
        {
          text: "",
          imageURL: "",
          answer: "",
        },
        {
          text: "",
          imageURL: "",
          answer: "",
        },
      ];
    }
    setTotalQuestions([...totalQuestions]);
  };

  // handle timer selection
  const handleTimer = (timer) => {
    totalQuestions[selQuestion].timer = timer;
    setTotalQuestions([...totalQuestions]);
  };

  return (
    <div className="qa-quiz-container">
      {/* creating new questions */}
      <div className="qa-quiz-heading">
        <div className="qa-no-of-questions">
          <ul className="qa-questions">
            {totalQuestions.map((question, index) => {
              if (index == 0) {
                return (
                  <li
                    key={index}
                    onClick={() => handleSelectedQuestion(index)}
                    style={{
                      border: `${
                        selQuestion == index ? "1px solid #60b84b" : "none"
                      }`,
                    }}
                  >
                    {index + 1}
                  </li>
                );
              }
              return (
                <div className="qa-question" key={index}>
                  <li
                    onClick={() => handleSelectedQuestion(index)}
                    style={{
                      border: `${
                        selQuestion == index ? "1px solid #60b84b" : "none"
                      }`,
                    }}
                  >
                    {index + 1}
                  </li>
                  <img
                    src={crossIcon}
                    alt="cross"
                    data-index={index}
                    onClick={handleQuestionClose}
                  />
                </div>
              );
            })}
          </ul>
          <img
            src={plusIcon}
            alt="plus"
            className="qa-plus-icon"
            onClick={handleAddQuestion}
          />
        </div>
        <span className="qa-questions-limit">Max 5 questions</span>
      </div>
      {/* Adding name and type to question */}
      <div className="qa-quiz-name-type">
        <input
          type="text"
          placeholder={quiz.type == "qa" ? "Q&A Question" : "Poll Question"}
          id="qa-quiz-name"
          name="content"
          value={totalQuestions[selQuestion].content}
          onChange={handleQuestionDetails}
          autoComplete="off"
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
                checked={
                  totalQuestions[selQuestion].qType == "text" ? true : false
                }
                onChange={handleQuestionDetails}
              />
              <label htmlFor="qa-option-1">Text</label>
            </div>
            <div className="qa-quiz-option">
              <input
                type="radio"
                name="qType"
                id="qa-option-2"
                value="image"
                checked={
                  totalQuestions[selQuestion].qType == "image" ? true : false
                }
                onChange={handleQuestionDetails}
              />
              <label htmlFor="qa-option-2">Image URL</label>
            </div>
            <div className="qa-quiz-option">
              <input
                type="radio"
                name="qType"
                id="qa-option-3"
                value="text&img"
                checked={
                  totalQuestions[selQuestion].qType == "text&img" ? true : false
                }
                onChange={handleQuestionDetails}
              />
              <label htmlFor="qa-option-3">Text & Image URL</label>
            </div>
          </div>
        </div>
      </div>
      {/* Adding options to the question */}
      <div className="qa-quiz-chooses">
        <div className="qa-quiz-add-option">
          {totalQuestions[selQuestion].options.map((opt, index) => {
            if (index == 0 || index == 1) {
              return (
                <Text
                  isQa={quiz.type == "qa" ? true : false}
                  handleOptionInput={(e) => handleOptionInput(e, index)}
                  setSelOption={() => setSelOption(index)}
                  inputValue={
                    totalQuestions[selQuestion].qType == "text"
                      ? totalQuestions[selQuestion].options[index].text
                      : totalQuestions[selQuestion].qType == "image"
                      ? totalQuestions[selQuestion].options[index].imageURL
                      : totalQuestions[selQuestion].options[index]
                  }
                  placeholder={
                    totalQuestions[selQuestion].qType == "text"
                      ? "Text"
                      : totalQuestions[selQuestion].qType == "image"
                      ? "Image URL"
                      : totalQuestions[selQuestion].qType == "text&img"
                      ? ["Text", "Image URL"]
                      : ""
                  }
                  removeDelete={true}
                  key={index}
                  handleDelete={() => handleOptionRemove(index)}
                  selectAnswer={(e) => handleSelectAnswer(e, index)}
                  answer={totalQuestions[selQuestion].options[index].answer}
                />
              );
            }
            return (
              <Text
                isQa={quiz.type == "qa" ? true : false}
                handleOptionInput={(e) => handleOptionInput(e, index)}
                setSelOption={() => setSelOption(index)}
                inputValue={
                  totalQuestions[selQuestion].qType == "text"
                    ? totalQuestions[selQuestion].options[index].text
                    : totalQuestions[selQuestion].qType == "image"
                    ? totalQuestions[selQuestion].options[index].imageURL
                    : totalQuestions[selQuestion].options[index]
                }
                placeholder={
                  totalQuestions[selQuestion].qType == "text"
                    ? "Text"
                    : totalQuestions[selQuestion].qType == "image"
                    ? "Image URL"
                    : totalQuestions[selQuestion].qType == "text&img"
                    ? ["Text", "Image URL"]
                    : ""
                }
                removeDelete={false}
                key={index}
                handleDelete={() => handleOptionRemove(index)}
                selectAnswer={(e) => handleSelectAnswer(e, index)}
                answer={totalQuestions[selQuestion].options[index].answer}
              />
            );
          })}

          <AddOption handleClick={handleAddOption} />
        </div>
        {quiz.type == "qa" && (
          <div className="qa-quiz-timer">
            <span>Timer</span>
            <div className="timer">
              <span
                onClick={() => handleTimer("off")}
                style={{
                  backgroundColor: `${
                    totalQuestions[selQuestion].timer == "off" ? "#d60000" : ""
                  }`,
                  color: `${
                    totalQuestions[selQuestion].timer == "off" ? "white" : ""
                  }`,
                }}
              >
                OFF
              </span>
              <span
                onClick={() => handleTimer("5")}
                style={{
                  backgroundColor: `${
                    totalQuestions[selQuestion].timer == "5" ? "#d60000" : ""
                  }`,
                  color: `${
                    totalQuestions[selQuestion].timer == "5" ? "white" : ""
                  }`,
                }}
              >
                5 sec
              </span>
              <span
                onClick={() => handleTimer("10")}
                style={{
                  backgroundColor: `${
                    totalQuestions[selQuestion].timer == "10" ? "#d60000" : ""
                  }`,
                  color: `${
                    totalQuestions[selQuestion].timer == "10" ? "white" : ""
                  }`,
                }}
              >
                10 sec
              </span>
            </div>
          </div>
        )}
      </div>
      {/* buttons */}
      <ModalBtn onClose={onClose} handleSubmit={handleCreateQuiz}>
        <span>Cancel</span>
        <span>Create Quiz</span>
      </ModalBtn>
      {/* Displaying error */}
      <div
        style={{
          color: "red",
          textAlign: "center",
          marginTop: "5px",
          fontSize: "0.8rem",
        }}
      >
        {error}
      </div>
    </div>
  );
}

export default QAquiz;
