import { Gender, PatientStatus } from "@/types/enums";
import { z } from "zod";

export const VitalsSchema = z.object({
    temperature: z.string(),
    systolic_bp: z.number(),
    diastolic_bp: z.number(),
    pulse: z.number(),
    spo2: z.number(),
    recorded_at: z.date()
});
export type VitalsFormType = z.infer<typeof VitalsSchema>;

export const PatientSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    dob: z.string(),
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
