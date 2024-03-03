'use client';

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { CostRecordType, IncomeRecordType } from "@/lib/type";

interface CalendarTableProps {
    date: Date;
    selectedDate: Date;
    monthlyCost: CostRecordType[] | undefined;
    monthlyincome: IncomeRecordType[] | undefined;
    HandleSelectDate: (e: any) => void;
}

const Days = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

export const CalendarTable = ({
    date,
    selectedDate,
    monthlyCost,
    monthlyincome,
    HandleSelectDate,
} : CalendarTableProps) => {

    const getFirstDaysInMonth = (year: number, month: number) => {
        const firstDay = new Date(year, month, 1);
        return firstDay.getDay();
    }
    
    const getLastDateInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
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
                                                    className={`items-start ${cur_date === selectedDate.getDate() ? "bg-amber-300 text-white hover:bg-amber-300" : ""}`}
                                                >
                                                    <div className="flex flex-col">
                                                        <p>{cur_date}</p>
                                                        <div className="flex gap-1">
                                                        {
                                                            monthlyCost?.some((record) => {
                                                                return record.createdAt.getDate() === cur_date;
                                                            }) ? <div className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></div> : null
                                                        }
                                                        {
                                                            monthlyincome?.some((record) => {
                                                                return record.createdAt.getDate() === cur_date;
                                                            }) ? <div className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></div> : null
                                                        }
                                                        </div>
                                                        
                                                    </div>
                                                
                                                    
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
    )
}