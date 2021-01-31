import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount,
} from "../../../store/actions/profile";
import { useHistory } from "react-router-dom";
import Loader from "../../layout/loader/Loader";
import styles from "./Dashboard.module.css";
import CreateProfile from "../../profileForms/createProfile/CreateProfile";
import DashboardProfile from "../dashboardProfile/DashboardProfile";
import Education from "../education/Education";
import Popup from "../popup/Popup";

// This is the main component of user, where he can see his informations, his education credentials, add new education credentials, delete them, delete his account etc. When component is mounted, getCurrentUser action is dispatched, and filling state with current user. If user has no profile, CreateProfile component will be shown, and he has to create profile to see his dashboard. User has to be authenticated to see dashboard. When action is loading, and fetching user is not finished, Loading component will be popup till action is over. With react-redux hooks, we get some pieces of the state, and dispatch an action.
const Dashboard = () => {
  const dispatch = useDispatch();
  const [popup, showPopup] = useState(false);
  const { userProfile, loading } = useSelector((state) => state.profile);

  const [showChild, setShowChild] = useState(false);
  const history = useHistory();

  const onAddEduButtonClick = (e) => {
    history.push("/add-education");
  };

  const onDeleteAccountClick = (e) => {
    showPopup(true);
    setTimeout(() => {
      showPopup(false);
    }, 5000);
  };

  const onDeleteClick = (e) => {
    dispatch(deleteAccount());
  };

  useEffect(() => {
    dispatch(getCurrentProfile());
    setShowChild(true);
    return () => showPopup(false);
  }, [dispatch]);

  // if (!showChild) return <Loader />;
  if (loading || !showChild) return <Loader />;
  if (userProfile === null) return <CreateProfile />;
  return (
    <section className={styles.dashboard}>
      <h1>Welcome To Your Dashboard!</h1>
      <DashboardProfile />
      <div className={styles.buttonContainer}>
        <button onClick={onAddEduButtonClick}>ADD EDUCATION</button>
      </div>
      {userProfile.education.length > 0 ? (
        <Education />
      ) : (
        <h2>No Education Records</h2>
      )}
      <div className={styles.delContainer}>
        <button
          className={styles.deleteButton}
          disabled={popup}
          onClick={onDeleteAccountClick}
        >
          DELETE ACCOUNT
        </button>
        {popup && <Popup onDeleteClick={onDeleteClick} showPopup={showPopup} />}
      </div>
    </section>
  );
};

export default Dashboard;
