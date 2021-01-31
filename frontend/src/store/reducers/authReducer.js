// importing types, because it is more safe than typing action types
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  DELETE_ACCOUNT,
} from "../actions/types";

// Initial auth state.
const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  isAuthenticated: null,
  user: null,
};

// By different action types, we are changing our state.
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        token: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGOUT:
    case DELETE_ACCOUNT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
