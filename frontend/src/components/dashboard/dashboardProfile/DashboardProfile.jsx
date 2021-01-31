import React from "react";
import styles from "./DashboardProfile.module.css";
import { useSelector } from "react-redux";
import moment from "moment";

// In this component, we react-redux hook, we have access for user info pieces of state. In the table, infos from creating profile are shown except bio. If user didnt enter some of informations, fields in the table will be empty.
const DashboardProfile = () => {
  const userProfile = useSelector((state) => state.profile.userProfile);
  const auth = useSelector((state) => state.auth);
  const { dateofbirth, adress, phone } = userProfile;
  const formatedDate = moment(dateofbirth).format("DD/MM/YYYY");
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Birth Date</th>
          <th>Adress</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{auth.user.name}</td>
          <td>{dateofbirth === null ? "" : formatedDate}</td>
          <td>{adress}</td>
          <td>{phone}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DashboardProfile;
