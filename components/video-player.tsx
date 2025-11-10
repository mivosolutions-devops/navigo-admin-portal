"use client";

import useKeyPress from "@/hooks/useKeyPress";
import usePlayer from "@/hooks/usePlayer";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { FaBackward, FaForward, FaPlay } from "react-icons/fa6";
import { MdFullscreen } from "react-icons/md";

const VideoPlayer = () => {
  const video = useRef<HTMLVideoElement | null>(null);
  const videoContainer = useRef<HTMLDivElement | null>(null);
  const {
    forwardTime,
    isVideoPlaying,
    pauseVideo,
    fullScreen,
    toggleFullScreen,
    playVideo,
  } = usePlayer(video, videoContainer);
  const isFKeyPressed = useKeyPress("f");

  useEffect(() => {
    if (isFKeyPressed) {
      toggleFullScreen();
    }
  }, [isFKeyPressed, toggleFullScreen]);

  return (
    <div
      className={cn(
        "w-[75%] h-[50rem] relative overflow-clip rounded-3xl group",
        fullScreen && "rounded-none",
      )}
      ref={videoContainer}
    >
      <video className="w-full h-full object-cover relative" ref={video}>
        <source src="https://media.istockphoto.com/id/686304412/video/camera-pans-down-the-side-of-futuristic-generic-motion-graphics-interface.mp4?s=mp4-640x640-is&k=20&c=Q2iFykWG-s6bIxaT_uT7oRlSD3PCY0FhlNmyDNWNa20=" />
      </video>
      <div className="w-full flex flex-col items-start justify-center gap-1 absolute top-0 px-10 py-8 bg-gradient-to-b from-slate-800/30 -translate-y-24 group-hover:translate-y-0 transition-all">
        <span className="text-yellow-600 uppercase font-bold">cam 1</span>
        <span className="text-white font-bold">
          Kimisagara-Nyabugogo-Kacyiru
        </span>
      </div>
      <div
        className={
          "w-full h-20 absolute bottom-0 bg-gradient-to-t from-slate-900/60 text-white/80 flex justify-between items-center px-10 translate-y-14 group-hover:translate-y-0 transition-all"
        }
      >
        <div className="flex items-center justify-center gap-4 cursor-pointer">
          <FaBackward className="text-xl" />
          <FaPlay onClick={() => playVideo()} className="text-xl" />
          <FaForward onClick={() => forwardTime(10)} className="text-xl" />
        </div>
        <MdFullscreen
          className="text-3xl cursor-pointer"
          onClick={() => toggleFullScreen()}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
