import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const phoneSlice = createApi({
  reducerPath: "phoneApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.restful-api.dev/",
  }),
  endpoints: (builder) => ({
    getPhones: builder.query<any[], void>({
      query: () => "objects",
    }),
  }),
});

export const { useGetPhonesQuery } = phoneSlice;
export default phoneSlice;
