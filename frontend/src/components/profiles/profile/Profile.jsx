import React, { useState, useEffect } from "react";
import { getSingleProfile } from "../../../store/actions/profile";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layout/loader/Loader";
import EducationForSingleProfile from "./EducationForSingleProfile";
import styles from "./Profile.module.css";
import { useHistory } from "react-router-dom";

// Component for single profile for user. We can see other profiles from different users. There user has access to see his basic infos, and education infos. When component mount, action is dispatched, and when action is finished, spinner will end and we can see user's profile.
const Profile = ({
  match: {
    params: { id },
  },
}) => {
  const [showChild, setShowChild] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getSingleProfile(id));
    setShowChild(true);
  }, [dispatch, id]);
  const { userProfile, loading } = useSelector((state) => state.profile);

  const onButtonClick = () => {
    history.push("/profiles");
  };

  if (loading || !showChild) return <Loader />;
  if (userProfile === null) return <h2>User does not exists</h2>;

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Adress</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userProfile.user.name}</td>
            <td>
              {userProfile.adress ? userProfile.adress : "No adress provided"}
            </td>
            <td>
              {userProfile.bio ? userProfile.bio : "No bio infos provided"}
            </td>
          </tr>
        </tbody>
      </table>
      {userProfile.education.length > 0 ? (
        <table className={styles.eduTable}>
          <thead>
            <tr>
              <th>Education</th>
              <th>Finished</th>
            </tr>
          </thead>
          <tbody>
            <EducationForSingleProfile education={userProfile.education} />
          </tbody>
        </table>
      ) : (
        <h3>No Education Infos Provided</h3>
      )}
      <div className={styles.btnDiv}>
        <button className={styles.backBtn} onClick={onButtonClick}>
          BACK ON PROFILES
        </button>
      </div>
    </div>
  );
};

export default Profile;
