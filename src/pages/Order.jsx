import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../services/order";
import BarsLoader from "../utilities/BarsLoader";
import { useNavigate } from "react-router-dom";

const tHead = "text-[16px] border-rborder-gray-400 py-3 capitalize px-5";
const tData = "border-rborder-gray-400 capitalize py-3 truncate px-5";

const Order = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState(null);
  const { data } = useGetAllOrdersQuery();
  useEffect(() => {
    if (data) {
      setAllOrders(data?.orders || data?.order);
    }
  }, [data, setAllOrders]);

  const selectOrder = (order) => {
    navigate(`/order_details/${order.id}`);
  };
  return (
    <>
      {!allOrders ? (
        <div className="modal_bar">
          <BarsLoader color={""} height={50} />
        </div>
      ) : (
        ""
      )}
      {!allOrders ? <div className="modal-backdrop"></div> : ""}

      <div className="md:w-[80%] mx-auto my-20 w-[95%] overflow-x-scroll">
        <table className="divide-gray-200 w-full shadow-2xl">
          <thead className=" bg-secondary">
            <tr className="bg-theGreen">
              <td className={`${tHead}`}>S/N</td>
              <td className={`${tHead}`}>Amount</td>
              <td className={`${tHead}`}>Status</td>
              <td className={`${tHead}`}>Order date</td>
              <td className={`${tHead}`}>Action</td>
            </tr>
          </thead>

          <tbody>
            {allOrders?.map((order, index) => (
              <tr className={`border-b`} key={index}>
                <td className={`${tData}`}>{index + 1}</td>
                <td className={`${tData}`}>
                  {order?.currency} {Number(order?.total).toLocaleString()}
                </td>

                <td className={`${tData}`}>
                  <span
                    className={`${
                      order?.status === "Pending"
                        ? "text-red-500"
                        : order?.status === "Processing"
                        ? "text-yellow-500"
                        : ""
                    } font-bold`}
                  >
                    {order?.status}
                  </span>
                </td>
                <td className={`${tData}`}>
                  {new Date(order.created_at).toDateString()}
                </td>
                <td className={`${tData}`}>
                  <span
                    className="py-2 px-5 bg-primary text-white cursor-pointer"
                    onClick={() => selectOrder(order)}
                  >
                    {order?.status === "Pending" ? "Reorder" : "View"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
