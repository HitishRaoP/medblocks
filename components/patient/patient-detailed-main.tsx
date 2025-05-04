import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientInfoCard } from './patient-info-card';
import { getRecordFromId } from '@/actions/get-record-from-id';
import { Patient } from '@/types';
import { ProfileMini } from '../treatment/profile-mini';

const PatientDetailsMainTabsList = [
	{
		name: 'Patient Information',
		content: PatientInfoCard
	},
	{
		name: 'Appointment History',
	},
];
const employeeData = {
	avatar: "/lovable-uploads/3e9cf7b5-b3f0-4575-b73d-0450f488cddf.png",
	name: "Leslie Alexander",
	isActive: true,
	gender: "Female",
	age: "32",
	position: "Sr.Project Manager",
	division: "Product & Development",
	employeeId: "EMP-20241008-007",
	email: "lesliealexander@mail.com",
	address: "9428 Main Street, Apt 98, Springfield, United States",
	phone: "+1 630 4924 9321",
	dateApplied: "12/06/2023",
	tags: [
		{ label: "Project Manager", color: "purple" },
		{ label: "Product", color: "green" },
		{ label: "Development", color: "blue" },
	]
};
export const PatientDetailsMain = ({ id }: { id: string }) => {
	return (
		<div>
			<ProfileMini id={id} user={'patient'} />
			<Tabs defaultValue={PatientDetailsMainTabsList[0].name}>
				<TabsList>
					{PatientDetailsMainTabsList.map((t, i) => (
						<TabsTrigger key={i} value={t.name}>
							{t.name}
						</TabsTrigger>
					))}
				</TabsList>
				{PatientDetailsMainTabsList.map((t, i) => (
					<TabsContent value={t.name} key={i}>
						{t.content && <t.content {...employeeData} />}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};
