'use client';

import { Button } from "@/components/ui/button";
import { AssetRecordType, CostRecordType, IncomeRecordType } from "@/lib/type";
import { useEffect, useState } from "react";
import { AssetAddButton } from "./asset-add-button";
import { ChevronRight, Link } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
    const [totalIncomeCost, setTotalIncomeCost] = useState<number | string> ("載入中...");

        useEffect(() => {
        const CalculatingTotal = () => {
            let assets = 0;
            let debits = 0;
            let income_cost = 0;

            Assets.forEach((asset) => {
                assets += asset.value;
                
                if(asset.value < 0) debits += asset.value;
            })

            Incomes.forEach((income) => {
                income_cost += income.value;
            })

            Costs.forEach((cost) => {
                income_cost -= cost.value;
            })
    
            setTotalAssets(assets);
            setTotalDebit(debits);
            setTotalIncomeCost(income_cost);
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
                    (typeof totalIncomeCost === "string") ? 'text-black dark:text-white' : 
                    (totalIncomeCost < 0) ? 'text-red-500' : 'text-green-600'
                }`}>
                    ${totalIncomeCost}
                </div>
                <p>本月收支</p>
            </div>
            <div className="flex flex-col justify-center">
                <AssetAddButton userId={userId}>新增資產</AssetAddButton>
            </div>
        </div>
    );
}