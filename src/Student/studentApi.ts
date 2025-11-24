import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Subject {
  id: string | number;
  name: string;
}

export interface ClassNameType {
  id: string | number | null;
  name: string;
}

export interface Student {
  id?: number;
  name: string;
  className: ClassNameType;
  subjects: Subject[];
}

export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["Students"],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => "students",
      providesTags: ["Students"],
    }),
    
    addStudent: builder.mutation<Student, Omit<Student, "id">>({
      query: (student) => ({
        url: "students",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
    
    updateStudent: builder.mutation<Student, Student>({
      query: ({ id, ...student }) => ({
        url: `students/${id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
    
    deleteStudent: builder.mutation<void, number>({
      query: (id) => ({
        url: `students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
    
    clearAllStudents: builder.mutation<void, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const studentsResult = await fetchWithBQ("students");
        if (studentsResult.error) return { error: studentsResult.error };
        
        const students = studentsResult.data as Student[];
        const deletePromises = students.map((student) =>
          fetchWithBQ({
            url: `students/${student.id}`,
            method: "DELETE",
          })
        );
        
        await Promise.all(deletePromises);
        return { data: undefined };
      },
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useClearAllStudentsMutation,
} = studentsApi;1