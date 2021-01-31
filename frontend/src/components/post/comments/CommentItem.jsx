import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../store/actions/post";
import styles from "./CommentItem.module.css";
import { Link } from "react-router-dom";
import moment from "moment";

// Rendering all comments from the post. If user posted comment, he can delete it by dispatching deleteComment action. From state we get user's id and comment id, so comparing them we can see if user posted comment. Moment is user for nicer date formating.
const CommentItem = ({ postId, comment }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const onCommentDelete = () => {
    dispatch(deleteComment(postId, comment._id));
  };

  return (
    <div className={styles.commentContent}>
      <p className={styles.comment}>{comment.text}</p>
      <div className={styles.infoComment}>
        <span>
          Commented by:
          <Link to={`/profile/${comment.user}`}>{comment.name}</Link>
        </span>
        <span>Commented: {moment(comment.date).fromNow()}</span>
        {!auth.loading && comment.user === auth.user._id && (
          <span onClick={onCommentDelete} className={styles.deleteComment}>
            <i className="fas fa-trash"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
