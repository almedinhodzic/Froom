import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProfile } from "../../../store/actions/profile";
import { useHistory } from "react-router-dom";
import styles from "./CreateProfile.module.css";

// Component where user can create his profile. To access dashboard, user have to create profile. By providing some informations, his profile is created. None of the fields is required.
const CreateProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    dateofbirth: "",
    phone: "",
    adress: "",
    bio: "",
  });
  const { dateofbirth, phone, adress, bio } = formData;

  const onValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, history));
  };
  return (
    <section className={styles.createProfile}>
      <h1 className={styles.formHeading}>
        Welcome! Tell us something about your self.
      </h1>
      <form onSubmit={onSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="dateofbirth">Birth Date</label>
          <input
            type="date"
            name="dateofbirth"
            id="dateofbirth"
            value={dateofbirth}
            onChange={onValueChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={onValueChange}
            placeholder="Phone..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="adress">Adress</label>
          <input
            type="text"
            name="adress"
            id="adress"
            value={adress}
            onChange={onValueChange}
            placeholder="Adress..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Tell us something about your self </label>
          <textarea
            placeholder="Bio..."
            name="bio"
            id="bio"
            value={bio}
            onChange={onValueChange}
          ></textarea>
        </div>
        <input type="submit" value="CREATE PROFILE" className={styles.btn} />
      </form>
    </section>
  );
};

export default CreateProfile;
