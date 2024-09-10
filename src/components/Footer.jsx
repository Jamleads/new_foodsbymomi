import { Link } from "react-router-dom";
import { LogoBg } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { selectedCatProduct } from "../features/CategoryProductSlice";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareWhatsapp, FaSquareXTwitter } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";

const Footer = () => {
  const dispatch = useDispatch();

  const allCategories = useSelector(
    (state) => state?.categoryProduct.allcategories
  );
  const allProducts = useSelector((state) => state.allProducts.allProducts);

  const handleCategoryClick = (category) => {
    const theArray = allProducts.filter((item) =>
      item.categories.includes(category)
    );
    const data = { categoryName: category, categoryProducts: theArray };
    dispatch(selectedCatProduct(data));
  };
  return (
    <div className="footer bg-[#EEEFFB]">
      <div className="text-center w-[70%] mx-auto">
        Could not find the product you need? click{" "}
        <Link to="request">
          <span className="text-xl text-red-600 font-bold cursor-pointer">
            here
          </span>
        </Link>{" "}
        to make a request
      </div>

      <div className="footer-top lg:p-0 px-5 py-5">
        <div className="footer-top-wrap lg:w-[70%] mx-auto lg:py-20 flex lg:flex-row flex-col-reverse justify-between gap-5">
          <div className="lg:w-2/5">
            <div className="w-full bg-[#ffffff] my-3 flex items-center justify-between">
              <input type="text" className="w-[70%] py-2 px-5" />
              <button className="py-2 px-5 text-xs bg-primary shadow-2xl rounded-md text-white font-bold">
                Sign Up
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              <p className="text-[#8A8FB9] text-sm">Contact Address</p>
              <li className="text-[#8A8FB9] text-sm list-disc">
                FoodsbyMomi Ltd No 2, Adenuga Street Off Williams Estate ,
                Surulere Lagos , Nigeria +234-909 011 0000
              </li>
              <li className="text-[#8A8FB9] text-sm list-disc">
                FoodsbyMomi Ltd 128, City Road London Ec1v2nx +44 20 8133 9447
              </li>
            </ul>

            <div className="mt-5">
              <p className="text-2xl">Powered by:</p>
              <div className="flex items-center gap-3">
                <Link to="/">
                  <div className="w-[100px] h-[50px]flex items-center justify-center">
                    <img src={LogoBg} alt="logo" width="80%" />
                  </div>
                </Link>
                <a href="https://alat.ng/" target="_blank">
                  <img
                    src="https://res.cloudinary.com/dkmddgqsl/image/upload/v1723429676/cropped-ALAT_By_Wema_Bank-removebg-preview_mjuxj6.png"
                    alt="alatpay logo"
                    className="w-[100px]"
                  />
                </a>
                <a href="https://wemabank.com/" target="_blank">
                  <img
                    src="https://res.cloudinary.com/dkmddgqsl/image/upload/v1723429446/wemaFull-logo_efew3u.svg"
                    alt="the wema logo"
                    className="w-[100px]"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-links-wrap lg:w-1/5">
            <p className="text-[#000000] text-xl font-bold">Catagories</p>
            <ul className="mt-5">
              {allCategories?.slice(0, 6)?.map((category) => (
                <Link
                  key={category.id}
                  to={`/${category.name}`}
                  onClick={() => handleCategoryClick(category.category)}
                >
                  <li className="text-[#8A8FB9] py-1 text-sm">
                    {category.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="footer-links-wrap lg:w-1/5">
            <p className="text-[#000000] text-xl font-bold">Customer Care</p>
            <ul className="mt-5">
              <a href="#">
                <li className="text-[#8A8FB9] text-sm">My Account</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Discount</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Returns</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Orders History</li>
              </a>
              <a href="#">
                <li className="text-[#8A8FB9] text-sm mt-2">Order Tracking</li>
              </a>
            </ul>
          </div>

          <div className="footer-links-wrap lg:w-1/5">
            <p className="text-[#000000] text-xl font-bold">Pages</p>
            <ul className="mt-5 flex flex-col gap-2">
              <li className="text-[#8A8FB9] text-sm">
                <Link to="/">Home</Link>
              </li>
              <li className="text-[#8A8FB9] text-sm">
                <Link to="shop">Shop</Link>
              </li>
              <li className="text-[#8A8FB9] text-sm">
                <Link to="orders">Order History</Link>
              </li>
              {/* <li className="text-[#8A8FB9] text-sm">
                <a
                  href="https://pricelist.foodsbymomi.com/wholesales_pricelist.pdf"
                  target="_blank"
                >
                  Wholesales Price List
                </a>
              </li>
              <li className="text-[#8A8FB9] text-sm">
                <a
                  href="https://pricelist.foodsbymomi.com/retail_pricelist.pdf"
                  target="_blank"
                >
                  Retail Price List
                </a>
              </li> */}
              <li className="text-[#8A8FB9] text-sm">
                <Link to="about_us">About Us</Link>
              </li>
              <li className="text-[#8A8FB9] text-sm">
                <Link to="rewards">Rewards</Link>
              </li>
              <li className="text-[#8A8FB9] text-sm">
                <Link to="policy">Privacy & Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom bg-[#E7E4F8] lg:p-0 px-5 py-5">
        <div className="footer-button-wrap flex items-center justify-between py-2 lg:w-[60%] mx-auto">
          <p className="text-[#8A8FB9] md:text-base text-sm">
            &copy;<a href="/">Foodsbymomi</a> - All Rights Reserved
          </p>
          <div className="flex items-center gap-3 rounded-full">
            <a href="mailto:hello@foodsbymomi.com" target="_blank">
              <MdAttachEmail className="text-3xl text-primary font-bold" />
            </a>
            <a href="https://wa.me/+447376368788" target="_blank">
              <FaSquareWhatsapp className="text-3xl text-primary font-bold" />
            </a>
            <a
              href="https://www.linkedin.com/company/foodsbymomi-limited/mycompany/"
              target="_blank"
            >
              <FaLinkedin className="text-3xl text-primary font-bold" />
            </a>
            <a
              href="https://www.instagram.com/reel/C_sL1NfoSWS/?igsh=eTdrdHphdXNqOHg="
              target="_blank"
            >
              <FaInstagramSquare className="text-3xl text-primary font-bold" />
            </a>
            <a href="https://x.com/foodsbymomi" target="_blank">
              <FaSquareXTwitter className="text-3xl text-primary font-bold" />
            </a>
            <a href="https://www.facebook.com/foodsbymomi" target="_blank">
              <FaFacebookSquare className="text-3xl text-primary font-bold" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
