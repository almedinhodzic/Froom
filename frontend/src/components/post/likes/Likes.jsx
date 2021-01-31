import React, { useState } from "react";
import { likePost, unlikePost } from "../../../store/actions/post";
import { useDispatch } from "react-redux";
import styles from "./Likes.module.css";

// From props, we get true or false if user who is currently seeing post, liked or not this post. If user liked it, he can unlike it by dispatching an action from redux. If user didnt like post, he can like it by dispatching an action for like. Icon will change color, depents on liked prop, true or false.
const Likes = ({ liked, id }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(liked);

  const onClick = (e) => {
    if (like) dispatch(unlikePost(id));
    else {
      dispatch(likePost(id));
    }
    setLike(!like);
  };

  if (like)
    return (
      <div className={styles.likedBtn} onClick={onClick}>
        <i className="fas fa-thumbs-up"></i>
      </div>
    );
  return (
    <div className={styles.unlikedBtn} onClick={onClick}>
      <i className="fas fa-thumbs-up"></i>
    </div>
  );
};

export default Likes;
