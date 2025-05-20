import { type StaffType, type WeekDay } from "@/types/enums";
import { z } from "zod";

export const StaffSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    specialization: z.string().optional(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
    working_days: z.array(z.custom<WeekDay>()),
    type: z.custom<StaffType>(),
    kmc: z.string()
});

export type StaffFormType = z.infer<typeof StaffSchema>;
