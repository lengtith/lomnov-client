import React from "react";
import { FaFacebook } from "react-icons/fa";

type prop = {
  props: string;
};

function FacebookF({ props }: prop) {
  return (
    <>
      <FaFacebook className={props} />
    </>
  );
}

export default FacebookF;
