import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

interface CalendarBarProps {
    date: Date;
    HandlePrevMonth: () => void;
    HandleNextMonth: () => void;
}

export const CalendarBar = ({
    date,
    HandlePrevMonth,
    HandleNextMonth
} : CalendarBarProps) => {
    return (
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
    )
}