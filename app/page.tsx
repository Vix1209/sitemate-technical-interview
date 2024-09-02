import BlogForm from "@/components/Dashboard/ForumForm";
import { TableDemo } from "@/components/Dashboard/Table";
import Image from "next/image";

export default function Home() {
  return (
    <main className="m-10">
      <BlogForm />
      <TableDemo />
    </main>
  );
}
