'use client';

import { getRecordFromId } from '@/actions/get-record-from-id';
import { type Vitals } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Thermometer, HeartPulse, Droplet, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function PatientVitals({ id }: { id: string }) {
	const { data } = useQuery({
		queryKey: ['Vitals'],
		queryFn: () => getRecordFromId<Vitals>(id, 'vitals'),
	});

	return (
		<Card className="mb-4">
			<CardHeader>
				<CardTitle className="text-muted-foreground">Patient Vitals</CardTitle>
			</CardHeader>
			<CardContent className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4 rounded-md text-sm">
				<div className="flex items-center gap-2">
					<Thermometer className="text-blue-500" size={20} />
					<div>
						<div className="font-medium">Temperature</div>
						<div className="text-gray-600">{data?.temperature}°F</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Droplet className="text-blue-500" size={20} />
					<div>
						<div className="font-medium">Blood Pressure</div>
						<div className="text-gray-600">
							{data?.systolic_bp}/{data?.diastolic_bp} mmHg
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<HeartPulse className="text-blue-500" size={20} />
					<div>
						<div className="font-medium">Pulse</div>
						<div className="text-gray-600">{data?.pulse} bpm</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Activity className="text-blue-500" size={20} />
					<div>
						<div className="font-medium">SpO₂</div>
						<div className="text-gray-600">{data?.spo2}%</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
