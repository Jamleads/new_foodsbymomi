import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselCard from "./CarouselCard";
import { sliderCard } from "../utilities/Dummy";

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="w-full lg:h-[65vh] overflow-x-hidden bg-red-500">
      <Slider {...settings} className=" bg-[#F2F0FF] h-full">
        {sliderCard.slice(0, 4).map((slider) => (
          <CarouselCard key={slider.id} {...slider} />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
