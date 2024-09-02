import { apiSlice } from "..";
interface BlogProp {
  id?: string;
  title: string;
  description: string;
}

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlog: builder.query<BlogProp[], void>({
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

    CreateBlog: builder.mutation<BlogProp, BlogProp>({
      query: (body) => ({
        url: "/blog",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),

    UpdateBlog: builder.mutation<BlogProp, BlogProp>({
      query: ({ title, description, id }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: { title, description },
      }),
      invalidatesTags: ["Blog"],
    }),

    DeleteBlog: builder.mutation<BlogProp, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useCreateBlogMutation,
} = blogApiSlice;
