import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    orderCheckOut: builder.mutation({
      query: (data) => ({
        url: `/order/check-out`,
        method: "POST",
        body: data,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/user/orders/me",
        method: "GET",
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/user/orders/${orderId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useOrderCheckOutMutation,
  useGetAllOrdersQuery,
  useLazyGetOrderDetailsQuery,
} = orderApi;
