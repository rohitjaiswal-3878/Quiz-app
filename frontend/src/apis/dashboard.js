import axios from "axios";

// Gets all the quizzes of particular user.
const getAllQuiz = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/quiz/all-quizzes`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Get quiz impressions of particular user.
const getImpressions = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/result/impression`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getImpressions, getAllQuiz };
