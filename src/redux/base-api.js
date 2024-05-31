// src/redux/base-api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseUrl } from '../utils/config';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({}),
});
