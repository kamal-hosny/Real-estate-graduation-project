import { z } from "zod";

const PropertyTypeEnum = z.enum([
  "Townhouse",
  "Villa",
  "Private House",
  "Apartment",
  "Office",
  "Shop",
]);

const createPropertySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: PropertyTypeEnum, 
  price: z.string().min(1, { message: "Price must be positive number" }),
  status: z.enum(["For Sale", "For Rent"]),
  description: z.string().min(10, { message: "Minimum 10 characters required" }),
  location: z.object({
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    link: z.string().url().optional(),
    images: z.instanceof(FileList).refine(files => files.length > 0, "At least one image required")
    .refine(files => files.length <= 10, "Maximum 10 photos allowed")
    .refine(files => Array.from(files).every(file => file.type.startsWith('image')), "Only im ages are allowed")
  }),
  details: z.object({
    beds: z.string().min(0, { message: "Invalid beds number" }),
    baths: z.string().min(0, { message: "Invalid baths number" }),
    rooms: z.string().min(0, { message: "Invalid rooms number" }),
    area: z.string().min(1, { message: "Area must be positive" }),
    floor: z.string().optional(),
    verification: z.boolean().optional()
  }),
  company: z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    phone: z.string().min(8, { message: "Invalid phone number" }),
    email: z.string().email({ message: "Invalid email address" }),
    avatar: z.string().optional()
  })
});

type createPropertyType = z.infer<typeof createPropertySchema>;

export { createPropertySchema, type createPropertyType };