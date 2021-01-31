import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import styles from "../posts/Posts.module.css";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../../store/actions/post";

// Rendering all posts from database on the screen. Getting auth piece of state to compare users id and post user, so user can delete his posts. By dispatching deletePost action from redux actions, user can delete his posts. Icon for delete is shown on last column of the table for user's posts.
const PostItem = ({ posts }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const postItem = posts.map((post) => (
    <tr key={post._id}>
      <td>
        <Link to={`/posts/${post._id}`} className={styles.link}>
          {post.text}
        </Link>
      </td>
      <td>
        <Link to={`/profile/${post.user}`} className={styles.link}>
          {post.name}
        </Link>
      </td>
      <td>{post.likes.length}</td>
      <td>{post.comments.length}</td>
      <td>{moment(post.date).fromNow()}</td>
      {!auth.loading && post.user === auth.user._id ? (
        <td
          className={styles.delete}
          onClick={() => dispatch(deletePost(post._id))}
        >
          <i className="fas fa-trash"></i>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Posted By</th>
          <th>
            <i className="fas fa-thumbs-up"></i>
          </th>
          <th>
            <i className="fas fa-comments"></i>
          </th>
          <th>Posted Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{postItem}</tbody>
    </table>
  );
};

export default PostItem;
