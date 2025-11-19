import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";

const ModeToggle = () => {
  return (
    <div className="w-fit flex gap-4 rounded-full p-3 bg-light-grayish">
      <MdLightMode className="text-light text-base" />
      <MdOutlineDarkMode className="text-gray-400 text-base" />
    </div>
  );
};

export default ModeToggle;
