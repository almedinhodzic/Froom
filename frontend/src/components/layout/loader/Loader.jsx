import React from "react";
import styles from "./Loader.module.css";

// Simple spinner which we can use when loading in our state is true. In most cases, user is waiting for information from the database, and spinner is on the screen by that time.
const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
