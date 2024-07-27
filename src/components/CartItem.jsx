/* eslint-disable react/prop-types */
const CartItem = ({
  title,
  total,
  price,
  decrease,
  increase,
  quantity,
  productImg,
  removeItem,
  countryCode,
}) => {
  return (
    <div className="product-card2 flex items-center py-2 lg:px-0 px-3 border-b-4 border-[#E1E1E4]">
      <div className="product-side w-2/5 flex items-center">
        <div className="product-img-wrap w-[30%] lg:h-[90px] h-[60px] border-[#F6F5FF] border-2 bg-[#F7F7F7] flex items-center justify-center relative">
          <img src={productImg} alt="" width="80%" className="h-full" />

          <div
            className="btn cursor-pointer absolute -top-2 right-0 w-[20px] h-[20px] flex items-center justify-center bg-red-500 text-mainWhite rounded-full"
            onClick={removeItem}
          >
            X
          </div>
        </div>

        <div className="product-details-wrap w-[70%] lg:pl-5 pl-3">
          <h2 className="h-[25px] product-name lg:text-base text-sm overflow-x-hidden">
            {title}
          </h2>
        </div>
      </div>

      <div className="price-side w-3/5 flex items-center">
        <div className="w-1/3 text-[#15245E] lg:text-base text-xs font-bold">
          {countryCode}{" "}
          <span className="price lg:text-base text-xs">
            {Number(price).toLocaleString()}
          </span>
        </div>

        <div className="w-1/3 quantity">
          <div className="lg:w-[80px] w-[50px] flex items-center justify-between bg-[#F0EFF2]">
            <span
              className="w-1/3 btn flex items-center justify-center active:bg-secondary lg:text-base text-xs cursor-pointer"
              onClick={decrease}
            >
              -
            </span>
            <span className="w-1/3 border-x-[1px] px-2 lg:text-base text-xs flex items-center justify-center">
              {quantity}
            </span>
            <span
              className="w-1/3 btn flex items-center justify-center active:bg-secondary lg:text-base text-xs  cursor-pointer"
              onClick={increase}
            >
              +
            </span>
          </div>
        </div>

        <div className="w-1/3 text-[#15245E] font-bold lg:text-base text-xs">
          {countryCode}{" "}
          <span className="total-price">{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
