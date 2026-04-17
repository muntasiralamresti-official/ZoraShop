import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = apiService;