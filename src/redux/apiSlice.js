import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../utils/config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("token"));

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      const dynamicHeaders = getState().header.dynamicHeaders;
      if (dynamicHeaders) {
        Object.entries(dynamicHeaders).forEach(([key, value]) => {
          headers.set(key, value);
        });
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
