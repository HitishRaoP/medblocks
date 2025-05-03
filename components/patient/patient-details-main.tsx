import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PatientDetailsMainTabsList = [
	{
		name: 'Patient Information',
	},
	{
		name: 'Appointment History',
	},
	{
		name: 'Next Treatment',
	},
];

export const PatientDetailsMain = ({ id }: { id: string }) => {
	return (
		<Tabs defaultValue={PatientDetailsMainTabsList[0].name}>
			<TabsList>
				{PatientDetailsMainTabsList.map((t, i) => (
					<TabsTrigger key={i} value={t.name}>
						{t.name}
					</TabsTrigger>
				))}
			</TabsList>
			<TabsContent value="account">
				Make changes to your account here.
			</TabsContent>
			<TabsContent value="password">Change your password here.</TabsContent>
			{id}
		</Tabs>
	);
};
