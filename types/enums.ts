export const Genders = ['Male', 'Female', 'Other'] as const;

export type Gender = (typeof Genders)[number];

export const PatientStatuses = [
	'Inpatient',
	'Outpatient',
	'Discharged',
	'Emergency',
] as const;

export type PatientStatus = (typeof PatientStatuses)[number];
