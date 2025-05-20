'use client';


import { cn, text } from '@/lib/utils';
import { type Patient } from '@/types';
import { getRecordFromId } from '@/actions/get-record-from-id';
import { useQuery } from '@tanstack/react-query';
import { dateToAge } from '@/lib/dayjs';

const InfoRow: React.FC<{
	label: string;
	value?: string;
	className?: string;
}> = ({ label, value, className }) => {
	if (!value) return null;
	return (
		<div className={cn('flex items-start py-2.5', className)}>
			<div className="flex-1 overflow-ellipsis">
				<p className="text-sm text-gray-500">{label}</p>
				<p className="mt-0.5 font-medium text-gray-700 ">{value}</p>
			</div>
		</div>
	);
};

export const PatientInfoCard: React.FC<{ id: string }> = ({ id }) => {
	const { data } = useQuery({
		queryKey: ['Patient'],
		queryFn: () => getRecordFromId<Patient>(id, 'patient'),
	});

	return (
		<div className="grid grid-cols-1 rounded-md sm:grid-cols-2 overflow-hidden break-words">
			{data &&
				Object.entries(data).map(([k, v]) => (
					<InfoRow
						key={k}
						label={text(k)}
						value={k === 'dob' ? dateToAge(new Date(v)) : v}
					/>
				))}
		</div>
	);
};