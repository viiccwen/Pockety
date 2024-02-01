"use client";

import { CostMapType, CostRecordType, IncomeMapType, IncomeRecordType } from "@/lib/type";
import { useEffect, useState } from "react";

interface InfoProps {
    costs: CostRecordType[];
    incomes: IncomeRecordType[];
}

export const InfoTable = ({ costs, incomes } : InfoProps) => {
    const [infoArray, setInfoArray] = useState<(CostRecordType | IncomeRecordType) []>([]);

    // Merge costs and incomes with date
    useEffect(() => {
        let info_table = [...costs, ...incomes].sort((a, b) => {
            return a.createdAt.getDate() - b.createdAt.getDate();
        });
        setInfoArray(info_table);
    }, [costs, incomes])
    

    return (
        <>
            {infoArray.map((record, index) => (
                <div key={index} className="grid grid-cols-5 gap-3 p-5">
                    <div>
                        <p className={`${CostMapType.has(record.category) ? 'bg-red-500' : 'bg-green-400'}`}>{record.value}</p>
                    </div>
                    <p>{CostMapType.has(record.category) ? CostMapType.get(record.category) : IncomeMapType.get(record.category)}</p>
                    <p>{record.createdAt.toLocaleDateString()}</p>
                </div>
            ))}
        </>
    )
};