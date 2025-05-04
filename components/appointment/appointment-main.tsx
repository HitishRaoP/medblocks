import React from 'react'
import { ClinicDatatable } from '../ui/clinic-data-table'
import { Appointment } from '@/types'
import { AppointmentColumns } from './appointment-columns'

export const AppointmentMain = ({ appointments, count }: { appointments: Appointment[], count: number }) => {
    return (
        <ClinicDatatable columns={AppointmentColumns} data={appointments} title={'Appointment'} count={count} searchKey={'status'} />
    )
}
