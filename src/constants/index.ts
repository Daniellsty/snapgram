import home from '../assets/icons/home.svg'
import wallpaper from '../assets/icons/wallpaper.svg'
import pepople from "../assets/icons/people.svg"
import bookmark from  "../assets/icons/bookmark.svg"
import gallery from "../assets/icons/gallery-add.svg"

export const sidebarLinks = [
    {
      imgURL: home,
      route: "/",
      label: "Home",
    },
    {
      imgURL: wallpaper,
      route: "/explore",
      label: "Explore",
    },
    {
      imgURL: pepople,
      route: "/all-users",
      label: "People",
    },
    {
      imgURL:bookmark,
      route: "/saved",
      label: "Saved",
    },
    {
      imgURL: gallery ,
      route: "/create-post",
      label: "Create Post",
    },
  ];
  
  export const bottombarLinks = [
    {
      imgURL:home,
      route: "/",
      label: "Home",
    },
    {
      imgURL: wallpaper,
      route: "/explore",
      label: "Explore",
    },
    {
      imgURL:bookmark,
      route: "/saved",
      label: "Saved",
    },
    {
      imgURL: gallery ,
      route: "/create-post",
      label: "Create",
    },
  ];