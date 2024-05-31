import { apiSlice } from "../../redux/apiSlice";

export const eventLogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEventsLog: builder.query({
      query: (params) => ({
        url: "/event-logs",
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetEventsLogQuery } = eventLogsApi;
