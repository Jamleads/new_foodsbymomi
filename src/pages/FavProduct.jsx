import { useDispatch, useSelector } from "react-redux";
import ProductCard2 from "../components/ProductCard2";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { errorToast, successToast, warnToast } from "../utilities/ToastMessage";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { setAuthFormOpen } from "../features/AuthSlice";
import { useAddItemToCartMutation } from "../services/cart";
import BarsLoader from "../utilities/BarsLoader";
import { add } from "../features/CartSlice";

const FavProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theState = useSelector((state) => state);
  const country = theState?.location?.location?.country?.name;
  const isAuthenticated = theState?.auth.isAuthenticated;
  const favorite = theState?.fav;
  const cart = theState?.cart?.cartList;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ///////// CART ///////
  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();
  const { refetchCart } = useOutletContext();

  const addToCart = async (product) => {
    const isDuplicate = duplicateCheck(cart, product);
    if (isDuplicate) {
      warnToast("Item already in cart, click + to increace the quantity");
      navigate("/cart");
    } else if (!isAuthenticated) {
      // dispatch(setAuthFormOpen(true));
      dispatch(add(product));
      successToast("Product added to cart");
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
        if (
          error?.status == 500 ||
          error?.status == 401 ||
          error?.data?.message == "Something went wrong!"
        ) {
          dispatch(setAuthFormOpen(true));
        }
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
      <div>
        {favorite.length ? (
          <div className="lg:w-[80%] mx-auto mt-5">
            <h1 className="text-2xl font-bold">FAVOURITES PRODUCTS</h1>
            <div className="lg:grid grid-cols-2 lg:gap-x-5 lg:gap-y-10 my-10">
              {favorite.map((favProduct, index) => (
                <ProductCard2
                  key={index}
                  {...favProduct}
                  productImg={favProduct?.imageUrl}
                  price={countryPrice(favProduct, country)}
                  countryCode={countryCurrency(favProduct, country)}
                  description={favProduct.collectionDecription}
                  onClickFav={() => addToCart(favProduct)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="lg:w-[80%] h-[30vh] flex items-center justify-center mx-auto mt-5">
            <p>
              You have no favorite product, clcik{" "}
              <Link to="/shop">
                <span className="text-xl text-red-600 font-bold cursor-pointer">
                  here
                </span>
              </Link>{" "}
              to ad to favorite
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FavProduct;
