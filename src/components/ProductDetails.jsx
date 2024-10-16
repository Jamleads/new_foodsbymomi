import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { duplicateCheck } from "../utilities/DuplicateCheck";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { errorToast, successToast, warnToast } from "../utilities/ToastMessage";
import Button from "./Button";
import { setAuthFormOpen } from "../features/AuthSlice";
import { useAddItemToCartMutation } from "../services/cart";
import BarsLoader from "../utilities/BarsLoader";
import { add } from "../features/CartSlice";
import ProductCard from "./ProductCard";
import { addFav } from "../features/FavSlice";
import { selectProduct } from "../features/SingleProuctSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useParams();

  const theState = useSelector((state) => state);
  const cart = theState?.cart?.cartList;
  const favorite = theState?.fav;
  const selectedProduct = theState?.product.selectedProduct;
  const country = theState?.location?.location?.country?.name;
  const isAuthenticated = theState.auth.isAuthenticated;
  const allProducts = theState.allProducts.allProducts;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initial = selectedProduct;
  const [singleProduct, setSingleProduct] = useState(initial);
  useEffect(() => {
    if (!initial) {
      const filteredProducts = allProducts.find((item) =>
        item.title?.includes(location.productName)
      );
      setSingleProduct(filteredProducts);
    }
  }, [allProducts, initial, location]);

  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();
  const { refetchCart } = useOutletContext();

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
    window.scrollTo(0, 0);
    dispatch(selectProduct(product));
  };

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

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  const relatedProducts = shuffleArray(allProducts).slice(0, 12);

  return (
    <>
      {isAdding ? (
        <div className="modal_bar">
          <BarsLoader color={""} height={50} />
        </div>
      ) : (
        ""
      )}
      {isAdding ? <div className="modal-backdrop"></div> : ""}
      <div className="lg:w-[80%] mx-auto my-20">
        <div className="lg:flex gap-10">
          <div className="zoom-wrapper lg:h-[500px] lg:w-1/2 bg-white shadow-xl border-t-2 border-primary flex items-center justify-center">
            <img src={(selectedProduct || singleProduct)?.imageUrl} alt="" />
          </div>

          <div className="lg:w-1/2 lg:p-0 p-5">
            <p className="title lg:text-3xl text-xl text-primary font-bold">
              {(selectedProduct || singleProduct)?.title}
            </p>
            <p className="price text-primary lg:text-2xl font-bold mt-3">
              {countryCurrency(selectedProduct || singleProduct, country)}{" "}
              {countryPrice(selectedProduct || singleProduct, country)}
            </p>

            <div className="description text-base px-10 my-5 leading-10">
              {(selectedProduct || singleProduct)?.collectionDecription}
            </div>

            <div>
              <h1 className="text-black font-bold text-2xl my-2">
                Avalability:{" "}
                <span className="text-primary font-light">in stock</span>{" "}
              </h1>
            </div>

            <p className="text-primary mt-1">
              Categories:{" "}
              <span>
                {(selectedProduct || singleProduct)?.categories.join(", ")}
              </span>
            </p>

            <Button
              btnClick={() => addToCart(selectedProduct || singleProduct)}
              btnStyle={"bg-primary text-white w-full mt-3"}
              btnText={"Add To Cart"}
            />
          </div>
        </div>
      </div>

      <div className="relative lg:w-[80%] mx-auto my-20">
        <h1 className="text-2xl font-bold mb-6 uppercase">
          Customers who viewed this also viewed
        </h1>
        <div
          className={`lg:px-0 px-5 grid lg:grid-cols-4 grid-cols-2 gap-x-5 gap-y-10`}
        >
          {relatedProducts.map((product) => (
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

export default ProductDetails;
