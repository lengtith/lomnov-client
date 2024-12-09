import Link from "next/link";
import { useEffect, useState } from "react";

export interface IMenus {
  id?: number;
  name?: string;
  slug?: string;
  lang: string;
}

export interface MenuProp {
  menu: IMenus[];
}

function NavigateList({ menu }: MenuProp) {
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [currentPath]);

  return (
    <ul className="flex md:flex-row flex-col gap-5 md:gap-10 text-[18px] mb-2 md:mb-0 p-5">
      {menu.map((item, id) => (
        <li key={id} className="list-none group relative">
          <Link href={item.slug || "/"} passHref legacyBehavior>
            <a
              className={`capitalize text-white hover:font-semibold ${
                currentPath === item.slug ? "text-white font-semibold" : ""
              }`}
            >
              {item.name}
            </a>
          </Link>
          <span
            className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-beige transition-all duration-300 group-hover:w-full"
          ></span>
        </li>
      ))}
    </ul>
  );
}

export default NavigateList;
