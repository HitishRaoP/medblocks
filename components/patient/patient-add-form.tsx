'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatientFormType, PatientSchema } from '@/schemas/patient-form-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Gender, PatientStatus } from '@/types/enums';
import { format } from 'date-fns';
import { usePatientForm } from '@/hooks/use-patient-form';

export function PatientAddForm() {
    const { form, onSubmit } = usePatientForm();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl><Input type="date" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full border rounded px-3 py-2">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input type="email" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="emergency_contact"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Emergency Contact</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="insurance_provider"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Insurance Provider</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="insurance_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Insurance Number</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full border rounded px-3 py-2">
                                        <option value="Inpatient">Inpatient</option>
                                        <option value="Outpatient">Outpatient</option>
                                        <option value="Discharged">Discharged</option>
                                        <option value="Emergency">Emergency</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Vitals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <FormField
                            control={form.control}
                            name="vitals.temperature"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Temperature</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vitals.systolic_bp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Systolic BP</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vitals.diastolic_bp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diastolic BP</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vitals.pulse"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pulse</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vitals.spo2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>SpO2</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vitals.recorded_at"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recorded At</FormLabel>
                                    <FormControl><Input type="datetime-local" value={format(field.value, "yyyy-MM-dd'T'HH:mm")} onChange={(e) => field.onChange(new Date(e.target.value))} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
}
