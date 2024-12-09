import React from "react";
import { SiTelegram } from "react-icons/si";

type prop = {
  props: string;
};
const Telegram = ({ props }: prop) => {
  return <SiTelegram className={props} />;
};

export default Telegram;
