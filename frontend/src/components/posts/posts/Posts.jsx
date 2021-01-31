import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../../store/actions/post";
import Loader from "../../layout/loader/Loader";
import PostForm from "../postForm/PostForm";
import PostItem from "../postItem/PostItem";
import styles from "./Posts.module.css";

// Fetching all posts from the database, and if fetching is not finnished, spinner will be shown on the screen. All posts are pushed forward as props to the PostItem component, where they will be rendered.
const Posts = () => {
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.forumPosts);
  const [showChildren, setShowChildren] = useState(false);
  useEffect(() => {
    dispatch(getPosts());
    setShowChildren(true);
  }, [dispatch]);
  if (loading || !showChildren) return <Loader />;
  return (
    <div className={styles.posts}>
      <h2>Connect with the community...</h2>
      <PostForm />
      <PostItem posts={posts} />
    </div>
  );
};

export default Posts;
