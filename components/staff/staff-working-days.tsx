import { cn } from '@/lib/utils';
import { WeekDay, WeekDays } from '@/types/enums';
import React from 'react'

export const StaffWorkingDays = ({ days }: { days: WeekDay[] }) => {
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="flex justify-start gap-1">
            {WeekDays.map((day, i) => {
                const isActive = days.includes(day);
                return (
                    <div
                        key={i}
                        className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                            isActive
                                ? 'bg-blue-400 text-white'
                                : 'bg-gray-100 text-gray-400',
                        )}
                    >
                        {weekDays[i]}
                    </div>
                );
            })}
        </div>
    )
}
