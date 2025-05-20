'use client';


import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTreatmentForm } from '@/hooks/use-treatment-form';
import { useFieldArray } from 'react-hook-form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import {
	Timeline,
	TimelineContent,
	TimelineHeader,
	TimelineIndicator,
	TimelineItem,
	TimelineSeparator,
	TimelineTitle,
} from '@/components/ui/timeline';
import { CalendarIcon, Plus, Trash } from 'lucide-react';
import { Badge } from '../ui/badge';
import { getAllRecords } from '@/actions/get-all-records';
import { type Patient, type Staff } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';

export const AddTreatmentForm = () => {
	const { form, onSubmit } = useTreatmentForm();

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'appointments',
	});

	const { data: PatientData } = useQuery({
		queryKey: ['patients'],
		queryFn: () => getAllRecords<Patient>('patient'),
	});

	const { data: DoctorData } = useQuery({
		queryKey: ['doctors'],
		queryFn: () => getAllRecords<Staff>('staff'),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Treatment Name</FormLabel>
							<FormControl>
								<Input placeholder="e.g., Physiotherapy" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Treatment Description</FormLabel>
							<FormControl>
								<Textarea placeholder="Brief description" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-between gap-4">
					<FormField
						control={form.control}
						name="patientId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Patient</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a patient" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{PatientData?.data?.map((patient) => (
											<SelectItem key={patient.id} value={patient.id}>
												{patient.first_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="doctorId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Doctor</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl className="w-full">
										<SelectTrigger>
											<SelectValue placeholder="Select a patient" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{DoctorData?.data?.map((d) => (
											<SelectItem key={d.id} value={d.id}>
												{d.first_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex items-center justify-between gap-4">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input placeholder="Price" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="duration"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Duration {'(in hours)'}</FormLabel>
								<FormControl>
									<Input placeholder="Duration" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="space-y-4 rounded-md border p-4">
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium">Appointments</p>
						<Button
							type="button"
							onClick={() =>
								append({
									date: new Date(),
									start_time: new Date().toTimeString(),
									end_time: new Date().toTimeString(),
									status: 'Scheduled',
									visit_number: fields.length + 1,
								})
							}
						>
							<Plus className="h-4 w-4" />
							<span> Add Appointment </span>
						</Button>
					</div>

					{/* Timeline Section */}
					<Timeline defaultValue={1}>
						{fields.map((item, index) => (
							<TimelineItem
								key={item.id}
								step={index + 1}
								className="group-data-[orientation=vertical]/timeline:ms-10"
							>
								<TimelineHeader>
									<TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
									<TimelineTitle className="-mt-1.5 flex items-center justify-between">
										<Badge variant={'secondary'}>{item.status}</Badge>
										<Button
											type="button"
											variant={'outline'}
											onClick={() => remove(index)}
											className="col-span-1 md:col-span-3"
										>
											<Trash className="text-red-500" />
										</Button>
									</TimelineTitle>
									<TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
										<span>{index + 1}</span>
									</TimelineIndicator>
								</TimelineHeader>
								<TimelineContent className="my-4 space-y-4">
									{/* Date */}
									<FormField
										control={form.control}
										name={`appointments.${index}.date`}
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel>Date</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																className={cn(
																	'pl-3 text-left font-normal',
																	!field.value && 'text-muted-foreground',
																)}
															>
																{field.value ? (
																	format(field.value, 'PPP') // Custom date format (e.g. "June 7th, 2025")
																) : (
																	<span>Pick a date</span>
																)}
																<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="flex space-x-4">
										{/* Start Time */}
										<FormField
											control={form.control}
											name={`appointments.${index}.start_time`}
											render={({ field }) => (
												<FormItem className="flex-1">
													<FormLabel>Start Time</FormLabel>
													<FormControl>
														<Input type="time" step="1" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* End Time */}
										<FormField
											control={form.control}
											name={`appointments.${index}.end_time`}
											render={({ field }) => (
												<FormItem className="flex-1">
													<FormLabel>End Time</FormLabel>
													<FormControl>
														<Input type="time" step="1" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									{/* Notes */}
									<FormField
										control={form.control}
										name={`appointments.${index}.notes`}
										render={({ field }) => (
											<FormItem className="mt-4">
												<FormLabel>Notes</FormLabel>
												<FormControl>
													<Textarea {...field} className="resize-none" />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</TimelineContent>
							</TimelineItem>
						))}
					</Timeline>
				</div>

				<Button type="submit" className="mb-4 w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};
