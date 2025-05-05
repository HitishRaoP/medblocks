'use client';

import React from 'react';
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { AppointmentAddForm } from './appointment-add-form';

export const AppointmentAddButton = () => {
	return (
		<Sheet>
			<Button asChild variant={'outline'}>
				<SheetTrigger>
					<Plus className="h-4 w-4" />
					<span className="hidden sm:flex">Add Appointment</span>
				</SheetTrigger>
			</Button>
			<SheetContent className="overflow-y-auto rounded-l-lg">
				<SheetTitle>Add Appointment</SheetTitle>
				<div className="px-4">
					<AppointmentAddForm />
				</div>
			</SheetContent>
		</Sheet>
	);
};
