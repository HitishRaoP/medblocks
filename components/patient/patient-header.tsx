import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PatientHeader = () => {
	return (
		<div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
			<div>
				<h1 className="text-2xl font-bold">Patient</h1>
				<p className="text-sm text-gray-500">
					View and update detailed patient profiles.
				</p>
			</div>
			<div className="mt-4 flex w-full space-x-2 md:mt-0 md:w-auto">
				<Button className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600">
					<Plus className="h-4 w-4" />
					Add Patient
				</Button>
			</div>
		</div>
	);
};
