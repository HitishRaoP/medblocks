import { Gender, PatientStatus } from './enums';

export interface Patient {
	id: string;
	first_name: string;
	last_name: string;
	dob: string;
	gender: Gender;
	phone: string;
	email: string;
	address?: string;
	emergency_contact?: string;
	insurance_provider?: string;
	insurance_number?: string;
	status: PatientStatus;
}

export interface Staff {
	id: string;
	first_name: string;
	last_name: string;
	role: string;
	specialization?: string;
	phone: string;
	email: string;
	address: string;
	kmc: string;
}
