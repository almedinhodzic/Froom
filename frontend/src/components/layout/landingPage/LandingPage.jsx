import React from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

// Landing page component where user can go on register and login. If user is already authenticated, he will be redirected to the dashboard. With react-redux hook, we get piece of the auth state for user authentication and loading.
const LandingPage = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <Loader />;
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>Free Your Mind</h1>
        <p>Enjoy on great Forum, with great community</p>
        <div className={styles.buttons}>
          <Link to="/login" className={styles.btn}>
            LOGIN
          </Link>
          <Link to="/register" className={styles.btn}>
            REGISTER
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingPage;
