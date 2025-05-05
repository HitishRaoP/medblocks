'use client'

import { getRecordFromId } from '@/actions/get-record-from-id'
import React from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useQuery } from '@tanstack/react-query'
import { Patient, Staff } from '@/types'
import { dateToAge } from '@/lib/dayjs'
import { Calendar, Clock4, Stethoscope, Timer, User } from 'lucide-react'
import { cn, text } from '@/lib/utils'
import { PatientStatus } from '@/types/enums'

const statusBgMap: Record<PatientStatus, string> = {
    Inpatient: 'bg-blue-100 text-blue-800',
    Outpatient: 'bg-lime-100 text-lime-800',
    Discharged: 'bg-amber-100 text-amber-800',
    Emergency: 'bg-pink-100 text-pink-800',
};

export const ProfileMini = ({
    id,
    user,
    size = "large"
}: {
    id: string,
    user: "staff" | "patient",
    size?: "large" | "small"
}) => {
    const { data } = useQuery({
        queryKey: ['profile', id, user],
        queryFn: () => getRecordFromId<Staff & Patient>(id, user)
    });

    const age = `${dateToAge(new Date(data?.dob as string))}`

    return (
        <div className={cn("flex items-center gap-4", size === 'large' ? 'mb-6' : '')}>
            <Avatar className={size === 'large' ? 'h-12 w-12' : 'h-8 w-8'}>
                <AvatarFallback
                >
                    {data?.first_name?.at(0)?.toUpperCase()}
                </AvatarFallback>
            </Avatar>

            {size === 'large' && (
                <div className="flex flex-col">
                    {/* Name and Status */}
                    <div className="flex items-center gap-4">
                        <span className="text-base font-medium">{data?.first_name}</span>
                        {data?.status && (
                            <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", `${statusBgMap[data.status]}`)}>
                                {data.status}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-4 mt-1 text-sm text-gray-500 items-center">
                        {
                            user === 'patient' ?
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4 text-gray-400" />
                                    <span>{data?.gender}</span>
                                </div> :
                                <div className="flex items-center gap-1">
                                    <Stethoscope className="h-4 w-4 text-gray-400" />
                                    <span>{data?.specialization}</span>
                                </div>
                        }
                        {
                            user === 'patient' ?
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span>{age}</span>
                                </div> :
                                <div className="flex items-center gap-1">
                                    <Clock4 className="h-4 w-4 text-gray-400" />
                                    <span>{text(data?.type)}</span>
                                </div>
                        }
                    </div>
                </div>
            )}

            {/* Small: Just Name and Avatar */}
            {size === 'small' && (
                <span className="text-sm font-medium">{data?.first_name}</span>
            )}
        </div>
    )
}
