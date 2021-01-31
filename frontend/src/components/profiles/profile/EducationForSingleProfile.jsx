import React from "react";
import moment from "moment";

// Education information for profile of any user. Simple table that show user's finished school and date of graduation. If user still studying or user did not provide any date of graduation, still studying is default.
const EducationForSingleProfile = ({ education }) => {
  return education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>
        {edu.current || !edu.to
          ? "Still studying"
          : moment(edu.to).format("DD/MM/YYYY")}
      </td>
    </tr>
  ));
};

export default EducationForSingleProfile;
