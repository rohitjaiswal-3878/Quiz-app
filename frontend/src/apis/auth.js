import axios from "axios";

// Registering the user.
const registerUser = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/auth/register`,
      { ...formData }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

// Logging in
const loginUser = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/auth/login`,
      { ...formData }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export { registerUser, loginUser };
