import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styles from "./Register.module.css";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../../store/actions/auth";
import Loader from "../../layout/loader/Loader";

// In this component user can create new account. User has to fill all fields and submit his registration form. If email is already in database, alert will popup with warning that user already exists. All fields are required and alert will pop up if one of the fields is empty. Passwords must match and be long 3 characters or more. When user fill all fields with valid inputs, sumbmit will dispatch an action to create new account. User will be redirected to dashboard and he has to create a new account. If user is authenticated and try to go to register page, he will be automatically redirected to dashboard.
const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [alert, setAlert] = useState(null);

  const { name, email, password, password2 } = formData;

  // when we chane our fields, our state is changing
  // TODO: don't use anonymus functions in event callbacks
  const onValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // When we submit our form, action will start
  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !password2) {
      setAlert("All fields are required");
    } else if (password.length < 3) {
      setAlert("Password must be 3 characters or more");
    } else if (password !== password2) {
      setAlert("Passwords do not match");
    } else {
      dispatch(register({ name, email, password }));
      setAlert(null);
    }
  };

  if (loading) return <Loader />;

  // If out user is logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className={styles.registerSection}>
      <h1>Create New Account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name..."
            value={name}
            onChange={onValueChange}
          />
        </div>
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
        <div>
          <label htmlFor="password2">Repeat Password*</label>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Repeat Password..."
            value={password2}
            onChange={onValueChange}
          />
        </div>
        <p className={styles.registerError}>{alert}</p>
        {error === "User already exists" && (
          <p className={styles.registerError}>{error}</p>
        )}
        <input type="submit" value="REGISTER" className={styles.btn} />
      </form>
      <p>
        Already have an account?
        <Link className={styles.back} to="/login">
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default Register;
