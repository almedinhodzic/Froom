import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEducation } from "../../../store/actions/profile";
import moment from "moment";

// This component renders row in table for every education credentials. User can delete education infos by clicking delete field, which every row has. When he click delete, deleteEducation action will be dispached. With selector, education piece of state is selected, and mapped through it.

const EducationItem = () => {
  const dispatch = useDispatch();
  const deleteEdu = (id) => {
    dispatch(deleteEducation(id));
  };
  const education = useSelector((state) => state.profile.userProfile.education);
  return education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.fieldofstudy === null ? "" : edu.fieldofstudy}</td>
      <td>{edu.from === null ? "" : moment(edu.from).format("DD/MM/YYYY")}</td>
      <td>{edu.to === null ? "Now" : moment(edu.to).format("DD/MM/YYYY")}</td>
      <td onClick={() => deleteEdu(edu._id)}>
        <i className="fas fa-trash"></i>
      </td>
    </tr>
  ));
};

export default EducationItem;
