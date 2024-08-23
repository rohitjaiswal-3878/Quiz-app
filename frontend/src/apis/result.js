import axios from "axios";

// Stores the result.
const storeResult = async (result) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/result/create`,
      { ...result }
    );
    return response.data.result._id;
  } catch (error) {
    console.log(error.response);
  }
};

// Updates the result.
const updateResult = async (id, result) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND}/result/update/${id}`,
      { ...result }
    );
  } catch (error) {
    console.log(error.response);
  }
};

export { updateResult, storeResult };
