import React from "react";
import { GoStarFill } from "react-icons/go";
type prop = {
  props: string;
};
function StarFill({ props }: prop) {
  return (
    <>
      <GoStarFill className={props} />
    </>
  );
}

export default StarFill;
