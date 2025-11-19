import { type FC } from "react";

const VideoItem: FC<TTrafficCamera> = ({ camNo, routeName }) => {
  return (
    <div className="w-full container h-52 bg-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer">
      <span>CAM {camNo}</span>
      <span className="text-emerald-500">{routeName}</span>
    </div>
  );
};

export default VideoItem;
