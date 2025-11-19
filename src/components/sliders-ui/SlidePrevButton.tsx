import { type FC } from "react";

import { useSwiper } from "swiper/react";

const SlidePrevButton: FC<TPrevButtonProps> = (props) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      ref={props.swipingButtonRefPrev}
    ></button>
  );
};

export default SlidePrevButton;
