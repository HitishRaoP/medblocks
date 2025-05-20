
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { StaffAddForm } from './staff-add-form';

export const StaffAddButton = () => {
    return (
        <Sheet>
            <Button asChild variant={'outline'}>
                <SheetTrigger>
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:flex">Add Staff</span>
                </SheetTrigger>
            </Button>
            <SheetContent className="overflow-y-auto rounded-l-lg">
                <SheetTitle>Add Staff</SheetTitle>
                <div className="px-4">
                    <StaffAddForm />
                </div>
            </SheetContent>
        </Sheet>
    );
};
