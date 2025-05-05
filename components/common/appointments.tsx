"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query';
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
import { getAllRecords } from '@/actions/get-all-records';
import { Appointment, AppointmentExtended, Patient, Staff, Treatment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ProfileMini } from '../treatment/profile-mini';

const statusBgMap: Record<AppointmentStatus, string> = {
    Scheduled: 'bg-blue-100 text-blue-700',
    Missed: 'bg-red-100 text-red-700',
    Completed: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
};


export const Appointments = ({ appointments }: { appointments: AppointmentExtended }) => {
    if (appointments.length === 0) {
        return (
            <div>
                No Results
            </div>
        )
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-muted-foreground'>
                    Patient Appointments
                </CardTitle>
            </CardHeader>
            <CardContent className='flex'>
                <ScrollArea className="w-full h-96">
                    {
                        <Timeline defaultValue={1}>
                            {appointments.map((item, index) => (
                                <TimelineItem
                                    key={item.id}
                                    step={index + 1}
                                    className="group-data-[orientation=vertical]/timeline:ms-10"
                                >
                                    <TimelineHeader>
                                        <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                                        <TimelineTitle className='flex items-center justify-between'>
                                            <Badge className={cn(`${statusBgMap[item.status]}`)}>
                                                {item.status}
                                            </Badge>
                                        </TimelineTitle>
                                        <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                                            <span>{index + 1}</span>
                                        </TimelineIndicator>
                                    </TimelineHeader>
                                    <TimelineContent className="border rounded-md p-4 mt-4 space-y-4 bg-white">
                                        {/* Appointment Date */}
                                        <div className="text-sm text-gray-700">
                                            <span className="font-medium">Date:</span> {dateToDOB(item.date)}
                                        </div>

                                        {/* Time Range */}
                                        <div className="flex items-center gap-6 text-sm text-gray-700">
                                            <div>
                                                <span className="font-medium">Start:</span> {String(item.start_time)}
                                            </div>
                                            <div>
                                                <span className="font-medium">End:</span> {String(item.end_time)}
                                            </div>
                                        </div>

                                        {/* Profiles */}
                                        <div className="flex gap-8 text-sm">
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
                    }
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
