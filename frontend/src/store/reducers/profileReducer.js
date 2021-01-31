import {
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
} from "../actions/types";

// Initial state for profile state.
const initialState = {
  userProfile: null,
  loading: false,
  profiles: [],
  error: null,
};
// Shaping our state with different action types.
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
    case FETCH_PROFILES_REQUEST:
    case FETCH_SINGLE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROFILE_SUCCESS:
    case FETCH_SINGLE_PROFILE_SUCCESS:
    case ADD_EDUCATION_SUCCESS:
    case DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        error: null,
        profiles: [],
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        userProfile: null,
        error: null,
      };
    case FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: action.payload,
        error: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        userProfile: null,
      };

    case CREATE_PROFILE_FAILURE:
    case FETCH_PROFILES_FAILURE:
    case ADD_EDUCATION_FAILURE:
    case DELETE_EDUCATION_FAILURE:
    case FETCH_SINGLE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
