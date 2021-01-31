import {
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILES_REQUEST,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAILURE,
  FETCH_SINGLE_PROFILE_REQUEST,
  FETCH_SINGLE_PROFILE_SUCCESS,
  FETCH_SINGLE_PROFILE_FAILURE,
  CREATE_PROFILE_FAILURE,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAILURE,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAILURE,
} from "./types";

// Actions for creating profile, fetching single and all profiles from the database.

import axios from "axios";

export const fetchProfileRequest = () => {
  return {
    type: FETCH_PROFILE_REQUEST,
  };
};

export const fetchProfileSuccess = (profile) => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: profile,
  };
};

export const fetchProfileFailure = (error) => {
  return {
    type: FETCH_PROFILE_FAILURE,
    payload: error,
  };
};

// Get profile for logged in user.
export const getCurrentProfile = () => async (dispatch) => {
  dispatch(fetchProfileRequest());
  try {
    const res = await axios.get("/api/profile/me");
    const profile = res.data;
    dispatch(fetchProfileSuccess(profile));
  } catch (error) {
    const errorMessage = error.message;
    dispatch(fetchProfileFailure(errorMessage));
  }
};

export const getProfilesRequest = () => {
  return {
    type: FETCH_PROFILES_REQUEST,
  };
};

export const getProfilesSuccess = (profiles) => {
  return {
    type: FETCH_PROFILES_SUCCESS,
    payload: profiles,
  };
};

export const getProfilesFailure = (error) => {
  return {
    type: FETCH_PROFILES_FAILURE,
    payload: error,
  };
};

// Fetching all profiles from the database.
export const getProfiles = () => async (dispatch) => {
  dispatch(getProfilesRequest());
  try {
    const res = await axios.get("/api/profile");
    const profiles = res.data;
    dispatch(getProfilesSuccess(profiles));
  } catch (error) {
    const errorMsg = error.response.message;
    dispatch(getProfilesFailure(errorMsg));
  }
};

export const fetchSingleProfileRequest = () => {
  return {
    type: FETCH_SINGLE_PROFILE_REQUEST,
  };
};

export const fetchSingleProfileSuccess = (profile) => {
  return {
    type: FETCH_SINGLE_PROFILE_SUCCESS,
    payload: profile,
  };
};

export const fetchSingleProfileFailure = (error) => {
  return {
    type: FETCH_SINGLE_PROFILE_FAILURE,
    payload: error,
  };
};

// If user wants to see profile from another user by his profile id.
export const getSingleProfile = (userId) => async (dispatch) => {
  dispatch(fetchSingleProfileRequest());
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    const profile = res.data;
    dispatch(fetchSingleProfileSuccess(profile));
  } catch (error) {
    const errorMsg = error.response.message;
    dispatch(fetchSingleProfileFailure(errorMsg));
  }
};

export const createProfilesFailure = (error) => {
  return {
    type: CREATE_PROFILE_FAILURE,
    payload: error,
  };
};

// Creating profile after registration.
export const createProfile = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.post("/api/profile", formData, config);

    dispatch(getCurrentProfile());
    history.push("/dashboard");
  } catch (error) {
    const errorMsg = error.response.message;
    dispatch(createProfilesFailure(errorMsg));
  }
};

export const addEducationSuccess = (profile) => {
  return {
    type: ADD_EDUCATION_SUCCESS,
    payload: profile,
  };
};
export const addEducationFailure = (error) => {
  return {
    type: ADD_EDUCATION_FAILURE,
    payload: error,
  };
};

// Adding education to user's profile.
export const addEducation = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put("/api/profile/education", formData, config);
    const profile = res.data;
    dispatch(addEducationSuccess(profile));
    history.push("/dashboard");
  } catch (error) {
    const errorMsg = error.response.message;
    dispatch(addEducationFailure(errorMsg));
  }
};

export const deleteEducationSuccess = (profile) => {
  return {
    type: DELETE_EDUCATION_SUCCESS,
    payload: profile,
  };
};
export const deleteEducationFailure = (error) => {
  return {
    type: DELETE_EDUCATION_FAILURE,
    payload: error,
  };
};

// Deleting own education informations.
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    const profile = res.data;
    dispatch(deleteEducationSuccess(profile));
  } catch (error) {
    const errorMsg = error.response.message;
    dispatch(deleteEducationFailure(errorMsg));
  }
};

// Delete account, profile, posts and comments.
export const deleteAccount = () => async (dispatch) => {
  try {
    await axios.delete("/api/profile");
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: DELETE_ACCOUNT });
  } catch (error) {
    console.error(error);
  }
};
