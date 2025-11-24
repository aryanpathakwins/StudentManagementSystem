import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PhoneEntry {
  id?: number;
  studentName: string;
  phone: string;
  issueDate: string;
}

export const phoneEntriesApi = createApi({
  reducerPath: "phoneEntriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["PhoneEntries"],
  endpoints: (builder) => ({
    getPhones: builder.query<PhoneEntry[], void>({
      query: () => "phoneEntries",
      providesTags: ["PhoneEntries"],
    }),

    addPhone: builder.mutation<PhoneEntry, Omit<PhoneEntry, "id">>({
      query: (phoneEntry) => ({
        url: "phoneEntries",
        method: "POST",
        body: phoneEntry,
      }),
      invalidatesTags: ["PhoneEntries"],
    }),

    updatePhone: builder.mutation<PhoneEntry, PhoneEntry>({
      query: ({ id, ...phoneEntry }) => ({
        url: `phoneEntries/${id}`,
        method: "PUT",
        body: phoneEntry,
      }),
      invalidatesTags: ["PhoneEntries"],
    }),

    deletePhone: builder.mutation<void, number>({
      query: (id) => ({
        url: `phoneEntries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PhoneEntries"],
    }),
  }),
});

export const {
  useGetPhonesQuery,
  useAddPhoneMutation,
  useUpdatePhoneMutation,
  useDeletePhoneMutation,
} = phoneEntriesApi;
