"use client";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import { useEffect, useState } from "react";

type Data = {
  title: string;
  description: string;
};

export function TableDemo() {
  const [data, setData] = useState<Data | any>();

  useEffect(() => {
    // Fetch data from the API route
    fetch("https://server-aquatrack-community.onrender.com/blog")
      .then((response) => response.json())
      .then((data: Data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
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
          {data?.map((blog: any, index: number) => (
            // <TableRow key={blog.title}>
            //   <TableCell className="font-medium">{index}</TableCell>
            //   <TableCell>{blog.title}</TableCell>
            //   <TableCell className="text-right">{blog.description}</TableCell>
            //   <TableCell className="text-right">
            //     <DropdownMenu>
            //       <DropdownMenuTrigger asChild>
            //         <Button variant="outline">Open</Button>
            //       </DropdownMenuTrigger>
            //       <DropdownMenuContent className="w-56">
            //         <DropdownMenuLabel>My Account</DropdownMenuLabel>
            //         <DropdownMenuSeparator />
            //         <DropdownMenuGroup>
            //           <DropdownMenuItem>
            //             <User className="mr-2 h-4 w-4" />
            //             <span>Profile</span>
            //             <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            //           </DropdownMenuItem>
            //           <DropdownMenuItem>
            //             <CreditCard className="mr-2 h-4 w-4" />
            //             <span>Billing</span>
            //             <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            //           </DropdownMenuItem>
            //           <DropdownMenuItem>
            //             <Settings className="mr-2 h-4 w-4" />
            //             <span>Settings</span>
            //             <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            //           </DropdownMenuItem>
            //           <DropdownMenuItem>
            //             <Keyboard className="mr-2 h-4 w-4" />
            //             <span>Keyboard shortcuts</span>
            //             <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            //           </DropdownMenuItem>
            //         </DropdownMenuGroup>
            //         <DropdownMenuSeparator />
            //         <DropdownMenuGroup>
            //           <DropdownMenuItem>
            //             <Users className="mr-2 h-4 w-4" />
            //             <span>Team</span>
            //           </DropdownMenuItem>
            //           <DropdownMenuSub>
            //             <DropdownMenuSubTrigger>
            //               <UserPlus className="mr-2 h-4 w-4" />
            //               <span>Invite users</span>
            //             </DropdownMenuSubTrigger>
            //             <DropdownMenuPortal>
            //               <DropdownMenuSubContent>
            //                 <DropdownMenuItem>
            //                   <Mail className="mr-2 h-4 w-4" />
            //                   <span>Email</span>
            //                 </DropdownMenuItem>
            //                 <DropdownMenuItem>
            //                   <MessageSquare className="mr-2 h-4 w-4" />
            //                   <span>Message</span>
            //                 </DropdownMenuItem>
            //                 <DropdownMenuSeparator />
            //                 <DropdownMenuItem>
            //                   <PlusCircle className="mr-2 h-4 w-4" />
            //                   <span>More...</span>
            //                 </DropdownMenuItem>
            //               </DropdownMenuSubContent>
            //             </DropdownMenuPortal>
            //           </DropdownMenuSub>
            //           <DropdownMenuItem>
            //             <Plus className="mr-2 h-4 w-4" />
            //             <span>New Team</span>
            //             <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            //           </DropdownMenuItem>
            //         </DropdownMenuGroup>
            //         <DropdownMenuSeparator />
            //         <DropdownMenuItem>
            //           <Github className="mr-2 h-4 w-4" />
            //           <span>GitHub</span>
            //         </DropdownMenuItem>
            //         <DropdownMenuItem>
            //           <LifeBuoy className="mr-2 h-4 w-4" />
            //           <span>Support</span>
            //         </DropdownMenuItem>
            //         <DropdownMenuItem disabled>
            //           <Cloud className="mr-2 h-4 w-4" />
            //           <span>API</span>
            //         </DropdownMenuItem>
            //         <DropdownMenuSeparator />
            //         <DropdownMenuItem>
            //           <LogOut className="mr-2 h-4 w-4" />
            //           <span>Log out</span>
            //           <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            //         </DropdownMenuItem>
            //       </DropdownMenuContent>
            //     </DropdownMenu>
            //   </TableCell>
            // </TableRow>

            <div key={index}>{blog.title}</div>
          ))}
        </TableBody>
      </Table>

      <div>
        <Link href="/updateform">Update</Link>
        <Link href="delete">Delete</Link>
      </div>
    </div>
  );
}
