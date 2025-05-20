'use client';


import { useFieldArray } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
	Timeline,
	TimelineContent,
	TimelineHeader,
	TimelineIndicator,
	TimelineItem,
	TimelineSeparator,
	TimelineTitle,
} from '@/components/ui/timeline';
import { useAppointmentForm } from '@/hooks/use-appointment-form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useQuery } from '@tanstack/react-query';
import { getAllRecords } from '@/actions/get-all-records';
import { type Treatment } from '@/types';

export const AppointmentAddForm = () => {
	const { form, onSubmit } = useAppointmentForm();
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'appointments',
	});
	const { data } = useQuery({
		queryKey: ['TreatmentsForAppointmentForm'],
		queryFn: () => getAllRecords<Treatment>('treatment'),
	});

	return (
		<Form {...form}>
			<div className="mb-6 text-end">
				<Button
					type="button"
					className=""
					onClick={() =>
						append({
							treatment_id: '',
							date: new Date(),
							start_time: '',
							end_time: '',
							notes: '',
							status: 'Scheduled',
							visit_number: fields.length + 1,
						})
					}
				>
					<Plus className="mr-2 h-4 w-4" /> Add Appointment
				</Button>
			</div>
			<form onSubmit={form.handleSubmit(onSubmit)}>
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
									<Badge variant={'secondary'}>
										{form.getValues(`appointments.${index}.status`)}
									</Badge>
									<Button
										type="button"
										variant="outline"
										onClick={() => remove(index)}
									>
										<Trash className="h-4 w-4 text-red-500" />
									</Button>
								</TimelineTitle>
								<TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
									<span>{index + 1}</span>
								</TimelineIndicator>
							</TimelineHeader>
							<TimelineContent className="my-4 space-y-4">
								<FormField
									control={form.control}
									name={`appointments.${index}.treatment_id`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Treatment</FormLabel>
											<Select onValueChange={field.onChange}>
												<FormControl className="w-full">
													<SelectTrigger>
														<SelectValue placeholder="Select a Treatment" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{data?.data?.map((d) => (
														<SelectItem key={d.id} value={d.id}>
															{d.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
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
																format(field.value, 'PPP')
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

				<Button type="submit" className="mt-6">
					Submit
				</Button>
			</form>
		</Form>
	);
};
