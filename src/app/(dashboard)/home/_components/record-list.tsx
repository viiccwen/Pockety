'use client';

import { 
    AssetRecordType, 
    CostRecordType, 
    IncomeRecordType 
} from "@/lib/type";

import { RecordItem } from "./record-item";

interface RecordListProps {
    userId: string;
    selectedCost: CostRecordType[] | undefined;
    selectedIncome: IncomeRecordType[] | undefined;
    assets: AssetRecordType[] | undefined;
}

export const RecordList = ({
    userId,
    selectedCost,
    selectedIncome,
    assets
} : RecordListProps) => {
    
    return (
        <>
            {
                selectedCost?.map((record) => (
                <RecordItem 
                    key={record.id} 
                    curType={1} 
                    userId={userId} 
                    record={record} 
                    assets={assets} 
                />
                ))
            }
            {
                selectedIncome?.map((record) => (
                    <RecordItem 
                        key={record.id} 
                        curType={2} 
                        userId={userId} 
                        record={record} 
                        assets={assets} 
                    />
                ))
            }
        </>
    )
}