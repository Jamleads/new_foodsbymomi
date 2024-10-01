import {
  useLazyClearCartQuery,
  useRemoveItemFromCartMutation,
  useUpdateCartMutation,
} from "../services/cart";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import BarsLoader from "../utilities/BarsLoader";
import { countryCurrency, countryPrice } from "../utilities/PriceSelection";
import { errorToast, successToast } from "../utilities/ToastMessage";
import { Link, useOutletContext } from "react-router-dom";
import { useOrderCheckOutMutation } from "../services/order";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { refetchCart } = useOutletContext();
  const [cartValues, setCartValues] = useState([]);
  const [itemTotalAry, setItemTotalAry] = useState(null);
  const [paymentPopup, setPaymentPopup] = useState(null);

  const theState = useSelector((state) => state);
  const cart = theState.cart?.cartList;
  const customerDetails = theState?.auth?.user;
  const country = theState.location?.location?.country?.name;

  const [removeItemFromCart, { isLoading: loading2 }] =
    useRemoveItemFromCartMutation();
  const [updateCart, { isLoading }] = useUpdateCartMutation();
  const [triggerClearCart, { isLoading: isClearing }] = useLazyClearCartQuery();
  const [orderCheckOut, { isLoading: isflutterwave }] =
    useOrderCheckOutMutation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://web.alatpay.ng/js/alatpay.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    if (cart?.length > 0) {
      setCartValues(
        cart.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          productImg: item.imageUrl,
          price: countryPrice(item, country),
          countryCode: countryCurrency(item, country),
          total: countryPrice(item, country) * item.quantity,
        }))
      );
    }
  }, [cart, country]);

  //  LEC Price Calculation
  useEffect(() => {
    const totalAry = cartValues?.map((item) => item?.total);
    setItemTotalAry(totalAry);
  }, [cartValues]);

  const overAllItemTotal = itemTotalAry?.reduce((pre, now) => pre + now, 0);
  const fee = (overAllItemTotal / 100) * 5;
  const chekOutTotal = overAllItemTotal + fee;

  const increaseCount = async (item) => {
    const payLoad = {
      id: item.id,
      quantity: item.quantity + 1,
    };
    try {
      await updateCart(payLoad).unwrap();
      refetchCart();
      successToast("Cart updated");
    } catch (error) {
      errorToast(error?.message);
    }
  };
  const decreaseCount = async (item) => {
    if (item.quantity > 1) {
      const payLoad = {
        id: item.id,
        quantity: item.quantity - 1,
      };
      try {
        await updateCart(payLoad).unwrap();
        refetchCart();
        successToast("Cart updated");
      } catch (error) {
        errorToast(error?.message);
      }
    } else {
      removeItem(item.id);
    }
  };

  const removeItem = async (id) => {
    const payLoad = {
      id: id,
    };
    try {
      await removeItemFromCart(payLoad).unwrap();
      refetchCart();
      successToast("Product removed successfully");
    } catch (error) {
      errorToast(error?.message);
    }
  };

  const clearCart = async () => {
    try {
      await triggerClearCart().unwrap();
      refetchCart();
      setCartValues([]);
      successToast("Cart cleard");
    } catch (error) {
      errorToast(error?.message);
    }
  };

  const fluterwaveCheckout = async () => {
    const payLoad = {
      method: "flutterwave",
      response: {
        total: chekOutTotal,
        currencyCode: cartValues[0]?.countryCode,
      },
    };
    try {
      const res = await orderCheckOut(payLoad).unwrap();
      window.location = res.paymentLink;
    } catch (error) {
      errorToast(error?.message);
    }
  };
  const showPayment = () => {
    const [firstName, ...lastNameParts] = customerDetails.name.split(" ");
    const lastName = lastNameParts.join(" ");
    if (window.Alatpay) {
      let popup = window.Alatpay.setup({
        apiKey: import.meta.env.VITE_ALATPAY_API_KEY,
        businessId: import.meta.env.VITE_ALATPAY_BUSINESS_ID,
        email: customerDetails?.email,
        phone: customerDetails?.phone,
        firstName: firstName,
        lastName: lastName,
        metaData: null,
        currency: cartValues[0]?.countryCode,
        amount: chekOutTotal,
        onTransaction: function (response) {
          forAlatOrder(response);
          closePayment();
        },
        onClose: function () {
          setPaymentPopup(null);
        },
      });
      popup.show();
      setPaymentPopup(popup);
    } else {
      errorToast("Selected payment method not available");
    }
  };
  const closePayment = () => {
    if (paymentPopup) {
      paymentPopup.close();
      setPaymentPopup(null); // Clear the reference after closing
    }
  };
  const forAlatOrder = async (alatResponse) => {
    try {
      const payLoad = {
        method: "alart_pay",
        response: alatResponse,
      };
      const res = await orderCheckOut(payLoad).unwrap();
      successToast(res?.message);
      window.location = "https://Foodsbymomi.com/orders";
    } catch (error) {
      errorToast(error?.message);
    }
  };

  return (
    <>
      {isLoading || loading2 || isClearing || isflutterwave ? (
        <div className="modal">
          <BarsLoader color={""} height={50} />
        </div>
      ) : (
        ""
      )}
      {isLoading || loading2 || isClearing || isflutterwave ? (
        <div className="modal-backdrop"></div>
      ) : (
        ""
      )}

      <div className="relative">
        <section
          className={`cartSection lg:w-[80%] w-full h-auto mx-auto lg:mt-24 mt-10 my-20 flex gap-10 overflow-x-hidden`}
        >
          {cart?.length ? (
            <div className="lg:w-2/3 py-5 border-y-2 border-green-200">
              <div className="flex items-center lg:mb-8 lg:px-0 px-3">
                <div className="product-side w-2/5 lg:text-xl text-xs text-primary font-bold">
                  Products
                </div>

                <div className="price-side w-3/5 flex item-center justify-between text-start">
                  <div className="w-1/3 lg:text-xl text-xs text-primary font-bold">
                    Price
                  </div>
                  <div className="w-1/3 lg:text-xl text-xs text-primary font-bold">
                    Quantity
                  </div>
                  <div className="w-1/3 lg:text-xl text-xs text-primary font-bold">
                    Total
                  </div>
                </div>
              </div>

              {cartValues?.map((item, index) => (
                <CartItem
                  key={index}
                  {...item}
                  increase={() => increaseCount(item)}
                  decrease={() => decreaseCount(item)}
                  removeItem={() => removeItem(item.id)}
                />
              ))}

              <div className="cart-btns flex items-center justify-between mt-10 lg:mx-0">
                <Link to="/shop">
                  <Button
                    btnText={"Update Cart"}
                    btnStyle={`lg:text-base text-xs bg-primary text-white`}
                  />
                </Link>

                <Button
                  btnText="Clear Cart"
                  btnStyle={`lg:text-base text-xs bg-[#ff0000] text-white`}
                  btnClick={clearCart}
                />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center text-navyBlue lg:text-2xl py-10">
                Cart is empty. click{" "}
                <Link to="/shop" className="text-pink font-bold">
                  Here
                </Link>{" "}
                to see products
              </p>
            </div>
          )}

          <div className="lg:w-1/3 ml-auto w-full">
            <div className="cart-totals lg:px-0 px-3 sticky bg-primary border-2">
              <h1 className="text-center lg:text-xl my-5 text-white font-bold">
                Cart Totals
              </h1>

              <div className="items-total p-5 bg-[#F4F4FC]">
                <div className="flex items-center justify-between py-5 border-b-2 border-[#E8E6F1]">
                  <p className="lg:text-lg text-[#101750] text-bold">
                    {"Item's total:"}{" "}
                    <span className="total-items">({cartValues?.length})</span>
                  </p>
                  <p className="lg:text-lg text-[rgb(16,23,80)] text-bold">
                    {Number(overAllItemTotal?.toFixed(2)).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between py-5 border-b-2 border-[#E8E6F1]">
                  <p className="lg:text-lg text-[#101750] text-bold">
                    Fees 5%:
                  </p>
                  <p className="lg:text-lg text-[#101750] text-bold">
                    {/* {fee.toLocaleString()} */}
                    {Number(fee?.toFixed(2)).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between py-5 border-b-2 border-[#E8E6F1]">
                  <p className="lg:text-lg text-[#101750] text-bold">Total:</p>
                  <p className="lg:text-lg text-[#101750] text-bold">
                    {Number(chekOutTotal?.toFixed(2)).toLocaleString()}
                  </p>
                </div>

                <div className="mt-10 mb-5 flex md:flex-row flex-col gap-5">
                  {/* <button
                    className="px-8 py-3 bg-[#fb9129] checkoutBtn w-full text-mainWhite"
                    onClick={fluterwaveCheckout}
                  > 
                    Flutterwave
                  </button> */}
                  <button
                    className="px-8 py-3 bg-[#bf0926] checkoutBtn w-full text-mainWhite"
                    onClick={showPayment}
                  >
                    AlatPay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
