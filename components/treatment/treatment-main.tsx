import React from 'react'
import { ClinicDatatable } from '../ui/clinic-data-table'
import { Treatment } from '@/types'
import { TreatmentColumns } from './treatment-columns'
import { TreatmentAddButton } from './treatment-add-button'

export const TreatmentMain = ({ treatments, count }: { treatments: Treatment[], count: number }) => {
    return (
        <ClinicDatatable
            columns={TreatmentColumns}
            data={treatments}
            title={'Treatment'}
            count={count}
            searchKey={'name'}
            searchPlaceholder='Treatment'
            addButton={<TreatmentAddButton />}
        />
    )
}
