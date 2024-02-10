import { Button } from "@/components/ui/button";
import { CostPieChart } from "./_components/cost-pie-chart";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function StatisticsPage() {
    return (
        <div>
            <div>
                <div className="h-[600px] w-[400px]">
                    <div className="flex gap-2">
                        <Button variant='outline' className="flex-1">月</Button>
                        <Button variant='outline' className="flex-1">年</Button>
                    </div>
                    <div className="flex justify-center items-center gap-3 mt-2">
                        <Button variant='ghost'><ChevronLeft size={20} /></Button>
                        <Button variant='ghost'>2024</Button>
                        <Button variant='ghost'><ChevronRight size={20} /></Button>
                    </div>
                    <div className="h-[400px] w-[400px]">
                        <CostPieChart />
                    </div>
                </div>
            </div>
        </div>
    );
}