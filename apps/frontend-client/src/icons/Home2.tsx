import React from "react";
import Image from "next/image";
import home from "@/images/bx_home.svg";

interface Props {
  props?: string;
}

const Home2: React.FC<Props> = ({ props }) => {
  return (
    <Image
      src={home}
      alt="home"
      width={100}
      height={100}
      className={props}
    />
  );
};

export default Home2;
