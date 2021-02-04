import React, { useEffect, useState } from "react";
import styles from "./Post.module.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layout/loader/Loader";
import { getPost } from "../../../store/actions/post";
import { useHistory, Link, useParams } from "react-router-dom";
import moment from "moment";
import Likes from "../likes/Likes";
import CommentForm from "../comments/CommentForm";
import CommentItem from "../comments/CommentItem";

// In this component getPost action is dispatched and singe post by id is fatched. Here user can see can see post, like post, comment on post, see who posted it. By clicking on user, he will be redirected to the profile of that user. Comments posted by user can be deleted.
const Post = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showChildren, setShowChildren] = useState(false);
  const { post, loading } = useSelector((state) => state.forumPosts);
  const { user } = useSelector((state) => state.auth);

  const onBackButtonClick = () => {
    history.push("/posts");
  };

  useEffect(() => {
    dispatch(getPost(id));
    setShowChildren(true);
  }, [dispatch, id]);

  if (loading || !showChildren) return <Loader />;
  if (!post) return <h1>Post does not exists!</h1>;
  return (
    <div className={styles.post}>
      <button className={styles.backBtn} onClick={onBackButtonClick}>
        BACK ON POSTS
      </button>
      <div className={styles.postContent}>
        <p>{post.text}</p>
        <div className={styles.info}>
          <div className={styles.infoIn}>
            <Likes
              user={user}
              id={post._id}
              liked={
                post.likes.filter((like) => like.user === user._id).length > 0
                  ? true
                  : false
              }
            />
          </div>
          <div className={styles.infoIn}>
            <div>
              Posted by: <Link to={`/profile/${post.user}`}>{post.name}</Link>
            </div>
            <div>Posted: {moment(post.date).fromNow()}</div>
          </div>
        </div>
      </div>
      <CommentForm id={post._id} />
      <h4>Comments:</h4>
      {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
    </div>
  );
};

export default Post;
