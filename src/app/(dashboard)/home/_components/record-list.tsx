'use client';
import Link from "next/link";

import { 
    AssetRecordType, 
    CostMapType, 
    CostRecordType, 
    IncomeMapType, 
    IncomeRecordType 
} from "@/lib/type";

interface RecordListProps {
    selectedCost: CostRecordType[] | undefined;
    selectedIncome: IncomeRecordType[] | undefined;
    assets: AssetRecordType[] | undefined;
}

export const RecordList = ({
    selectedCost,
    selectedIncome,
    assets
} : RecordListProps) => {
    return (
        <>
            {
                selectedCost?.map((record) => {
                    {/* TODO: link and info */}
                    return (
                        <Link key={record.id} href="#" className="duration-200 hover:opacity-75">
                            <div  className="mb-3 p-2 grid grid-cols-2 grid-rows-2 font-bold bg-yellow-400 rounded-lg">
                                <p className="flex items-center">{CostMapType.get(record.category)}</p>
                                <div className="flex justify-end">
                                    <div className="p-1 rounded-lg text-white bg-red-400">{record.value}</div>
                                </div>
                                <p className="row-start-2 col-start-2 text-end">{
                                    assets?.find((asset) => {
                                        return asset.id === record.assetId;
                                    })?.name
                                }</p>
                            </div>
                        </Link>
                    )
                })
            }
            {
                selectedIncome?.map((record) => {
                    {/* TODO: link and info */}
                    return (
                        <Link key={record.id} href="#" className="duration-200 hover:opacity-75">
                            <div className="mb-3 p-2 grid grid-cols-2 grid-rows-2 font-bold bg-yellow-400 rounded-lg">
                                <p className="flex items-center">{IncomeMapType.get(record.category)}</p>                    
                                <div className="flex justify-end">
                                    <div className="p-1 rounded-lg text-white bg-green-400">{record.value}</div>
                                </div>
                                <p className="row-start-2 col-start-2 text-end">{
                                    assets?.find((asset) => {
                                        return asset.id === record.assetId;
                                    })?.name
                                }</p>
                            </div>
                        </Link>
                    )
                })
            }
        </>
    )
}