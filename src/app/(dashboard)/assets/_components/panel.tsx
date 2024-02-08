'use client';

import { useEffect, useState } from "react";

import { AssetRecordType, CostRecordType, IncomeRecordType } from "@/lib/type";
import { GetAssetsValue, GetDebitValue, GetMonthlyTotal } from "@/lib/calculating";

import { AssetAddButton } from "./asset-add-button";

interface PanelProps {
    userId: string;
    Assets: AssetRecordType[];
    Incomes: IncomeRecordType[];
    Costs: CostRecordType[];
};

export const Panel = ({
    userId,
    Assets,
    Incomes,
    Costs
} : PanelProps) => {
    const [totalAssets, setTotalAssets] = useState<number | string> ("載入中...");
    const [totalDebit, setTotalDebit] = useState<number | string> ("載入中...");
    const [curMonthlyTotal, setCurMonthlyTotal] = useState<number | string> ("載入中...");

        useEffect(() => {
        const CalculatingTotal = () => {
            const assetsValue = GetAssetsValue(Assets);
            const debitsValue = GetDebitValue(Assets);
    
            setTotalAssets(assetsValue);
            setTotalDebit(debitsValue);
            
            const year = (new Date()).getFullYear();
            const month = (new Date()).getMonth() + 1;
            const total = GetMonthlyTotal(year, month, Costs, Incomes);
        
            setCurMonthlyTotal(total);
        }

        CalculatingTotal();
    }, [Assets])

    return (
        <div className="flex space-x-[50px] h-[150px]">
            <div className="flex flex-col justify-center">
                <div className={`text-xl ${
                    (typeof totalAssets === "string") ? 'text-black dark:text-white' : 
                    (totalAssets < 0) ? 'text-red-500' : 'text-green-600'
                }`}>
                    ${totalAssets}
                </div> 
                <p>總資產</p>
            </div>

            <div className="flex flex-col justify-center">
                <div className={`text-xl ${
                    (typeof totalDebit === "string") ? 'text-black dark:text-white' : 
                    (totalDebit < 0) ? 'text-red-500' : 'text-green-600'
                }`}>
                    ${totalDebit}
                </div>
                <p>負債</p>
            </div>

            <div className="flex flex-col justify-center">
                <div className={`text-xl ${
                    (typeof curMonthlyTotal === "string") ? 'text-black dark:text-white' : 
                    (curMonthlyTotal < 0) ? 'text-red-500' : 'text-green-600'
                }`}>
                    ${curMonthlyTotal}
                </div>
                <p>本月收支</p>
            </div>
            <div className="flex flex-col justify-center">
                <AssetAddButton userId={userId}>新增資產</AssetAddButton>
            </div>
        </div>
    );
}