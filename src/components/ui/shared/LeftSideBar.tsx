import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { userSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import logo from "../../../assets/images/logo (1).svg";
import logout from "../../../assets/icons/logout.svg";
import profile from "../../../assets/icons/profile-placeholder.svg";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
const LeftSideBar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = userSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  const { pathname } = useLocation();

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col">
        <NavLink className="flex gap-3 items-center" to={"/"}>
          <img height={325} width={130} src={logo} alt="logo" />
        </NavLink>
        <NavLink
          className="flex gap-3 items-center my-6"
          to={`/profile/${user.id}`}>
          <img
            src={`${user.imageUrl}  ` || profile}
            alt="user profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col ">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">{user.username}</p>
          </div>
        </NavLink>
        <ul className="flex flex-col gap-6 ">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group
              ${isActive && "bg-primary-500"}
              `}
                key={link.label}>
                <NavLink
                  className="flex gap-4 items-center p-4"
                  to={link.route}>
                  <img
                    className={`group-hover:invert-white
                  ${isActive && "invert-white"} 
                `}
                    src={link.imgURL}
                    alt={link.label}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}>
        <img src={logout} alt="logout" />
        <span className="small-medium lg:base-medium">Logout</span>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
