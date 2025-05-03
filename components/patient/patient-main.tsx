'use client';

import { Patient } from '@/types';
import { PatientCard } from './patient-card';
import { PatientHeader } from './patient-header';

export const PatientMain = ({ patients }: { patients: Patient[] }) => {
	return (
		<div className="bg-muted mx-auto rounded-lg px-4 py-8 sm:px-6">
			<PatientHeader />
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{patients.map((p, i) => (
					<PatientCard
						key={i}
						category="Child"
						count={250}
						growth={19}
						percentage="15%"
						conditions="asthma, common cold, immunizations"
						iconColor="text-blue-500"
					/>
				))}
				<PatientCard
					category="Teen"
					count={599}
					growth={65}
					percentage="30%"
					conditions="acne, sports injuries, mental health"
					iconColor="text-purple-500"
				/>
				<PatientCard
					category="Adult"
					count={880}
					growth={115}
					percentage="58%"
					conditions="hypertension, diabetes, pregnancy"
					iconColor="text-green-500"
				/>
				<PatientCard
					category="Older"
					count={150}
					growth={10}
					percentage="7%"
					conditions="arthritis, heart disease, dementia"
					iconColor="text-orange-500"
				/>
			</div>
		</div>
	);
};
