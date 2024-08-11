import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { addFav } from "../features/FavSlice";
import BarsLoader from "../utilities/BarsLoader";
import { useDispatch, useSelector } from "react-redux";
import { setAuthFormOpen } from "../features/AuthSlice";
import { useAddItemToCartMutation } from "../services/cart";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { selectProduct } from "../features/SingleProuctSlice";
import { useNavigate, useOutletContext } from "react-router-dom";
import { errorToast, successToast, warnToast } from "../utilities/ToastMessage";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";

const CategoryProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart?.cartList);
  const favorite = useSelector((state) => state.fav);
  const catProducts = useSelector(
    (state) => state.categoryProduct.selectedCatProduct
  );
  const country = useSelector(
    (state) => state.location?.location?.country?.name
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ///////// CART ///////
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

  //   Show single product
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

      <div className="relative lg:w-[70%] mx-auto my-20">
        <h1 className="text-2xl font-bold mb-6">{catProducts?.categoryName}</h1>
        <div
          className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
        >
          {catProducts?.categoryProducts?.map((product, index) => (
            <div key={[index]}>
              <ProductCard
                {...product}
                productImg={product?.imageUrl}
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

export default CategoryProduct;
