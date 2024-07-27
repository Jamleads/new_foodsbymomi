import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { useNavigate, useOutletContext } from "react-router-dom";
import { errorToast, successToast, warnToast } from "../utilities/ToastMessage";
import Button from "./Button";
import { setAuthFormOpen } from "../features/AuthSlice";
import { useAddItemToCartMutation } from "../services/cart";
import BarsLoader from "../utilities/BarsLoader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theState = useSelector((state) => state);
  const cart = theState?.cart?.cartList;
  const selectedProduct = theState?.product.selectedProduct;
  const country = theState?.location?.location?.country?.name;
  const isAuthenticated = theState.auth.isAuthenticated;

  // // // // // Scroll // // // // //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();
  const { refetchCart } = useOutletContext();
  const addToCart = async (product) => {
    const isDuplicate = duplicateCheck(cart, product);
    if (!isAuthenticated) {
      dispatch(setAuthFormOpen(true));
    } else if (isDuplicate) {
      warnToast("Item already in cart, click + to increace the quantity");
      navigate("/cart");
    } else {
      try {
        const payLoad = {
          id: product.id,
          quantity: 1,
        };
        await addItemToCart(payLoad).unwrap();
        successToast("Product added to cart");
        refetchCart();
      } catch (error) {
        errorToast(error?.message);
      }
    }
  };

  return (
    <>
      {isAdding ? (
        <div className="modal">
          <BarsLoader color={""} height={50} />
        </div>
      ) : (
        ""
      )}
      {isAdding ? <div className="modal-backdrop"></div> : ""}
      <div className="lg:w-[80%] mx-auto my-20">
        {selectedProduct === null ? (
          "No product was selected"
        ) : (
          <div className="lg:flex gap-10">
            <div className="zoom-wrapper lg:h-[500px] lg:w-1/2 bg-white shadow-xl border-t-2 border-primary flex items-center justify-center">
              <img src={selectedProduct?.imageUrl} alt="" />
            </div>

            <div className="lg:w-1/2 lg:p-0 p-5">
              <p className="title lg:text-3xl text-xl text-primary font-bold">
                {selectedProduct?.title}
              </p>
              <p className="price text-primary lg:text-2xl font-bold mt-3">
                {countryCurrency(selectedProduct, country)}{" "}
                {countryPrice(selectedProduct, country)}
              </p>

              <div className="description text-base px-10 my-5 leading-10">
                {selectedProduct?.collectionDecription}
              </div>

              <div>
                <h1 className="text-black font-bold text-2xl my-2">
                  Avalability:{" "}
                  <span className="text-primary font-light">in stock</span>{" "}
                </h1>
              </div>

              <div className="flex gap-3 my-3">
                {/* <div className="lg:w-[80px] w-[50px] flex items-center justify-center bg-[#F0EFF2]">
                <input
                  type="number"
                  className="w-1/2 bg-transparent text-center text-primary font-bold"
                  placeholder="1"
                />
              </div> */}
              </div>

              <p className="text-primary mt-1">
                Categories:{" "}
                <span>{selectedProduct?.categories.join(", ")}</span>
              </p>

              <Button
                btnClick={() => addToCart(selectedProduct)}
                btnStyle={"bg-primary text-white w-full mt-3"}
                btnText={"Add To Cart"}
              />
              {/* <button className="w-full font-bold text-xl text-white py-2 bg-blue mt-4">
              Checkout
            </button> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
