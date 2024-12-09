import React from "react";
import { FaUser } from "react-icons/fa";

type prop = {
  props?: string;
};

function User({ props }: prop) {
  return (
    <>
      <FaUser className={props} />
    </>
  );
}

export default User;
