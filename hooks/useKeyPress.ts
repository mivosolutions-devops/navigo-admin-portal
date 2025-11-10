import { MutableRefObject, use, useCallback, useEffect, useState } from "react";

const useKeyPress = (targetKey: string) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setIsKeyPressed(true);
      }
    },
    [targetKey],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setIsKeyPressed(false);
      }
    },
    [targetKey],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [targetKey, handleKeyDown, handleKeyUp]);

  return isKeyPressed;
};

export default useKeyPress;
