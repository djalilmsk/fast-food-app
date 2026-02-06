import * as z from "zod";

export const UserLogin = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(7, "Password must be at least 7 characters long"),
});
