import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

// Rendering all profiles on the screen. User can click to see other profiles and see registration date of any user.
const ProfilesItem = ({
  profile: {
    user: { _id, name },
    date,
    adress,
  },
}) => {
  const formatedDate = moment(date).format("LL");
  return (
    <tr>
      <td>
        <Link style={style} to={`/profile/${_id}`}>
          {name}
        </Link>
        {adress ? ` | ${adress}` : ""}
      </td>
      <td>{formatedDate}</td>
    </tr>
  );
};

const style = {
  textDecoration: "none",
};

export default ProfilesItem;
