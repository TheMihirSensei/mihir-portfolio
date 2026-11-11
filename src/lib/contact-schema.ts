import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name must be at least 2 characters").max(80),
  email: z.email("email must be a valid address"),
  message: z.string().trim().min(10, "message must be at least 10 characters").max(4000),
  // honeypot: real users never see or fill this
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
