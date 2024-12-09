import React from "react";
import { IoMdSettings } from "react-icons/io";

type prop = {
  props?: string;
};

function Setting({ props }: prop) {
  return (
    <>
      <IoMdSettings className={props} />
    </>
  );
}

export default Setting;
