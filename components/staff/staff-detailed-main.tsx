"use client"

import React from 'react';
import { PatientInfoCard } from './patient-info-card';
import { ProfileMini } from '../treatment/profile-mini';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Appointments } from '../common/appointments';
import { useQuery } from '@tanstack/react-query';
import { getAllRecords } from '@/actions/get-all-records';
import { AppointmentExtended } from '@/types';

export const StaffDetailedMain = ({ id }: { id: string }) => {
    const { data } = useQuery({
        queryKey: ['Appointments'],
        queryFn: () => getAllRecords<AppointmentExtended>('appointment')
    });

    return (
        <div>
            <ProfileMini id={id} user={'patient'} />
            <div className='flex flex-col md:flex-row gap-4'>
                <Card className='md:min-w-3xl'>
                    <CardHeader>
                        <CardTitle className='text-muted-foreground'>
                            Patient Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex'>
                        <PatientInfoCard id={id} />
                    </CardContent>
                </Card>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle className='text-muted-foreground'>
                            Patient Appointments
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex'>
                        <Appointments appointments={ } />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
