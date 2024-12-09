import React from "react";
import { PiShareFat } from "react-icons/pi";

type prop = {
  props: string;
};
const Share = ({ props }: prop) => {
  return <PiShareFat className={props} />;
};

export default Share;
