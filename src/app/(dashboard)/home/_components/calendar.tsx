'use client';

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CostRecordType, IncomeRecordType } from "@/lib/type";
import { GetMonthlyCostAction } from "@/server/action/cost-action";
import { GetMonthlyIncomeAction } from "@/server/action/income-action";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
  

interface CalendarProps {
    userId: string;
    cost: CostRecordType[] | undefined;
    income: IncomeRecordType[] | undefined;
}

const Months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Days = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

const getFirstDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    return firstDay.getDay();
}

const getLastDaysInMonth = (year: number, month: number) => {
    const lastDay = new Date(year, month + 1, 0);
    return lastDay.getDay();
}

const getLastDateInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
}


export const Calendar = ({ 
    userId,
    cost,
    income 
} : CalendarProps) => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthlyCost, setMonthlyCost] = useState<CostRecordType[] | undefined> (cost);
    const [monthlyincome, setMonthlyIncome] = useState<IncomeRecordType[] | undefined> (income);
    const [selectedCost, setSelectedCost] = useState<CostRecordType[] | undefined> (undefined);
    const [selectedIncome, setSelectedIncome] = useState<IncomeRecordType[] | undefined> (undefined);

    const HandlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    }
    
    const HandleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    }

    const HandleSelectDate = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedDate(new Date(date.getFullYear(), date.getMonth(), parseInt(e.currentTarget.value)));
    }

    const GetMonthlyRecord = async () => {
        const cur_cost = await GetMonthlyCostAction(userId, date.getFullYear(), date.getMonth());
        const cur_income = await GetMonthlyIncomeAction(userId, date.getFullYear(), date.getMonth());
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
        console.log("get monthly record");
    }, [date])

    useEffect(() => {
        console.log(monthlyCost, monthlyincome);
    }, [monthlyCost, monthlyincome])

    return (
        <>
            <div>
                <div className="flex items-center justify-center">
                    <Button
                        variant="ghost"
                        onClick={HandlePrevMonth}
                    >
                        <ChevronLeft size={16} />
                    </Button>
                    <h1 className="w-[200px] text-center">{`${Months[date.getMonth()]} ${date.getFullYear()}`}</h1>
                    <Button
                        variant="ghost"
                        onClick={HandleNextMonth}
                        >
                        <ChevronRight size={16} />
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow >
                            {Days.map((day, index) => (
                                <TableHead key={index} className="text-center">{day}</TableHead>
                                ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            [1,2,3,4,5,6].map((week) => {
                                return (
                                    <TableRow key={week} className="text-center">
                                        {
                                            [0,1,2,3,4,5,6].map((day) => {
                                                const cur_date = (week - 1) * 7 + day - getFirstDaysInMonth(date.getFullYear(), date.getMonth()) + 1;
                                                if(cur_date < 1 || cur_date > getLastDateInMonth(date.getFullYear(), date.getMonth())) {
                                                    return <TableCell key={day}></TableCell>
                                                }
                                                return (
                                                    <TableCell key={day}>
                                                        <Button 
                                                            variant="ghost" 
                                                            value={cur_date} 
                                                            onClick={(e) => HandleSelectDate(e)}
                                                            className={cur_date === selectedDate.getDate() ? "bg-blue-500 text-white" : ""}
                                                        >
                                                            {cur_date}
                                                        </Button>
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
            <div>
                {
                    selectedCost?.map((record) => {
                        return (
                            <div key={record.id}>
                                <p>{record.description}</p>
                                <p>{record.value}</p>
                                <p>{record.createdAt.toString()}</p>
                            </div>
                        )
                    })
                }
                {
                    selectedIncome?.map((record) => {
                        return (
                            <div key={record.id}>
                                <p>{record.description}</p>
                                <p>{record.value}</p>
                                <p>{record.createdAt.toString()}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}