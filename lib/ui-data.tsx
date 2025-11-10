import { MdOutlineAnalytics } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiUserCircleGearLight } from "react-icons/pi";
import { GoPasskeyFill } from "react-icons/go";

export const links = [
  {
    icon: <MdOutlineAnalytics />,
    label: "Analytics",
    to: "/",
  },
  {
    icon: <HiOutlineUserGroup />,
    label: "Users",
    to: "/users",
  },
  {
    icon: <PiUserCircleGearLight />,
    label: "Roles",
    to: "/roles",
  },
  {
    icon: <GoPasskeyFill />,
    label: "Permissions",
    to: "/permissions",
  },
  {
    icon: <CiStar />,
    label: "Feedbacks",
    to: "/feedbacks",
  },
  {
    icon: <BiHelpCircle />,
    label: "Reported problems",
    to: "/help-center",
  },
];
