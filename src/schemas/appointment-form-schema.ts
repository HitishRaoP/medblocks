import { z } from "zod";
import { treatmentAppointmentSchema } from "./treatment-form-schema";

export const appointmentSchema = z.object({
    appointments: z.array(
        treatmentAppointmentSchema.extend({
            treatment_id: z
                .string({ required_error: "Treatment ID is required" })
                .min(1, { message: "Treatment Name cannot be empty" }),
        })
    ),
});

export type AppointmentFormType = z.infer<typeof appointmentSchema>;
