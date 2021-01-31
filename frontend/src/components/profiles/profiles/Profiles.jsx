import React, { useEffect, useState } from "react";
import styles from "./Profiles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../../store/actions/profile";

import Loader from "../../layout/loader/Loader";
import ProfilesItem from "./ProfilesItem";

// When component is mounted, getProfiles action is dispatched, and all profiles from the database will be fetched. If there is no profiles, user will get message for no profiles. Profiles will be rendered if they exists, with clickable name of user, and registration date.
const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    dispatch(getProfiles());
    setShowChild(true);
  }, [dispatch]);

  if (loading || !showChild) return <Loader />;
  if (profiles.length < 1)
    return <h2>Currently, there is no registered members.</h2>;
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Members informations</th>
          <th>Registered Date</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map((profile) => (
          <ProfilesItem key={profile._id} profile={profile} />
        ))}
      </tbody>
    </table>
  );
};

export default Profiles;
