"use client";

import { useEffect, useState } from "react";
import ContainerHeader from "./ContainerHeader";
import { IMenus } from "@/libs/types/api-menus/menu-response";

interface ClientHeaderProps {
  menus: IMenus[];
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ menus }) => {
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
      className={`w-full h-[90px] fixed top-0 z-30 transition-colors duration-300 ${scrolled ? "bg-[#79826A]" : "bg-transparent"}`}
    >
      <ContainerHeader menu={menus} />
    </header>
  );
};

export default ClientHeader;
