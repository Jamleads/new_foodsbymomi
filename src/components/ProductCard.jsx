/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { CartIcon, FavIcon, ShareIcon } from "../assets";
const ProductCard = ({
  productImg,
  title,
  price,
  herf,
  style,
  onClickCart,
  onClickFav,
  onClickToDetails,
  onClickSahre,
  countryCode,
}) => {
  return (
    <div className={`w-[100%] shadow-lg ${herf} ${style}`}>
      <div
        className={`product-img-wrap group w-full h-[270px] p-5 bg-offSkyBlue hover:bg-[#F7F7F7] ease-in duration-300 flex justify-center relative`}
      >
        <Link to={`/shop/${title}`} onClick={onClickToDetails}>
          <img src={productImg} alt="product-img" className="md:h-[100%]" />
        </Link>

        <div className="absolute bottom-3 flex items-center justify-center gap-2 lg:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className="bg-primary shadow-2xl cart-btn h-[40px] w-[40px] flex items-center justify-center cursor-pointer ease-in duration-300"
            onClick={onClickCart}
          >
            <img src={CartIcon} alt="cart-icon2" />
          </div>

          <div
            className="bg-primary shadow-2xl favourite-btn h-[40px] w-[40px] flex items-center justify-center cursor-pointer ease-in duration-300"
            onClick={onClickFav}
          >
            <img src={FavIcon} alt="favourite-icon2" />
          </div>

          <div
            className="bg-primary shadow-2xl magnify-btn h-[40px] w-[40px] flex items-center justify-center cursor-pointer ease-in duration-300"
            onClick={onClickSahre}
          >
            <img src={ShareIcon} alt="magnify-icon" />
          </div>
        </div>
      </div>

      <Link to={`/shop/${title}`} onClick={onClickToDetails}>
        <div
          className={`product-details group flex flex-col items-center justify-center bg-mainWhite hover:bg-primary cursor-pointer ease-in duration-300 lg:px-5 py-5`}
        >
          <h3 className="product-title text-primary font-bold text-sm group-hover:text-mainWhite text-center h-[20px] overflow-x-hidden">
            {title}
          </h3>

          <p className="product-price text-primary font-bold text-xm group-hover:text-mainWhite text-center">
            {countryCode} {price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
