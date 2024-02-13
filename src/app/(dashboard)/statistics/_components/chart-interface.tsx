'use client';

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"

import { CostRecordType, IncomeRecordType } from "@/lib/type";
import { GetMonthlyCostAction, GetYearlyCostAction } from "@/server/action/cost-action";
import { GetMonthlyIncomeAction, GetYearlyIncomeAction } from "@/server/action/income-action";

import { DisplayPieChart } from "./display-pie-chart";

interface ChartInterfaceProps {
    userId: string;
    type: string;
    method: string;
}

interface DataProps {
    category: string;
    value: number;
}

export const ChartInterface = ({
    userId,
    type,
    method,
} : ChartInterfaceProps) => {
    const router = useRouter();
    const [curType, setCurType] = useState<string> (type);
    const [curMethod, setCurMethod] = useState<string> (method);

    const [curMonth, setCurMonth] = useState<number> (new Date().getMonth() + 1);
    const [curYear, setCurYear] = useState<number> (new Date().getFullYear());
    const [curTitle, setCurTitle] = useState<string> ("");

    const [data, setData] = useState<DataProps[]> ();
    
    const HandleMethodClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        router.push(`/statistics?type=${curType}&method=${e.currentTarget.value}`);
    }

    const HandlePrevClick = () => {
        if(curMethod == 'month') {
            if(curMonth == 1) {
                setCurMonth(12);
                setCurYear(curYear - 1);
            } else {
                setCurMonth(curMonth - 1);
            }
        } else {
            setCurYear(curYear - 1);
        }
    }

    const HandleNextClick = () => {
        if(curMethod == 'month') {
            if(curMonth == 12) {
                setCurMonth(1);
                setCurYear(curYear + 1);
            } else {
                setCurMonth(curMonth + 1);
            }
        } else {
            setCurYear(curYear + 1);
        }
    }

    const GetMonthlyData = async (year: number, month: number) => {
        let data: CostRecordType[];

        data = (curType === 'cost') 
            ? await GetMonthlyCostAction(userId, year, month)
            : await GetMonthlyIncomeAction(userId, year, month);
        
        let monthlyData: DataProps[] = [];
        
        data.map(({category, value}) => {
            const findDataIdx = monthlyData.findIndex((ele) => ele.category === category);
            if(findDataIdx === -1) {
                monthlyData.push({category, value});
            } else {
                monthlyData[findDataIdx].value += value;
            }
        })

        return monthlyData;
    }

    const GetYearlyData = async (year: number) => {
        let data: IncomeRecordType[];
        
        data = (curType === 'cost') 
            ? await GetYearlyCostAction(userId, year)
            : await GetYearlyIncomeAction(userId, year);

        let monthlyData: DataProps[] = [];

        data.map(({category, value}) => {
            const findDataIdx = monthlyData.findIndex((ele) => ele.category === category);
            if(findDataIdx === -1) {
                monthlyData.push({category, value});
            } else {
                monthlyData[findDataIdx].value += value;
            }
        })

        return monthlyData;
    }

    useEffect(() => {
        setCurMethod(method);
    }, [method])

    useEffect(() => {
        setCurType(type);
    }, [type])

    useEffect(() => {
        const fetchData = async () => {
            let newData: DataProps[] = [];

            newData = (curMethod === 'month')
                ? await GetMonthlyData(curYear, curMonth) 
                : await GetYearlyData(curYear);

            setData(newData);
        }

        fetchData();
    
        setCurTitle(`${curMethod === 'month' ? `${curYear}/${curMonth}` : `${curYear}`}`);
    }, [curMonth, curYear, curMethod])

    return (
        <>
            
            <div className="h-[600px] w-[500px]">
                <div className="flex gap-2 p-1 bg-gray-300 rounded-sm">
                    <Button onClick={(e) => HandleMethodClick(e)} value="month" variant='ghost' className={`flex-1 dark:text-black ${curMethod == 'month' ? "bg-white hover:bg-white" : 'hover:bg-inherit'}`}>月</Button>
                    <Button onClick={(e) => HandleMethodClick(e)} value="year" variant='ghost' className={`flex-1 dark:text-black ${curMethod == 'year' ? "bg-white hover:bg-white" : 'hover:bg-inherit'}`}>年</Button>
                </div>
                <div className="flex justify-center items-center gap-3 mt-2">
                    <Button onClick={HandlePrevClick} variant='ghost'><ChevronLeft size={20} /></Button>
                    <Button variant='ghost'>{curTitle}</Button>
                    <Button onClick={HandleNextClick} variant='ghost'><ChevronRight size={20} /></Button>
                </div>
                <div className="h-[400px]">
                    <DisplayPieChart data={data} />
                </div>
            </div>
        </>
    )
}