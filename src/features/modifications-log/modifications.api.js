import { apiSlice } from "../../redux/apiSlice";

export const adminLogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminLogs: builder.query({
      query: (params) => ({
        url: "/modification-logs",
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdminLogsQuery } = adminLogsApi;
