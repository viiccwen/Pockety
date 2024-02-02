"use client";

import { Button } from "@/components/ui/button";
import { CostMapType, CostRecordType, IncomeMapType, IncomeRecordType } from "@/lib/type";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface InfoProps {
    costs: CostRecordType[];
    incomes: IncomeRecordType[];
}

export const InfoTable = ({ costs, incomes } : InfoProps) => {
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
                    <div>
                        <div className="flex">
                            <p className={`p-1 rounded-lg text-white ${CostMapType.has(record.category) ? 'bg-red-500' : 'bg-green-400'}`}>{record.value}</p>
                        </div>
                    </div>
                    
                    <p>{CostMapType.has(record.category) ? CostMapType.get(record.category) : IncomeMapType.get(record.category)}</p>
                    <p>{record.createdAt.toLocaleDateString()}</p>

                    {/* TODO: Implement record page with single record information */}
                    <div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/assets/record/${record.id}`}><ChevronRight /></Link>
                        </Button>
                    </div>
                </div>
            ))}
        </>
    )
};