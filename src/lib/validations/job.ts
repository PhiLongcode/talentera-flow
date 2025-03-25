
import * as z from "zod";

export const jobPostSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters."
  }).max(100),
  company: z.string().min(2, {
    message: "Company name is required."
  }),
  location: z.string().min(2, {
    message: "Location is required."
  }),
  type: z.enum(["full-time", "part-time", "contract", "freelance", "internship"]),
  category: z.string().min(2, {
    message: "Category is required."
  }),
  experience: z.enum(["entry", "mid", "senior", "executive"]),
  salary: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string().default("USD"),
    period: z.enum(["hourly", "monthly", "yearly"])
  }).refine(data => data.max === 0 || data.max > data.min, {
    message: "Maximum salary must be greater than minimum salary.",
    path: ["max"],
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters."
  }),
  requirements: z.array(z.string()).min(1, {
    message: "At least one requirement is needed."
  }),
  benefits: z.array(z.string()),
  applicationDeadline: z.date().optional(),
  contactEmail: z.string().email({
    message: "Please enter a valid email address."
  }),
});

export type JobPost = z.infer<typeof jobPostSchema>;
