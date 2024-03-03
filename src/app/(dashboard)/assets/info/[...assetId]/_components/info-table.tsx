"use client";

import { Button } from "@/components/ui/button";
import { AssetRecordType, CostMapType, CostRecordType, IncomeMapType, IncomeRecordType } from "@/lib/type";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RecordEditForm } from "@/components/record-edit-form";
import { InfoItem } from "./info-item";

interface InfoProps {
    costs: CostRecordType[];
    incomes: IncomeRecordType[];
    assets: AssetRecordType[] | undefined;
    userId: string;
}

export const InfoTable = ({ costs, incomes, userId, assets } : InfoProps) => {
    const [infoArray, setInfoArray] = useState<(CostRecordType | IncomeRecordType) []>([]);

    // Merge costs and incomes with date
    useEffect(() => {
        let info_table = [...costs, ...incomes].sort((a, b) => {
            return b.createdAt.getTime() - a.createdAt.getTime();
        });
        setInfoArray(info_table);
    }, [costs, incomes])

    return (
        <>
            {infoArray.map((record, index) => (
                <div key={index} className="grid grid-cols-7 gap-3 p-5 items-center">
                    <div className="col-start-2">
                        <div className="flex">
                            <p className={`p-1 rounded-lg text-white ${CostMapType.has(record.category) ? 'bg-red-500' : 'bg-green-400'}`}>{record.value}</p>
                        </div>
                    </div>
                    
                    <p>{CostMapType.has(record.category) ? CostMapType.get(record.category) : IncomeMapType.get(record.category)}</p>
                    <p>{record.createdAt.toLocaleDateString()}</p>

                    <InfoItem 
                        curType={CostMapType.has(record.category) ? 1 : 2} 
                        record={record}
                        userId={userId}
                        assets={assets}
                    />
                </div>
            ))}
        </>
    )
};