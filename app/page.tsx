import BlogForm from "@/components/Dashboard/PostForm";
import { TableDemo } from "@/components/Dashboard/Table";

export default function Home() {
  return (
    <main className="m-10">
      <BlogForm />
      <TableDemo />
    </main>
  );
}
