'use client';

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AssetRecordType, CostRecordType, IncomeRecordType } from "@/lib/type";
import { GetMonthlyTotal } from "@/lib/calculating";


interface TotalPanelProps {
    asset_table: AssetRecordType;
    costs: CostRecordType[];
    incomes: IncomeRecordType[];
}

export const TotalPanel = ({ 
    asset_table,
    costs,
    incomes,
} : TotalPanelProps) => {
    const [curMonthlyTotal, setCurMonthlyTotal] = useState<number> (0);

    useEffect(() => {
        const year = (new Date()).getFullYear();
        const month = (new Date()).getMonth() + 1;
        const total = GetMonthlyTotal(year, month, costs, incomes);
        
        setCurMonthlyTotal(total);
    }, [costs, incomes])

    return (
        <div>
            <div className="grid grid-cols-4 gap-3 justify-center">
                <div className="absolute left-[300px]">
                    <Button size="sm" asChild>
                        <Link href="/assets"><ChevronLeft size={18} /></Link>
                    </Button>
                </div>
                <div className="col-start-2 text-center">
                    <h1 className="text-3xl font-bold">{asset_table.name}</h1>
                    <h1 className="text-lg  text-slate-500 dark:text-slate-200">帳戶資訊</h1>
                </div>
            </div>

            <div className="my-[30px] grid grid-cols-6 gap-3 space-x-5">
                <div className="col-start-2 flex flex-col ">
                    <h1 className={`font-bold text-2xl ${asset_table.value >= 0 ? ' text-green-500' : ' text-red-400'}`}>{asset_table.value}</h1>
                    <h1>餘額</h1>
                </div>
                <div className="flex flex-col ">
                    <h1  className={`font-bold text-2xl ${asset_table.value >= 0 ? ' text-green-500' : ' text-red-400'}`}>{asset_table.initial_value}</h1>
                    <h1>初始餘額</h1>
                </div>
                <div className="flex flex-col ">
                    <h1  className={`font-bold text-2xl ${curMonthlyTotal >= 0 ? ' text-green-500' : ' text-red-400'}`}>{curMonthlyTotal}</h1>
                    <h1>本月收支</h1>
                </div>
            </div>
        </div>
    );
}