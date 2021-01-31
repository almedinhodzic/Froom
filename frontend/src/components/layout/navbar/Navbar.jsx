import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/actions/auth";

// Navigation where user can navigate between pages. If user is logged in, he can swich on authenticated navigation routes, and dispatch logout action. If user is not logged in, he can switch between login and register component. If user log out, he will be redirected to the landing page.
const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = () => {
    dispatch(logout(history));
  };
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const authenticatedLinks = (
    <ul>
      <li>
        <Link className={styles.action} to="/profiles">
          Members
        </Link>
      </li>
      <li>
        <Link className={styles.action} to="/posts">
          Posts
        </Link>
      </li>
      <li>
        <Link className={styles.action} to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li onClick={onLogout}>
        <span className={styles.action}>Logout</span>
      </li>
    </ul>
  );

  const unauthLinks = (
    <ul>
      <li>
        <Link className={styles.action} to="/login">
          Login
        </Link>
      </li>
      <li>
        <Link className={styles.action} to="/register">
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <div>
      {!loading && (
        <nav>
          <nav className={styles.navbar}>
            <h1>
              <Link className={styles.action} to="/dashboard">
                FRoom
              </Link>
            </h1>
            {<>{isAuthenticated ? authenticatedLinks : unauthLinks}</>}
          </nav>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
