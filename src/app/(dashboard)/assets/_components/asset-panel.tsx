"use client";

import { Button } from "@/components/ui/button";
import { AssetSuccess } from "@/lib/type/assets-type";
import { useEffect, useState } from "react";
import { AssetAddButton } from "./asset-add-button";

interface AssetsPanelProps {
    userId: string;
    AssetsArray: AssetSuccess[];
};

export const AssetsPanel = ( { userId, AssetsArray } : AssetsPanelProps ) => {
    const [totalAssets, setTotalAssets] = useState<number | string> ("載入中...");

    useEffect(() => {
        const CalculatingTotal = () => {
            let total = 0;
            
            AssetsArray.forEach((asset) => {
                total += Number(asset.value);
            })
    
            setTotalAssets(total);
        }

        CalculatingTotal();
    }, [AssetsArray])

    return (
        <div className="flex space-x-[50px] h-[150px]">
            {/* text-red-500 text-green-600 */}
            <div className="flex flex-col justify-center">
                <div className={`text-xl ${
                    (typeof totalAssets === "string") ? 'text-black dark:text-white' : 
                    (totalAssets < 0) ? 'text-red-500' : 'text-green-600'
                }`}>
                    ${totalAssets}
                </div> 
                <p>總資產</p>
            </div>

            {/* TODO: Implement debit */}
            <div className="flex flex-col justify-center">
                <div className=" text-xl">$0</div>
                <p>負債</p>
            </div>

            {/* TODO: Implement income and cost */}
            <div className="flex flex-col justify-center">
                <div className=" text-xl">$0</div>
                <p>本月收支</p>
            </div>
            <div className="flex flex-col justify-center">
                <AssetAddButton userId={userId}>新增資產</AssetAddButton>
            </div>
        </div>
    );
}