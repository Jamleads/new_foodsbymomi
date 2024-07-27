import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetOrderDetailsQuery } from "../services/order";
import BarsLoader from "../utilities/BarsLoader";
import { errorToast } from "../utilities/ToastMessage";

const OrderDetails = () => {
  const { id } = useParams();

  const [triggerGetOrderDetails, { isLoading }] = useLazyGetOrderDetailsQuery();
  useEffect(() => {
    const orderDetails = async () => {
      try {
        const res = await triggerGetOrderDetails(id).unwrap();
        console.log("the res for order details", res);
      } catch (error) {
        errorToast(error?.message);
      }
    };

    window.scrollTo(0, 0);
    orderDetails();
  }, [id, triggerGetOrderDetails]);

  return (
    <>
      {isLoading ? (
        <div className="modal">
          <BarsLoader color={""} height={50} />
        </div>
      ) : (
        ""
      )}
      {isLoading ? <div className="modal-backdrop"></div> : ""}
      <div>
        {" "}
        order {id}
        OrderDetails Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Temporibus quasi quia aperiam facilis est quae autem vitae nulla rem
        exercitationem pariatur odio laudantium modi velit labore voluptatem
        cupiditate, sapiente dolorum?
      </div>
    </>
  );
};

export default OrderDetails;
