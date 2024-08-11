import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselCard from "./CarouselCard";
import { sliderCard } from "../utilities/Dummy";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  const handleClick = (link) => {
    if (link.startsWith("http")) {
      window.location.href = link;
    } else {
      navigate(link);
    }
  };

  return (
    <div className="w-full lg:h-[65vh] overflow-x-hidden bg-red-500">
      <Slider {...settings} className=" bg-[#F2F0FF] h-full">
        {sliderCard.slice(0, 4).map((slider) => (
          <CarouselCard
            key={slider.id}
            {...slider}
            onClick={() => handleClick(slider.link)}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
