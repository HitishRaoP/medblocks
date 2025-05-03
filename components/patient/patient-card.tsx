import { Info, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PatientCardProps {
	category: string;
	count: number;
	growth: number;
	percentage: string;
	conditions: string;
	iconColor?: string;
}

export const PatientCard = ({
	category,
	count,
	growth,
	percentage,
	conditions,
	iconColor = 'text-blue-500',
}: PatientCardProps) => {
	return (
		<div className="rounded-lg bg-white p-4">
			<div className="mb-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="font-medium">{category}</span>
					<Info className="h-4 w-4 text-gray-400" />
				</div>
				<Button
					variant="outline"
					size="sm"
					className="h-auto px-3 py-1 text-xs"
				>
					See Details
				</Button>
			</div>
			<div className="mb-3 flex items-center gap-2">
				<User className={`h-5 w-5 ${iconColor}`} />
				<div className="flex items-baseline gap-2">
					<span className="text-3xl font-bold">{count}</span>
					<span className="text-sm text-green-500">+{growth}</span>
				</div>
			</div>
			<div>
				<span className="font-medium">{percentage}</span>
				<span className="text-sm text-gray-500">
					{' '}
					- Common conditions: {conditions}.
				</span>
			</div>
		</div>
	);
};
