"use client"

import React from 'react'
import { ScrollArea } from '../ui/scroll-area';
import {
    Timeline,
    TimelineContent,
    TimelineHeader,
    TimelineIndicator,
    TimelineItem,
    TimelineSeparator,
    TimelineTitle,
} from "@/components/ui/timeline"
import { Badge } from '../ui/badge';
import { dateToDOB } from '@/lib/dayjs';
import { cn } from "@/lib/utils"
import { AppointmentStatus } from '@/types/enums';
import { AppointmentExtended } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ProfileMini } from '../treatment/profile-mini';
import { Ban } from 'lucide-react'; // lucide-react icon

const statusBgMap: Record<AppointmentStatus, string> = {
    Scheduled: 'bg-blue-100 text-blue-700',
    Missed: 'bg-red-100 text-red-700',
    Completed: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
};

export const Appointments = ({ appointments, role }: { appointments: AppointmentExtended[], role: "patient" | "staff" }) => {
    if (appointments?.length === 0) {
        return (
            <Card className="flex items-center justify-center flex-col py-20 px-4 text-center space-y-4">
                <Ban className="h-12 w-12 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-700">No Appointments Found</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                    You currently have no {role === 'patient' ? 'upcoming' : 'scheduled'} appointments.
                    Appointments will appear here once they're available.
                </p>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-muted-foreground text-base sm:text-lg'>
                    {role === 'patient' ? 'Patient' : "Doctor"} Appointments
                </CardTitle>
            </CardHeader>
            <CardContent className='flex'>
                <ScrollArea className="w-full h-96">
                    <Timeline defaultValue={1}>
                        {appointments?.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                step={index + 1}
                                className="group-data-[orientation=vertical]/timeline:ms-10"
                            >
                                <TimelineHeader>
                                    <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                                    <TimelineTitle className='flex items-center justify-between'>
                                        <Badge className={cn(statusBgMap[item.status])}>
                                            {item.status}
                                        </Badge>
                                    </TimelineTitle>
                                    <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                                        <span>{index + 1}</span>
                                    </TimelineIndicator>
                                </TimelineHeader>
                                <TimelineContent className="border rounded-md p-4 mt-4 space-y-4 bg-white">
                                    <div className="text-sm text-gray-700">
                                        <span className="font-medium">Date:</span> {dateToDOB(item.date)}
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-gray-700">
                                        <div>
                                            <span className="font-medium">Start:</span> {String(item.start_time)}
                                        </div>
                                        <div>
                                            <span className="font-medium">End:</span> {String(item.end_time)}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-8 text-sm">
                                        <div className="flex flex-col items-start gap-3">
                                            <span className="text-xs text-gray-500">Patient</span>
                                            <ProfileMini size="small" id={item.patient.id} user="patient" />
                                        </div>
                                        <div className="flex flex-col items-start gap-3">
                                            <span className="text-xs text-gray-500">Doctor</span>
                                            <ProfileMini size="small" id={item.staff.id} user="staff" />
                                        </div>
                                    </div>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
