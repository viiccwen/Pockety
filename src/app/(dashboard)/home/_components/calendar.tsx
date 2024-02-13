'use client';
import { Suspense, useEffect, useState } from "react";

import { CostRecordType, IncomeRecordType, AssetRecordType } from "@/lib/type";

import { RecordList } from "./record-list";
import { CalendarBar } from "./calendar-bar";
import { CalendarTable } from "./calendar-table";
import { ListLoadingSkeleton } from "../../assets/_components/asset-loading-skeleton";

import { GetMonthlyCostAction } from "@/server/action/cost-action";
import { GetMonthlyIncomeAction } from "@/server/action/income-action";
import { GetUserAssetAction } from "@/server/action/asset-action";
import { RecordAddAction } from "./record-add-action";

interface CalendarProps {
    id: string;
    cost: CostRecordType[] | undefined;
    income: IncomeRecordType[] | undefined;
}

export const Calendar = ({ 
    id,
    cost,
    income 
} : CalendarProps) => {
    const [userId, setUserId] = useState<string> (id);
    const [assets, setAssets] = useState<AssetRecordType[] | undefined> (undefined);
    const [date, setDate] = useState<Date> (new Date());
    const [selectedDate, setSelectedDate] = useState<Date> (new Date());
    const [monthlyCost, setMonthlyCost] = useState<CostRecordType[] | undefined> (cost);
    const [monthlyincome, setMonthlyIncome] = useState<IncomeRecordType[] | undefined> (income);
    const [selectedCost, setSelectedCost] = useState<CostRecordType[] | undefined> (undefined);
    const [selectedIncome, setSelectedIncome] = useState<IncomeRecordType[] | undefined> (undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [refresh, setRefresh] = useState<boolean> (false);

    const HandlePrevMonth = () => {
        const prev_date = new Date(date.getFullYear(), date.getMonth() - 1, 1); 
        setDate(prev_date);
        setSelectedDate(prev_date);
    }
    
    const HandleNextMonth = () => {
        const next_date = new Date(date.getFullYear(), date.getMonth() + 1, 1); 
        setDate(next_date);
        setSelectedDate(next_date);
    }

    const HandleSelectDate = (e: React.MouseEvent<HTMLButtonElement>) => {
        const select_date = new Date(date.getFullYear(), date.getMonth(), parseInt(e.currentTarget.value));

        if(select_date.getTime() == selectedDate.getTime()) {
            setIsOpen(true);
        }

        setSelectedDate(select_date);
    }

    const GetMonthlyRecord = async () => {
        const cur_cost = await GetMonthlyCostAction(userId, date.getFullYear(), date.getMonth() + 1);
        const cur_income = await GetMonthlyIncomeAction(userId, date.getFullYear(), date.getMonth() + 1);
        setMonthlyCost(cur_cost);
        setMonthlyIncome(cur_income);
    }
    
    useEffect(() => {
        setSelectedCost(monthlyCost?.filter((record) => {
            return record.createdAt.getDate() === selectedDate.getDate();
        }));
        
        setSelectedIncome(monthlyincome?.filter((record) => {
            return record.createdAt.getDate() === selectedDate.getDate();
        }));
    }, [selectedDate])
    
    useEffect(() => {
        GetMonthlyRecord();
    }, [date])

    useEffect(() => {
        const GetAssetArray = async () => {
            const assets_array = await GetUserAssetAction(userId);
            setAssets(assets_array);            
        }

        GetAssetArray();
    }, [userId])

    useEffect(() => {
        if(refresh == true) {
            setDate(selectedDate);

            {/* ISSUE: Fix recordList won't update automatically */}
            // setSelectedDate(date);
            setRefresh(false);
        }
    }, [refresh])

    return (
        <>
            <div>
                <CalendarBar 
                    date={date} 
                    HandlePrevMonth={HandlePrevMonth} 
                    HandleNextMonth={HandleNextMonth} 
                />

                <CalendarTable 
                    date={date} 
                    selectedDate={selectedDate} 
                    monthlyCost={monthlyCost} 
                    monthlyincome={monthlyincome} 
                    HandleSelectDate={HandleSelectDate}
                />
            </div>

            <div className="ml-5 mr-[100px]">
                <RecordList
                    userId={userId} 
                    selectedCost={selectedCost} 
                    selectedIncome={selectedIncome} 
                    assets={assets}
                />
            </div>

            <RecordAddAction
                userId={userId} 
                assets={assets as AssetRecordType[]}
                isOpen={isOpen}
                curDate={selectedDate}
                setIsOpen={setIsOpen}
                setRefresh={setRefresh}
            />
        </>
    )
}