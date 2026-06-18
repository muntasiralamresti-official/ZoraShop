import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    credentials: "include",
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ category, search, limit = 20, skip = 0 } = {}) => {
        const params = new URLSearchParams({
          limit: String(limit),
          skip: String(skip),
        });

        if (search) {
          params.set("q", search);
          return `/products/search?${params.toString()}`;
        }

        if (category) {
          return `/products/category/${encodeURIComponent(category)}?${params.toString()}`;
        }

        return `/products?${params.toString()}`;
      },
    }),
    getCategoryList: build.query({
      query: () => "/products/category-list",
    }),
    getProductDetails: build.query({
      query: (id) => `/products/${id}`,
    }),
    searchProduct: build.query({
      query: (search) =>
        `/products/search?${new URLSearchParams({ q: search }).toString()}`,
    }),
    login: build.mutation({
      query: (data) => ({
       url: `/auth/login`,
       method: "POST",
       body: data,
      }),
    }),
    user: build.query({
      query: () => ({
        url: `/auth/me`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoryListQuery,
  useGetProductDetailsQuery,
  useLazySearchProductQuery,
  useUserQuery,
  useLoginMutation,
} = apiService;
