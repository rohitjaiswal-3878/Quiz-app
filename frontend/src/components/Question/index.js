import React, { useEffect, useState } from "react";
import "./index.css";
function Question({ questions }) {
  const [ques, setQues] = useState(0);
  const [seconds, setSeconds] = useState(questions[ques].timer);
  const [options, setOptions] = useState([false, false, false, false]);

  // handle for shifting to next question
  const handleNext = () => {
    if (ques + 1 == questions.length) {
      console.log("No more questions");
    } else {
      setOptions([false, false, false, false]);
      setSeconds(parseInt(questions[ques + 1].timer));
      setQues(ques + 1);
    }
  };

  // handle select option
  const handleSelectOption = (i) => {
    let newOptions = [false, false, false, false];
    newOptions[i] = true;
    setOptions(newOptions);
  };

  // creates timer
  useEffect(() => {
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

      <h3>{questions[ques].content}</h3>

      {/* Question options */}
      <div className="quesiton-options">
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
            }}
            onClick={() => handleSelectOption(index)}
          >
            {questions[ques].qType == "text" ? (
              opt.text
            ) : questions[ques].qType == "image" ? (
              <img src={opt.imageURL} alt="image" id="type-image" />
            ) : (
              <>
                <span>{opt.text}</span>
                <img src={opt.imageURL} alt="image" id="type-text-image" />
              </>
            )}
          </span>
        ))}
      </div>

      <button className="test-btn" onClick={handleNext}>
        {ques + 1 == questions.length ? "Submit" : "Next"}
      </button>
    </div>
  );
}

export default Question;
