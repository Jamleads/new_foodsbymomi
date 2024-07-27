import { api } from "./api";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addItemToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add",
        method: "POST",
        body: data,
      }),
    }),
    getCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "PUT",
        body: data,
      }),
    }),
    removeItemFromCart: builder.mutation({
      query: (data) => ({
        url: `/cart/remove-product`,
        method: "POST",
        body: data,
      }),
    }),
    clearCart: builder.query({
      query: () => ({
        url: "/cart/clear-cart",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddItemToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveItemFromCartMutation,
  useLazyClearCartQuery,
} = cartApi;
