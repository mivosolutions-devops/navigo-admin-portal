import { MutableRefObject, useEffect, useState } from "react";

const usePlayer = (
  video: MutableRefObject<HTMLVideoElement | null>,
  videoContainer: MutableRefObject<HTMLDivElement | null>,
) => {
  const playVideo = () => video.current?.play();
  const pauseVideo = () => video.current?.pause();
  const [fullScreen, setFullScreen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const forwardTime = (forwardBy: number) =>
    video.current?.currentTime ? video.current.currentTime + forwardBy : 0;

  useEffect(() => {
    document.addEventListener("fullscreenchange", (e) => {
      if (document.fullscreenElement) {
        setFullScreen(true);
      } else {
        setFullScreen(false);
      }
    });

    return () => {
      document.removeEventListener("fullscreenchange", () => {
        setFullScreen(false);
      });
    };
  }, []);

  const toggleFullScreen = () => {
    if (videoContainer.current && video.current) {
      if (fullScreen) {
        document.exitFullscreen();
      } else {
        videoContainer.current.requestFullscreen();
      }
    }
  };

  return {
    isVideoPlaying,
    fullScreen,
    playVideo,
    pauseVideo,
    toggleFullScreen,
    forwardTime,
  };
};

export default usePlayer;
