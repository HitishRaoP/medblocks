"use client"

import React from "react";
import { cn, text } from "@/lib/utils";
import { Patient } from "@/types";
import { getRecordFromId } from "@/actions/get-record-from-id";
import { useQuery } from "@tanstack/react-query";
import { dateToAge } from "@/lib/dayjs";

const InfoRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    value?: string;
    className?: string;
}> = ({ icon, label, value, className }) => {
    if (!value) return null;
    return (
        <div className={cn("flex items-start py-2.5", className)}>
            <div className="mr-3 text-gray-400">{icon}</div>
            <div className="flex-1">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-700 mt-0.5">{value}</p>
            </div>
        </div>
    );
};

export const PatientInfoCard: React.FC<{ id: string }> = ({ id }) => {
    const { data } = useQuery({
        queryKey: ["Patient"],
        queryFn: () => getRecordFromId<Patient>(id, 'patient')
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 rounded-md">
            {
                data && Object.entries(data).map(([k, v]) => (
                    <InfoRow
                        key={k}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                        label={text(k)}
                        value={k === 'dob' ? dateToAge(new Date(v)) : v}
                    />
                ))
            }
        </div>
    );
};