import { api } from "./api";

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/product-category",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
