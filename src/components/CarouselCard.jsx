/* eslint-disable react/prop-types */
import { MockUpMain } from "../assets";

const CarouselCard = ({
  style,
  onClick,
  collectionTitle,
  collectionDecription,
  productImg,
}) => {
  return (
    <div
      className={`collectionCard ${style} h-full w-full relative overflow-x-hidden`}
    >
      <div className="carouel-add-img absolute top-0 left-0 z-50">
        <img src={MockUpMain} alt="" className="w-[80%]" />
      </div>

      <div className="collection-wrap lg:w-[80%] flex items-center lg:gap-10 lg:mx-auto lg:h-[65vh]">
        <div className="collection-details lg:w-[36%] ml-auto lg:pl-5">
          <h1 className="collection-title font-bold lg:text-4xl mt-2">
            {collectionTitle}
          </h1>

          <p className="collection-decription md:text-base text-xs text-[#8A8FB9] lg:my-5 lg:w-[80%]">
            {collectionDecription}
          </p>

          <button
            className={`px-8 py-3 bg-primary text-mainWhite ${style}`}
            onClick={onClick}
          >
            Check it out
          </button>
        </div>

        <div className="collection-image-wrap lg:w-[50%] w-full relative">
          <div className="collection-image flex items-center justify-center">
            <img
              src={productImg}
              alt="collection of Prouct"
              className="w-full"
            />
          </div>
          <div className="colection-bolb absolute top-0 right-12 w-[480px] h-[480px] bg-[#a8cc4515] mix-blend-multiply rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
