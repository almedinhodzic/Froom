import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  UPDATE_LIKES_SUCCESS,
  UPDATE_LIKES_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
} from "../actions/types";

// Initial state for post state.
const initialState = {
  post: null,
  posts: [],
  loading: false,
  error: null,
};

// Shaping our state with different action types.
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
        post: null,
      };
    case FETCH_POST_FAILURE:
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        post: null,
        posts: [],
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };
    case ADD_POST_FAILURE:
    case DELETE_POST_FAILURE:
    case REMOVE_COMMENT_FAILURE:
    case ADD_COMMENT_FAILURE:
    case UPDATE_LIKES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.id),
        loading: false,
      };
    case UPDATE_LIKES_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload,
        },
        loading: false,
      };
    case REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        },
        loading: false,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
        posts: [],
        error: null,
      };
    default:
      return state;
  }
};

export default postReducer;
