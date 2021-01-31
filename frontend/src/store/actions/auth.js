// importing types
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";

// Actions for user authentication. First importing all types, because it is better for avoiding mistakes in typing. User can try to login, register and delete account. If everything is good dispatching success actions and reducers will start working on that. 

import axios from "axios";

export const registerSuccess = (user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: user,
  };
};

export const registerFailure = (error) => {
  return {
    type: REGISTER_FAILURE,
    payload: error,
  };
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    const user = res.data;
    dispatch(registerSuccess(user));
    dispatch(loadUser());
  } catch (error) {
    const errorMsg = error.response.data.message;
    dispatch(registerFailure(errorMsg));
  }
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const loadUser = () => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const res = await axios.get("/api/auth");
    const user = res.data;
    dispatch(fetchUserSuccess(user));
  } catch (error) {
    const errorMsg = error.response.data.message;
    dispatch(fetchUserFailure(errorMsg));
  }
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/auth", formData, config);
    const user = res.data;
    dispatch(loginSuccess(user));
    dispatch(loadUser());
  } catch (error) {
    const errorMsg = error.response.data.message;
    dispatch(loginFailure(errorMsg));
  }
};

// logout
export const logout = (history) => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
  history.push("/");
};
