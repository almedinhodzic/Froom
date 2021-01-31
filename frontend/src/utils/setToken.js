// set token in header if its exists
import axios from "axios";

// This function is user for authentication. If token exists, we set it to the header as auth-token(name set in the backend), and it is saved to the local storage. After that, with our actions in redux we can compare jwt token and see if token is valid, and log in user.
const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common["auth-token"];
    localStorage.removeItem("token");
  }
};

export default setToken;
