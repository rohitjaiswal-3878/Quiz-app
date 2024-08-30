import React, { useEffect, useState } from "react";
import "./index.css";
import trophy from "../../assets/trophy.png";
import { updateResult } from "../../apis/result";

function Question({ questions, quizData, resultId }) {
  const [ques, setQues] = useState(0);
  const [seconds, setSeconds] = useState(questions[ques].timer);
  const [options, setOptions] = useState([false, false, false, false]);
  const [result, setResult] = useState({
    quizId: quizData._id,
    userId: quizData.userId,
    type: quizData.type,
    questions: [],
  });
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 670px)").matches
  );

  // handle for shifting to next question
  const handleNext = () => {
    if (ques + 1 == questions.length) {
      if (!options.includes(true) && seconds != 0) {
        setError("Please select any option to proceed!");
      } else {
        if (questions[ques].timer == "5" || questions[ques].timer == "10") {
          if (!options.includes(true)) {
            let newResult = {
              name: questions[ques].content,
              attemped: 1,
              answered: 0,
              setOptions: {},
            };
            result.questions[ques] = newResult;
            setResult(result);
          }
        }
        setError("");
        setCompleted(true);
        updateResult(resultId, result);
      }
    } else {
      if (options.includes(true)) {
        setError("");
        setOptions([false, false, false, false]);
        setSeconds(parseInt(questions[ques + 1].timer));

        setQues(ques + 1);
        updateResult(resultId, result);
      } else if (seconds == 0) {
        let newResult = {
          name: questions[ques].content,
          attemped: 1,
          answered: 0,
          setOptions: {},
        };
        result.questions[ques] = newResult;
        setError("");
        setResult(result);
        setOptions([false, false, false, false]);
        setSeconds(parseInt(questions[ques + 1].timer));
        setQues(ques + 1);
        updateResult(resultId, result);
      } else {
        setError("Please select any option to proceed!");
      }
    }
  };

  // handle select option
  const handleSelectOption = (i) => {
    let newOptions = [false, false, false, false];
    newOptions[i] = true;

    let newResult = {
      name: questions[ques].content,
      attemped: 1,
      answered: questions[ques].options[i].answer == "right" ? 1 : 0,
      selectedOption: { index: i, optionDetails: questions[ques].options[i] },
    };
    result.questions[ques] = newResult;
    setResult(result);

    setOptions(newOptions);
  };

  // creates timer
  useEffect(() => {
    window
      .matchMedia("(min-width: 670px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    let interval;
    if (seconds == 0) {
      handleNext();
    } else if (seconds != "off") {
      interval = setInterval(() => {
        setSeconds((prev) => parseInt(prev) - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [ques, seconds]);

  return (
    <div className="question-container">
      {!completed ? (
        <>
          {/* Question number and timer */}
          <div className="question-heading">
            <span className="question-no">{`0${ques + 1}/0${
              questions.length
            }`}</span>
            {questions[ques].timer != "off" && (
              <span className="question-timer">
                00:{seconds > 9 ? seconds : "0" + seconds}s
              </span>
            )}
          </div>

          {/* Question */}
          <div className="question-body">
            <h3>{questions[ques].content}</h3>

            {/* Question options */}
            <div
              className="quesiton-options"
              style={{
                rowGap:
                  questions[ques].qType == "text" && matches ? "40px" : "",
                margin:
                  questions[ques].qType == "text" && matches ? "20px" : "",
              }}
            >
              {questions[ques].options.map((opt, index) => (
                <span
                  className={options[index] ? "selected option" : "option"}
                  key={index}
                  style={{
                    padding: questions[ques].qType == "text&img" ? "6px" : "",
                    justifyContent:
                      questions[ques].qType == "text&img"
                        ? "space-between"
                        : "center",
                    height:
                      quizData.type == "poll" &&
                      !matches &&
                      questions[ques].qType == "text&img"
                        ? "150px"
                        : questions[ques].qType == "text"
                        ? "80px"
                        : "",
                  }}
                  onClick={() => handleSelectOption(index)}
                >
                  {questions[ques].qType == "text" ? (
                    opt.text
                  ) : questions[ques].qType == "image" ? (
                    <img src={opt.imageURL} alt="image" id="type-image" />
                  ) : quizData.type == "poll" && !matches ? (
                    <div className="poll-text-img">
                      <div className="poll-text">
                        <span>{opt.text}</span>
                      </div>
                      <img src={opt.imageURL} alt="image" id="poll-img" />
                    </div>
                  ) : (
                    <>
                      <span>{opt.text}</span>
                      <img
                        src={opt.imageURL}
                        alt="image"
                        id="type-text-image"
                      />
                    </>
                  )}
                </span>
              ))}
            </div>

            <button className="test-btn" onClick={handleNext}>
              {ques + 1 == questions.length ? "Submit" : "Next"}
            </button>
            {error && (
              <span
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "6px",
                  fontSize: "0.8rem",
                }}
              >
                {error}
              </span>
            )}
          </div>
        </>
      ) : completed && quizData.type == "qa" ? (
        <>
          {/* QA completion */}
          <div className="congrats">
            <span className="congrats-heading">Congrats Quiz is completed</span>
            <img src={trophy} alt="trophy" className="trophy" />
            <div className="congrats-score">
              <span>Your Score is </span>
              <span className="score-count">
                {`0${result.questions.filter((q) => q.answered).length}/0${
                  questions.length
                }`}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Poll completion */}
          <div className="poll-result">
            <span>
              Thank you <br /> for participating in <br />
              the Poll
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
