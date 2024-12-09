"use client";

import { useEffect, useState } from "react";
import ContainerHeader from "./ContainerHeader";

export const menus = [
  {
    id: 1,
    name: "home",
    slug: "/",
    lang: "eng",
  },
  {
    id: 2,
    name: "buy",
    slug: "/buy",
    lang: "eng",
  },
  {
    id: 3,
    name: "rent",
    slug: "/rent",
    lang: "eng",
  },
  {
    id:4,
    name:'about us',
    slug:"/about",
    lang:"eng",
  },
  {
    id: 5,
    name : "contact",
    slug: "/contact",
    lang: "eng"
  }
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full h-[90px] fixed top-0 z-30 transition-colors duration-300 ${scrolled ? " bg-olive-drab" : "bg-transparent"}`}
    >
      <ContainerHeader menu={menus} />
    </header>
  );
};

export default Header;
