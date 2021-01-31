import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/actions/auth";
import Loader from "../../layout/loader/Loader";

// In this component we are trying to log in user with his credentials. We use state for user's email and password input and dispatching an action for login. If credentials are good, and stored in database, user is logged in on forum, if not, user will get a warning for invalid credentials. Both input fields are required, so user can not submit if one, or both fields are empty. If user is already authenticated, he will be redirected to dashboard, and if user in any case go manually and type in browser, from his dashboard or any authenticated route, /login, he won't see login component, because rerendering will couse our loadUser action from App.jsx to run, and loader will pop up.
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);

  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const { email, password } = formData;

  // when we change our fields, our state is changing
  const onValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // When we submit our form, action will start
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert("Both fields are required");
    } else {
      dispatch(login(formData));
      setAlert(null);
    }
  };

  if (loading) return <Loader />;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className={styles.loginSection}>
      <h1>Login To Your Account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Adress*</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email..."
            value={email}
            onChange={onValueChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            value={password}
            onChange={onValueChange}
          />
        </div>
        <p className={styles.loginError}>{alert}</p>
        {error === "Invalid Credentials" && (
          <p className={styles.loginError}>{error}</p>
        )}
        <input type="submit" value="LOGIN" className={styles.btn} />
      </form>
      <p>
        Don't have an account?
        <Link className={styles.back} to="/register">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;
