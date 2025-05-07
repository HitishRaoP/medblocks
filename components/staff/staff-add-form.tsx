"use client"

import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useStaffForm } from '@/hooks/use-staff-form';
import { StaffTypes, WeekDays } from '@/types/enums';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { usePGlite } from '@electric-sql/pglite-react';

export const StaffAddForm = () => {
    const db = usePGlite();
    const { form, onSubmit } = useStaffForm(db);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    name="specialization"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Specialization</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
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
                    name="working_days"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Working Days</FormLabel>
                            <FormControl>
                                <div className="grid grid-cols-2 gap-2">
                                    {WeekDays.map((day) => (
                                        <label key={day} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={day}
                                                checked={field.value.includes(day)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    const updated = checked
                                                        ? [...field.value, day]
                                                        : field.value.filter((d) => d !== day);
                                                    field.onChange(updated);
                                                }}
                                            />
                                            <span>{day}</span>
                                        </label>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select staff type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {StaffTypes.map((type) => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="kmc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>KMC</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
