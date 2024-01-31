"use client";

import { AssetSuccess } from "@/lib/type/assets-type";
import { useEffect, useState } from "react";

interface AssetsPanelProps {
    AssetsArray: AssetSuccess[];
};

export const AssetsPanel = ( { AssetsArray } : AssetsPanelProps ) => {
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
        <>
            <p>{totalAssets}</p>
        </>
    );
}