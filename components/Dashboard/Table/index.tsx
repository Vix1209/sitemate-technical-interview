"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "@/features/slices/blog/blogApi.sllice";
import Link from "next/link";
import { useState } from "react";

export function TableDemo() {
  const { data: BlogQuery, isError } = useGetBlogQuery();
  console.log(BlogQuery);

  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id).unwrap(); // Trigger the DELETE request
    } catch (error) {
      console.error("Failed to delete the blog: ", error);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your blogs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {BlogQuery?.map((blog: any, index: number) => (
            <TableRow key={blog.title}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell className="text-right">{blog.description}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">...</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href={`/update-blog/${blog.id}`}>
                          <Button>Edit</Button>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(blog.id)}
                          disabled={isLoading} // Disable the button while deleting
                        >
                          {isLoading ? "Deleting..." : "Delete"}
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
