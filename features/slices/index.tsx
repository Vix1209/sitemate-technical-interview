import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sitemate-technical-interview.onrender.com",
  }),
  tagTypes: ["Blog"],
  endpoints: () => ({}),
});
