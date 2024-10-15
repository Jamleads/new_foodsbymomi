import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { addFav } from "../features/FavSlice";
import BarsLoader from "../utilities/BarsLoader";
import { useDispatch, useSelector } from "react-redux";
import { setAuthFormOpen } from "../features/AuthSlice";
import { useAddItemToCartMutation } from "../services/cart";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { selectProduct } from "../features/SingleProuctSlice";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { errorToast, successToast, warnToast } from "../utilities/ToastMessage";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { add } from "../features/CartSlice";

const CategoryProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useParams();

  const theState = useSelector((state) => state);
  const { refetchCart } = useOutletContext();
  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();

  const favorite = theState.fav;
  const cart = theState.cart?.cartList;
  const allProducts = theState.allProducts.allProducts;
  const isAuthenticated = theState.auth.isAuthenticated;
  const country = theState.location?.location?.country?.name;
  const catProducts = theState.categoryProduct.selectedCatProduct;

  const initial = catProducts?.categoryProducts;
  const [productToDisplay, setProductToDisplay] = useState(initial);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!initial) {
      const filteredProducts = allProducts.filter((item) =>
        item.categories?.includes(location.categories)
      );
      setProductToDisplay(filteredProducts);
    }
  }, [allProducts, initial, location]);

  // ///////// CART ///////
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
          {productToDisplay &&
            (catProducts?.categoryProducts || productToDisplay).map(
              (product, index) => (
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
              )
            )}
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;
