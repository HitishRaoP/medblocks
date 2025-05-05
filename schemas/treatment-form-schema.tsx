import { AppointmentRequest } from "@/types";
import { AppointmentStatus } from "@/types/enums";
import { z, ZodType } from "zod";

const appointmentSchema = z.object({
    date: z.date({ required_error: "Appointment date is required" }),
    start_time: z.string({ required_error: "Start time is required" }),
    end_time: z.string({ required_error: "End time is required" }),
    status: z.custom<AppointmentStatus>(),
    notes: z.string().max(500).optional(),
    visit_number: z
        .number({ invalid_type_error: "Visit number must be a number" })
        .int({ message: "Visit number must be an integer" })
        .positive({ message: "Visit number must be greater than 0" }),
}) satisfies ZodType<AppointmentRequest>;

export const treatmentFormSchema = z.object({
    name: z
        .string({ required_error: "Treatment Name is required" })
        .min(1, { message: "Treatment Name cannot be empty" }).max(200),

    description: z
        .string()
        .max(200, { message: "Description must be at most 200 characters" })
        .optional(),

    appointments: z
        .array(appointmentSchema)
        .optional(),

    patientId: z
        .string({ required_error: "Patient ID is required" })
        .min(1, { message: "Patient ID cannot be empty" }),

    doctorId: z
        .string({ required_error: "Doctor ID is required" })
        .min(1, { message: "Doctor ID cannot be empty" }),

    price: z
        .coerce
        .number({ required_error: "Price is required", invalid_type_error: "Price must be a number" })
        .nonnegative({ message: "Price must be a positive number" }),

    duration: z
        .coerce
        .number({ required_error: "Duration is required", invalid_type_error: "Duration must be a number" })
        .positive({ message: "Duration must be greater than 0" })
        .refine(val => Number.isInteger(val), { message: "Duration must be a whole number in hours" }),
});

export type TreatmentFormType = z.infer<typeof treatmentFormSchema>;
