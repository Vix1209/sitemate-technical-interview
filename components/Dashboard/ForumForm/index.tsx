"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import createForumFormSchema from "@/schema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "@/features/slices/blog/blogApi.sllice";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const BlogForm = () => {
  const form = useForm<z.infer<typeof createForumFormSchema>>({
    resolver: zodResolver(createForumFormSchema),
    defaultValues: {
      description: "",
    },
  });
  const Router = useRouter();
  const [postBlog, { isLoading }] = useCreateBlogMutation();
  const onSubmit = async (values: z.infer<typeof createForumFormSchema>) => {
    await postBlog(values);
  };

  return (
    <div className="mx-auto mb- mt-5 xl:m-0 montserrat">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-3 items-center">
                    <FormControl>
                      <Input
                        placeholder="Title"
                        className="montserrat h-10 overflow-y-auto overflow-x-hidden"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-3 items-center">
                    <FormControl>
                      <Input
                        placeholder="Text(body)"
                        className="montserrat pb-20 overflow-y-auto overflow-x-hidden"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button
                className={`text-white w-[162px] h-[45px] ${
                  isLoading ? "bg-[#80ABCE]" : "bg-black"
                }`}
                type="submit"
                disabled={isLoading}
              >
                Post
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BlogForm;
