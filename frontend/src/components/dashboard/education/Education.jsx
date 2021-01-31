import React from "react";
import styles from "./Education.module.css";

import EducationItem from "./EducationItem";

// This component shows heading of the education credentials table, and it is shown on the dashboard. For every new education info, new row will fill table.
const Education = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>School</th>
          <th>Field</th>
          <th>From</th>
          <th>To</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <EducationItem />
      </tbody>
    </table>
  );
};

export default Education;
