"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { treatmentFormSchema, TreatmentFormType } from '@/schemas/treatment-form-schema';

export const useTreatmentForm = () => {
    const form = useForm<TreatmentFormType>({
        resolver: zodResolver(treatmentFormSchema),
        defaultValues: {
            name: ""
        }
    });

    function onSubmit(values: TreatmentFormType) {
        console.log(values)
    }

    return {
        form,
        onSubmit
    }
}
