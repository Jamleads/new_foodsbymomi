import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { errorToast, successToast, warnToast } from "../utilities/ToastMessage";
import { addFav } from "../features/FavSlice";
import { useNavigate, useOutletContext } from "react-router-dom";
import { selectProduct } from "../features/SingleProuctSlice";
import { useEffect } from "react";
import { setAuthFormOpen } from "../features/AuthSlice";
import { useAddItemToCartMutation } from "../services/cart";
import BarsLoader from "../utilities/BarsLoader";
import { add } from "../features/CartSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const country = useSelector(
    (state) => state.location?.location?.country?.name
  );
  const theState = useSelector((state) => state);
  const allProduct = theState?.allProducts.allProducts;
  const cart = theState?.cart?.cartList;
  const favorite = theState?.fav;
  const isAuthenticated = theState.auth.isAuthenticated;
  // // // // // Scroll // // // // //
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

  // ///////// FAVOURITES ///////  //
  const addToFav = (product) => {
    const isDuplicate = duplicateCheck(favorite, product);
    if (isDuplicate) {
      warnToast("Item already in favourite");
      navigate("/favorite");
    } else {
      dispatch(addFav(product));
      successToast("Item added to favourite");
    }
  };

  // Selected product for nmore details //
  const handleProductClick = (product) => {
    dispatch(selectProduct(product));
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
      <div className="relative lg:w-[80%] mx-auto my-20">
        <h1 className="text-2xl font-bold mb-6">All PRODUCT</h1>
        <div
          className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
        >
          {allProduct.map((product) => (
            <div key={[product.id]}>
              <ProductCard
                {...product}
                productImg={product.imageUrl}
                price={countryPrice(product, country)}
                countryCode={countryCurrency(product, country)}
                onClickCart={() => addToCart(product)}
                onClickFav={() => addToFav(product)}
                onClickToDetails={() => handleProductClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
