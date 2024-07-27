import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Pork,
  LogoBg,
  CartIcon2,
  FavIcon2,
  LeftIcon,
  SearchIcon,
} from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { selectedCatProduct } from "../features/CategoryProductSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // const [adsMessage, setAdsMessage] = useState(0);
  const [openCategories, setOpenCategories] = useState(false);
  const [openPages, setOpenPages] = useState(false);

  const theState = useSelector((state) => state);
  const favSlice = theState?.fav;
  const cartProduct = theState?.cart?.cartList;
  const country = theState?.location?.location?.country?.name;
  const allCategories = theState?.categoryProduct.allcategories;
  const isAuthenticated = theState.auth.isAuthenticated;

  // useEffect(() => {
  //   const currentMessage = setInterval(() => {
  //     setAdsMessage((message) => (message + 1) % AdvertMessage?.length);
  //   }, 2000);
  //   return () => clearInterval(currentMessage);
  // }, []);

  const onCategories = () => {
    setOpenCategories(!openCategories);
  };
  const onPages = () => {
    setOpenPages(!openPages);
  };

  const allProducts = useSelector((state) => state.allProducts.allProducts);
  const handleCategoryClick = (category) => {
    const theArray = allProducts.filter((item) =>
      item.categories.includes(category)
    );
    const data = { categoryName: category, categoryProducts: theArray };
    dispatch(selectedCatProduct(data));
  };

  return (
    <div className="nav w-full fixed top-0 right-0 left-0 z-20 border-2">
      {/* <div className="nav-contact w-full bg-primary cursor-pointer">
        <div className="flex items-center justify-center lg:text-[20px] text-[12px] text-center font-bold text-mainWhite ">
          <a href={AdvertMessage[adsMessage].to}>
            {AdvertMessage[adsMessage].text}
          </a>
        </div>
      </div> */}

      <div className="nav-links w-full bg-mainWhite py-1">
        <div className="nav-links-wrap  lg:w-[80%] w-[100%] lg:mx-auto flex items-center lg:justify-between">
          <div className="flex items-center">
            <Link to="/">
              <div className="lg:w-[100px] w-[60px] h-[50px] flex items-center justify-center">
                <img src={LogoBg} alt="logo" width="80%" />
              </div>
            </Link>
          </div>

          <div className="flex items-center lg:w-3/5 w-full">
            <div className="search w-full flex items-center justify-between border-[1px] border-[#E7E6EF]">
              <div className="w-[40px] h-[40px] bg-primary flex items-center justify-center">
                <img src={SearchIcon} alt="" />
              </div>
              <input
                type="text"
                placeholder="Search for products.........."
                className="bg-transparent py-2 w-full lg:px-5"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="nav-profile flex items-center gap-1">
              <div className="w-[40px] h-[40px] rounded-full">
                <img
                  src={
                    theState?.auth?.user?.imageUrl
                      ? theState?.auth?.user?.imageUrl
                      : Pork
                  }
                  alt=""
                  className=" w-full rounded-full"
                />
              </div>
              <div className="text-center flex items-center justify-center flex-col text-sm px-2">
                <h1>{theState?.auth?.user?.name}</h1>
                <p>{country}</p>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link to="cart">
                <div className="cart relative w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                  <p className="absolute -top-2 right-0 font-bold text-red-500">
                    {cartProduct?.length < 1 ? "" : cartProduct?.length}
                  </p>
                  <img src={CartIcon2} alt="" className="w-[80%]" />
                </div>
              </Link>

              <Link to="favorite">
                <div className="nav-fav relative w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                  <p className="absolute -top-2 right-0 font-bold text-red-500">
                    {favSlice.length < 1 ? "" : favSlice?.length}
                  </p>
                  <img src={FavIcon2} alt="" className="w-[80%]" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-t-secondary">
        <div className="lg:w-[80%] mx-auto flex items-center justify-between">
          <div
            className={`relative px-5 py-1 bg-white flex items-center gap-3 ${
              openCategories ? "border-b-[10px] border-secondary" : ""
            }`}
            onMouseLeave={onCategories}
            onMouseEnter={onCategories}
          >
            <p>CATEGORIES</p>
            <img
              src={LeftIcon}
              alt="leftIcon"
              className={`${openCategories ? "rotate" : ""}`}
            />

            <div
              className={`${
                openCategories ? "" : "hidden"
              } absolute top-10 left-0 bg-white shadow-lg lg:w-[300px] w-full`}
            >
              <ul className="">
                {allCategories?.map((category, idx) => (
                  <Link
                    key={idx}
                    to={`/${category.name}`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <li className="px-7 py-2 cursor-pointer hover:bg-secondary uppercase">
                      {category.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          <ul className="nav-lists flex items-center gap-5 lg:ml-20 text-{#0D0E43}">
            <li>
              <Link
                to="/"
                className={pathname === "/" ? "text-secondary font-bold" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="shop"
                className={
                  pathname.includes("/shop") ? "text-secondary font-bold" : ""
                }
              >
                Shop
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link
                  to="orders"
                  className={
                    pathname.includes("/orders")
                      ? "text-secondary font-bold"
                      : ""
                  }
                >
                  Order History
                </Link>
              </li>
            )}
            <li>
              <Link
                to="wholesale_pricelist"
                className={
                  pathname.includes("/wholesale_pricelist")
                    ? "text-secondary font-bold"
                    : ""
                }
              >
                Wholesales Price List
              </Link>
            </li>
            <li>
              <Link
                to="retail_pricelist"
                className={
                  pathname.includes("/retail_pricelist")
                    ? "text-secondary font-bold"
                    : ""
                }
              >
                Retail Price List
              </Link>
            </li>
            <li>
              <Link
                to="about_us"
                className={
                  pathname.includes("/about_us")
                    ? "text-secondary font-bold"
                    : ""
                }
              >
                About Us
              </Link>
            </li>
            {/* <li>
              <Link
                to="rewards"
                className={
                  pathname.includes("/rewards")
                    ? "text-secondary font-bold"
                    : ""
                }
              >
                Rewards
              </Link>
            </li>
            <li>
              <Link
                to="policy"
                className={
                  pathname.includes("/policy") ? "text-secondary font-bold" : ""
                }
              >
                Privacy & Policy
              </Link>
            </li> */}
          </ul>

          {/* On mobile */}
          <div
            className={`md:hidden relative px-5 py-1 bg-white flex items-center gap-3 ${
              openCategories ? "border-b-[10px] border-secondary" : ""
            }`}
            onMouseLeave={onPages}
            onMouseEnter={onPages}
          >
            <img
              src={LeftIcon}
              alt="leftIcon"
              className={`${openPages ? "rotate" : ""} rotate-180`}
            />
            <p>PAGES</p>

            <div
              className={`${
                openPages ? "" : "hidden"
              } absolute top-10 left-0 bg-white shadow-lg lg:w-[300px] w-full p-3`}
            >
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/"
                    className={
                      pathname === "/" ? "text-secondary font-bold" : ""
                    }
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="shop"
                    className={
                      pathname.includes("/shop")
                        ? "text-secondary font-bold"
                        : ""
                    }
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    to="wholesale_pricelist"
                    className={
                      pathname.includes("/wholesale_pricelist")
                        ? "text-secondary font-bold"
                        : ""
                    }
                  >
                    Wholesales Price List
                  </Link>
                </li>
                <li>
                  <Link
                    to="retail_pricelist"
                    className={
                      pathname.includes("/retail_pricelist")
                        ? "text-secondary font-bold"
                        : ""
                    }
                  >
                    Retail Price List
                  </Link>
                </li>
                <li>
                  <Link
                    to="about_us"
                    className={
                      pathname.includes("/about_us")
                        ? "text-secondary font-bold"
                        : ""
                    }
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="rewards"
                    className={
                      pathname.includes("/rewards")
                        ? "text-secondary font-bold"
                        : ""
                    }
                  >
                    Rewards
                  </Link>
                </li>
                <li>
                  <Link
                    to="policy"
                    className={
                      pathname.includes("/policy")
                        ? "text-secondary font-bold"
                        : ""
                    }
                  >
                    Privacy & Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
