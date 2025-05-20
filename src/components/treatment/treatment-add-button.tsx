"use client"


import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { AddTreatmentForm } from './add-treatment-form';

export const TreatmentAddButton = () => {
	return (
		<Sheet>
			<Button asChild variant={'outline'}>
				<SheetTrigger>
					<Plus className="h-4 w-4" />
					<span className="hidden sm:flex">Add Treatment</span>
				</SheetTrigger>
			</Button>
			<SheetContent className="overflow-y-auto rounded-l-lg">
				<SheetTitle>Add Treatment</SheetTitle>
				<div className="px-4">
					<AddTreatmentForm />
				</div>
			</SheetContent>
		</Sheet>
	);
};
