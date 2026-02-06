import * as z from "zod";

export const UserSignUp = z.object({
  username: z.string().min(3, "The Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(7, "Password must be at least 7 characters long"),
});
