import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card';
import { ArrowRight, Calendar, Stethoscope, User, Users } from 'lucide-react';
import Link from 'next/link';
import { DashboardChart } from './dashboard-chart';
import { DashboardAppointments } from './dashboard-appointments';

type Dashboard = {
    "Total Patients": number;
    "Total Appointments": number;
    "Total Treatments": number;
    "Total Staff": number;
}

const icons: Record<keyof Omit<Dashboard, "Graph">, React.JSX.Element> = {
    'Total Appointments': <Calendar />,
    'Total Patients': <User />,
    'Total Staff': <Users />,
    'Total Treatments': <Stethoscope />
}

const links: Record<keyof Omit<Dashboard, "Graph">, string> = {
    'Total Appointments': '/appointments',
    'Total Patients': '/patients',
    'Total Staff': '/staff-list',
    'Total Treatments': '/treatments'
}

export const DashboardMain = ({ dashboard }: { dashboard: Omit<Dashboard, "Graph"> }) => {
    return (
        <div>
            <div className='flex gap-4'>
                {
                    Object.entries(dashboard).map(([k, v]) => (
                        <Card className='w-full pb-0' key={k}>
                            <CardContent className='flex gap-4'>
                                <div className='border p-2 bg-muted rounded-md w-fit'>
                                    {icons[k as keyof Omit<Dashboard, "Graph">]}
                                </div>
                                <div>
                                    <div className='text-sm'>{k}</div>
                                    <div className='font-semibold'>{v}</div>
                                </div>
                            </CardContent>
                            <Link href={links[k as keyof Omit<Dashboard, "Graph">]}>
                                <CardFooter className='bg-muted py-4 text-emerald-500 font-semibold'>
                                    <span className='text-sm mr-2'>See Details</span>
                                    <ArrowRight size={18} />
                                </CardFooter>
                            </Link>
                        </Card>
                    ))
                }
            </div>
            <div className='flex'>
                <DashboardChart />
                <DashboardAppointments />
            </div>
        </div>
    )
}
