import { bottombarLinks } from "@/constants";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <NavLink
            className={`  ${isActive && "bg-primary-500"} rounded-[10px] flex-col gap-1 p-2 transition flex-center`}
            key={link.label}
            to={link.route}>
            <img
              className={`group-hover:invert-white
                  ${isActive && "invert-white"} 
                `}
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
            />
            <p className="tiny-medium text-light-2"> {link.label}</p>
          </NavLink>
        );
      })}
    </section>
  );
};

export default BottomBar;
