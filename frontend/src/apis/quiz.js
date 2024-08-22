import axios from "axios";

// Save quiz in DB.
const saveQuiz = async (quizData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/quiz/create`,
      { ...quizData },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export { saveQuiz };
