import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    bloodType: z.string(),
    location: z.string(),
    bio: z.string(),
    lastDonationDate: z.string(),
  }),
});
const updateUserValidation = z.object({
  body: z.object({
    age: z.number().optional(),
    bio: z.string().optional(),
  }),
});

export const UserValidationSchema = {
  createUserValidationSchema,
  updateUserValidation,
};
