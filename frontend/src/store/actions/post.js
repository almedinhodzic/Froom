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
} from "./types";

// Action for post state. User can post, delete post, see other posts by dispatching those actions.

import axios from "axios";
// Get single post by his id.
export const getPost = (postId) => async (dispatch) => {
  dispatch({
    type: FETCH_POST_REQUEST,
  });
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({
      type: FETCH_POST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMsg = error.response.data;
    dispatch({
      type: FETCH_POST_FAILURE,
      error: errorMsg,
    });
  }
};

export const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
  };
};

export const fetchPostsFailure = (error) => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error,
  };
};

// Fetching all posts from database.
export const getPosts = () => async (dispatch) => {
  dispatch(fetchPostsRequest());
  try {
    const res = await axios.get("/api/posts");
    const posts = res.data;
    dispatch(fetchPostsSuccess(posts));
  } catch (error) {
    const errorMsg = error.response.data;
    dispatch(fetchPostsFailure(errorMsg));
  }
};

// Like single post on forum.
export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES_SUCCESS,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    const errorMsg = error.response.data;
    dispatch({
      type: UPDATE_LIKES_FAILURE,
      payload: errorMsg,
    });
  }
};

// Unlike post on forum.
export const unlikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES_SUCCESS,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    const errorMsg = error.response.data;
    dispatch({
      type: UPDATE_LIKES_FAILURE,
      payload: errorMsg,
    });
  }
};

// User can delete post which created.
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: { id },
    });
  } catch (error) {
    const errorMsg = error.response.data;
    dispatch({
      type: DELETE_POST_FAILURE,
      payload: errorMsg,
    });
  }
};

// Make Post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/posts", formData, config);
    dispatch({
      type: ADD_POST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMsg = error.response.data;
    dispatch({
      type: ADD_POST_FAILURE,
      payload: errorMsg,
    });
  }
};

// Commenting on post.
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMsg = error.response.data;
    dispatch({
      type: ADD_COMMENT_FAILURE,
      payload: errorMsg,
    });
  }
};

// Deleting own comments.
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT_SUCCESS,
      payload: commentId,
    });
  } catch (error) {
    const errorMsg = error.response.data;
    dispatch({
      type: REMOVE_COMMENT_FAILURE,
      payload: errorMsg,
    });
  }
};
