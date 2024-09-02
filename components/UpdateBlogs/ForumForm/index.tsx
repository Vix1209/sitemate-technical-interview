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
import createForumFormSchema from "@/schemas/createForumForm_zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "./RichTextEditor";
import { usePostForumTopicMutation } from "@/features/slices/communityPage/Forum/forumApi.Slice";
import { useRouter } from "next/navigation";

const TopicForm = () => {
  const form = useForm<z.infer<typeof createForumFormSchema>>({
    resolver: zodResolver(createForumFormSchema),
    defaultValues: {
      description: "",
    },
  });
  const Router = useRouter();
  const [postTopic, { isLoading }] = usePostForumTopicMutation();
  const onSubmit = async (values: z.infer<typeof createForumFormSchema>) => {
    await postTopic(values)
      .unwrap()
      .then((data) => {
        Router.push("/community/forum");
      })
      .catch((error) => {
        if (error.status === 400) {
          Router.push("/auth/login");
        }
      });
  };

  return (
    <div className="w-full mb- mt-5 xl:m-0 montserrat">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="header"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-3 items-center">
                    <FormControl>
                      <Textarea
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
                      {/* <Textarea
                        placeholder="Text(body)"
                        className="montserrat pb-20 overflow-y-auto overflow-x-hidden"
                        {...field}
                       /> */}
                      <RichTextEditor
                        classname="montserrat overflow-x-hidden whitespace-pre-wrap rich-text-editor"
                        placeholders="Text(body)"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-x-4 ms-3">
                <Link href={""}>
                  <div className="relative w-[20px] h-[20px]">
                    <Image src={"/icons/imageIcon.svg"} alt={""} fill />
                  </div>
                </Link>
                <Link href={""}>
                  <div className="relative w-[20px] h-[20px]">
                    <Image src={"/icons/videoIcon.svg"} alt={""} fill />
                  </div>
                </Link>
              </div>

              <Button
                className={`bg-pri-1 text-white w-[162px] h-[45px] ${
                  isLoading ? "bg-[#80ABCE]" : "bg-pri-1"
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

export default TopicForm;
