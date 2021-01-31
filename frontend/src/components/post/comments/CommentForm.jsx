import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../store/actions/post";
import styles from "./CommentForm.module.css";

// Simple for where user can post comment on post. If user try to post an empty comment, action will not be dispatched, because cant post an empty comment.
const CommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(null);

  const onCommentSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("You can not post an empty comment!");
    } else {
      dispatch(addComment(id, { text }));
      setText("");
    }
  };

  const onValueChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={onCommentSubmit} className={styles.commentForm}>
      <textarea
        value={text}
        onChange={onValueChange}
        placeholder="Leave Your Comment..."
        className={styles.commentArea}
      ></textarea>
      <p className={styles.commentAlert}>{alert}</p>
      <input type="submit" value="POST" className={styles.commentBtn} />
    </form>
  );
};

export default CommentForm;
