import React from "react";
import { BiHomeAlt } from "react-icons/bi";
type prop = {
  props?: string;
};
function Home({ props }: prop) {
  return (
    <>
      <BiHomeAlt className={`${props}`} />
    </>
  );
}

export default Home;
