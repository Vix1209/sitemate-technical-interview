"use client";

import { z } from "zod";

const createForumFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(10, { message: "Message is required" }),
});

export default createForumFormSchema;
