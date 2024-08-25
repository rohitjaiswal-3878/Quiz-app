import axios from "axios";

// Gets analytics of particular quiz
const getQuizAnalytics = async (quizId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/result/analytics/${quizId}`,
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

export { getQuizAnalytics };
