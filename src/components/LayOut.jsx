import Nav from "./Nav.jsx";
import { useEffect, useState } from "react";
import Footer from "./Footer.jsx";
import Loader from "./Loader.jsx";
import store from "../app/store.js";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getLocationByIp } from "../features/Location.js";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import PopModal from "./PopModal.jsx";
import { useGetAllProductQuery } from "../services/product.js";
import { setAllProducts } from "../features/AllProductSlice.js";
import {
  setAllCategories,
  setProducts,
} from "../features/CategoryProductSlice.js";
import { useGetAllCategoriesQuery } from "../services/categories.js";
import Login from "./Login.jsx";
import { setAuthFormOpen } from "../features/AuthSlice.js";
import { useGetCartQuery } from "../services/cart.js";
import { setCartList } from "../features/CartSlice.js";

const LayOutKid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [popUp, setPopUp] = useState(true);

  const { data, isLoading } = useGetAllProductQuery();
  const { data: cartData, isFetching, refetch } = useGetCartQuery();
  const { data: categoryData, isLoading: isLoadingCat } =
    useGetAllCategoriesQuery();

  const theState = useSelector((state) => state);
  const isAuthenticated = theState.auth.isAuthenticated;
  const locationStatus = theState?.location.status;
  const allProducts = theState?.allProducts.allProducts;
  const authFormOpen = theState?.auth.authFormOpen;
  console.log("theState", theState);

  useEffect(() => {
    dispatch(getLocationByIp());
  }, [dispatch]);

  // Setting product to state
  useEffect(() => {
    if (!isLoadingCat) {
      dispatch(setAllCategories(categoryData?.product_categorys));
    }
  }, [categoryData, dispatch, isLoadingCat]);

  useEffect(() => {
    if (!isFetching) {
      dispatch(setCartList(cartData?.cart || cartData?.carts));
    }
  }, [isFetching, dispatch, cartData]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setAllProducts(data?.products));
    }
  }, [data, dispatch, isLoading]);

  // setting state product to category products
  useEffect(() => {
    if (allProducts?.length > 0) {
      dispatch(setProducts(allProducts));
    }
  }, [allProducts, dispatch]);
  // setAllCategories

  return (
    <>
      {authFormOpen && (
        <div>
          <Login />
        </div>
      )}
      {authFormOpen && (
        <div
          onClick={() => dispatch(setAuthFormOpen(false))}
          className="modal-backdrop"
        ></div>
      )}

      <ToastContainer />

      {locationStatus === "loading" || !allProducts ? (
        <div className="w-full h-[100vh] flex items-center justify-center bg-[#a8cc4515]">
          <Loader color={"#354231"} width={1000} />
        </div>
      ) : (
        <div className={`relative w-full`}>
          {!isAuthenticated && (
            <div
              className={`${
                pathname !== "/waitlist" && pathname !== "/shop" && popUp
                  ? ""
                  : "hidden"
              }`}
            >
              <PopModal openForm={() => navigate("/waitlist")} />
            </div>
          )}
          {!isAuthenticated && (
            <div
              onClick={() => setPopUp(false)}
              className={`${
                pathname !== "/waitlist" && pathname !== "/shop" && popUp
                  ? ""
                  : "hidden"
              } modal-backdrop`}
            ></div>
          )}

          <div className="">
            <Nav />
          </div>

          {/* LEC: PATHNAME AND OUTLET */}
          <div className="mt-[115px]">
            {pathname !== "/" && pathname !== "/waitlist" ? (
              <div className="show h-[16vh] w-full flex items-center bg-[#F2F0FF]">
                <div className="w-[70%] mx-auto">
                  <h1 className="text-2xl font-bold text-primary capitalize">
                    {pathname.slice(1).replace(/%20/g, " ")}
                  </h1>
                  <p>
                    Home{" "}
                    <span className="text-pimary">
                      {pathname[0] +
                        " " +
                        pathname.substring(1).replace(/%20/g, " ")}
                    </span>
                  </p>
                  <p></p>
                </div>
              </div>
            ) : (
              ""
            )}

            <Outlet context={{ refetchCart: refetch }} />
          </div>

          {/* LEC: FOOTTER */}
          {pathname !== "/waitlist" && (
            <div className={`footer`}>
              <Footer />
            </div>
          )}
        </div>
      )}
    </>
  );
};

const LayOut = () => {
  return (
    <>
      <Provider store={store}>
        <LayOutKid />
      </Provider>
    </>
  );
};

export default LayOut;
