import * as z from "zod";

export const EditProfile = z.object({
  username: z.string().min(3, "The Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits long"),
  address1: z.string().min(10, "Address must be at least 10 characters long"),
  address2: z.string().optional(),
  profilePicture: z.string().optional(),
});
