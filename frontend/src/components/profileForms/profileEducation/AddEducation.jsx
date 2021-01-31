import React, { useState } from "react";
import { addEducation } from "../../../store/actions/profile";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./AddEducation.module.css";

// User can add Education informations on his profile. School is required field in this form. If user still styding, he can make still in school as yes. User can post as many education infos as he wants. And of course delete them on the dashboard.
const AddEducation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    school: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
  });

  const { school, fieldofstudy, from, to, current } = formData;

  const onCurrentChange = (e) => {
    setFormData({
      ...formData,
      current: !current,
    });
    toggleDisabled(!disabled);
  };

  const [disabled, toggleDisabled] = useState(false);
  const onValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [alert, setAlert] = useState(null);

  const onBackButtonClick = (e) => {
    history.push("/dashboard");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (school === "") {
      setAlert("School is required!");
    } else {
      dispatch(addEducation(formData, history));
    }
  };
  return (
    <section className={styles.addEducation}>
      <h1>Add Education To Your Profile</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="school">School</label>
          <input
            type="text"
            name="school"
            id="school"
            value={school}
            onChange={onValueChange}
          />
          <p className={styles.alert}>{alert}</p>
        </div>
        <div>
          <label htmlFor="fieldofstudy">Field of Study</label>
          <input
            type="text"
            name="fieldofstudy"
            id="fieldofstudy"
            value={fieldofstudy}
            onChange={onValueChange}
          />
        </div>
        <div>
          <label htmlFor="from">Education started</label>
          <input
            type="date"
            name="from"
            id="from"
            value={from}
            onChange={onValueChange}
          />
        </div>
        <div>
          <label htmlFor="current" className={styles.current}>
            Current In School
          </label>
          <input
            type="checkbox"
            name="current"
            id="current"
            checked={current}
            value={current}
            onChange={onCurrentChange}
            className={styles.mark}
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">Education ended</label>
          <input
            type="date"
            name="to"
            id="to"
            disabled={disabled ? "disabled" : ""}
            value={to}
            onChange={onValueChange}
          />
        </div>
        <input type="submit" value="ADD EDUCATION" className={styles.btn} />
        <input
          type="button"
          value="CANCEL"
          className={styles.backBtn}
          onClick={onBackButtonClick}
        />
      </form>
    </section>
  );
};

export default AddEducation;
