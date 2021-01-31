import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../../store/actions/post";
import styles from "../posts/Posts.module.css";

// Simple form where user can make post. Post can not be empty, so if user try to submit an empty textarea, alert will popup. Component state will be empty after successfully submitting form.
const PostForm = () => {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch();

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("You can not post an empty post!");
    } else {
      dispatch(addPost({ text }));
      setText("");
      setAlert(null);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="text">Say something, don't be shy</label>
        <textarea
          name="text"
          id="text"
          value={text}
          onChange={onTextChange}
          placeholder="Say something..."
        ></textarea>
        <p>{alert}</p>
        <input type="submit" value="POST" className={styles.postBtn} />
      </div>
    </form>
  );
};

export default PostForm;
