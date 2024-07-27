/* eslint-disable react/prop-types */
import { FbIcon, IgIcon, StarIcon, TwitterIcon2 } from "../assets";

const ProductCard2 = ({
  productImg,
  title,
  rate,
  price,
  description,
  categories,
  countryCode,
  onClickFav,
}) => {
  return (
    <div className="border-2 border-t-primary  h-auto lg:flex items-center bg-[#F6F7FB] shadow-xl">
      <div className="zoom-wrapper lg:w-[40%] h-full flex items-center justify-center py-5">
        <img src={productImg} alt="" className="w-[100%] h-full" />
      </div>

      <div className="lg:w-[60%] bg-white p-3">
        <p className="title lg:text-2xl text-primary font-bold">{title}</p>

        <div className="rating flex items-center ">
          <div className="rating-star flex items-center gap-1">
            <img src={StarIcon} alt="starIcon" />
            <img src={StarIcon} alt="StarIcon" />
            <img src={StarIcon} alt="StarIcon" />
            <img src={StarIcon} alt="StarIcon" />
            <img src={StarIcon} alt="StarIcon" />
          </div>
          <p className="ml-3 text-xs">{rate} (5.0)</p>
        </div>

        <p className="price text-primary text-2xl font-bold mt-1">
          {countryCode} {price}
        </p>

        <div className="description mt-1 mb-2 text-xs text-[#A9ACC6]">
          {description}
        </div>

        <button
          className="px-5 py-1 border-2 border-primary text-primary hover:bg-primary hover:text-white"
          onClick={onClickFav}
        >
          Add To Cart
        </button>

        <p className="text-primary text-sm mt-1">
          Categories: <span>{categories.join(", ")}</span>
        </p>

        <div className="social flex items-center">
          <p className="text-primary text-sm">Share</p>

          <div className="ml-3 flex items-center gap-3 rounded-full">
            <div className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
              <img src={FbIcon} alt="" />
            </div>

            <div className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
              <img src={IgIcon} alt="" />
            </div>

            <div className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
              <img src={TwitterIcon2} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
