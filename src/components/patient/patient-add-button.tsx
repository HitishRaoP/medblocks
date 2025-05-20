
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { PatientAddForm } from './patient-add-form';

export const PatientAddButton = () => {
	return (
		<Sheet>
			<Button asChild variant={'outline'}>
				<SheetTrigger>
					<Plus className="h-4 w-4" />
					<span className="hidden sm:flex">Add Patient</span>
				</SheetTrigger>
			</Button>
			<SheetContent className="overflow-y-auto rounded-l-lg">
				<SheetTitle>Add Patient</SheetTitle>
				<div className="px-4">
					<PatientAddForm />
				</div>
			</SheetContent>
		</Sheet>
	);
};
