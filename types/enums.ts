export const Genders = ['Male', 'Female', 'Other'] as const;

export type Gender = (typeof Genders)[number];

export const PatientStatuses = [
	'Inpatient',
	'Outpatient',
	'Discharged',
	'Emergency',
] as const;

export type PatientStatus = (typeof PatientStatuses)[number];

export const StaffTypes = ['Full_time', 'Part_time'] as const;

export const WeekDays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
] as const;

export type WeekDay = (typeof WeekDays)[number];

export type StaffType = (typeof StaffTypes)[number];

export const AppointmentStatuses = [
	'Scheduled',
	'Completed',
	'Missed',
	'Cancelled',
] as const;

export type AppointmentStatus = (typeof AppointmentStatuses)[number];
