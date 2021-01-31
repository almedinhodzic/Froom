import React from "react";
import styles from "./NotFound.module.css";

// If user type in browser non-existing path, NotFound component will render on screen.
const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 PAGE NOT FOUND</h1>
      <p>Page does not exist!</p>
    </div>
  );
};

export default NotFound;
