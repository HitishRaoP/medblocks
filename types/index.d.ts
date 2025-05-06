import { AppointmentStatus, Gender, PatientStatus } from './enums';

export interface Vitals {
	id: string;
	patient_id: string;
	temperature: number;
	systolic_bp: number;
	diastolic_bp: number;
	pulse: number;
	spo2: number;
	recordedAt: Date;
}

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
	vitals: Vitals;
}

export interface Staff {
	id: string;
	first_name: string;
	last_name: string;
	specialization?: string;
	phone: string;
	email: string;
	address: string;
	working_days: WeekDay[];
	type: StaffType;
	kmc: string;
}

export type Appointment = {
	id: string;
	treatment_id: string;
	date: Date;
	start_time: string;
	end_time: string;
	status: AppointmentStatus;
	notes?: string;
	visit_number: number;
};

export type Treatment = {
	id: string;
	name: string;
	description?: string;
	appointments?: Appointment[];
	patient_id: string;
	doctor_id: string;
	price: number;
	duration: number;
};

export type AppointmentExtended = Appointment & {
	staff: Staff;
	patient: Patient;
	treatment: Treatment;
};

export type AppointmentRequest = Omit<Appointment, 'id' | 'treatment_id'>;

export type PatientRequest = Omit<Patient, "id">

export type StaffRequest = Omit<Staff, "id">