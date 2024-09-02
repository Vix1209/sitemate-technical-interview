import { apiSlice } from "..";
interface blogProp {
  id?: string;
  title: string;
  description: string;
}

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlog: builder.query<blogProp[], void>({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Blog" as const,
                id,
              })),
              "Blog",
            ]
          : ["Blog"],
    }),

    CreateBlog: builder.mutation<blogProp, blogProp>({
      query: (body) => ({
        url: "/blog",
        method: "POST",
        body,
      }),
    }),

    UpdateBlog: builder.mutation<blogProp, blogProp>({
      query: ({ title, description, id }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: { title, description },
      }),
    }),

    DeleteBlog: builder.mutation<blogProp, blogProp>({
      query: ({ description, title, id }) => ({
        url: `/blog/${id}`,
        method: "DELETE",
        body: { title, description },
      }),
    }),
  }),
});

export const {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useCreateBlogMutation,
} = blogApiSlice;
