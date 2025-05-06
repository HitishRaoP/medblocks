import { Gender, PatientStatus } from "@/types/enums";
import { z } from "zod";

export const VitalsSchema = z.object({
    temperature: z.string(),
    systolic_bp: z.coerce.number(),
    diastolic_bp: z.coerce.number(),
    pulse: z.coerce.number(),
    spo2: z.coerce.number(),
    recorded_at: z.date()
});
export type VitalsFormType = z.infer<typeof VitalsSchema>;

export const PatientSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    dob: z.date(),
    gender: z.custom<Gender>(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string().optional(),
    emergency_contact: z.string().optional(),
    insurance_provider: z.string().optional(),
    insurance_number: z.string().optional(),
    status: z.custom<PatientStatus>(),
    vitals: VitalsSchema,
});

export type PatientFormType = z.infer<typeof PatientSchema>;
