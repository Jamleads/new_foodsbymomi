import { api } from "./api";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVoucher: builder.query({
      query: () => ({
        url: "/user/voucher",
        method: "GET",
      }),
    }),
    getReferral: builder.query({
      query: () => ({
        url: "/user/me/referrals",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetReferralQuery, useGetVoucherQuery } = profileApi;
