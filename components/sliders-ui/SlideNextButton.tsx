import { type FC } from "react";

import { useSwiper } from "swiper/react";

const SlideNextButton: FC<TNextButtonProps> = (props) => {
  const swiper = useSwiper();

  return (
    <button
      className="hidden"
      onClick={() => swiper.slideNext()}
      ref={props.swipingButtonRefNext}
    ></button>
  );
};

export default SlideNextButton;
