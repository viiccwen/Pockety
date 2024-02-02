import { Button } from "@/components/ui/button";
import { AssetRecordType } from "@/lib/type";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const TotalPanel = ({ asset_table } : {asset_table: AssetRecordType}) => {
    return (
        <div>
            <div className="flex gap-3">
                <div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/assets"><ChevronLeft /></Link>
                    </Button>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{asset_table.name}</h1>
                    <h1 className="text-lg  text-slate-500 dark:text-slate-200">帳戶資訊</h1>
                </div>
            </div>

            <div className="my-[30px] flex space-x-5">
                <div className="flex flex-col items-center">
                    <h1 className={`font-bold text-2xl ${asset_table.value >= 0 ? ' text-green-500' : ' text-red-400'}`}>{asset_table.value}</h1>
                    <h1>餘額</h1>
                </div>
                <div className="flex flex-col items-center">
                    <h1  className={`font-bold text-2xl ${asset_table.value >= 0 ? ' text-green-500' : ' text-red-400'}`}>{asset_table.initial_value}</h1>
                    <h1>初始餘額</h1>
                </div>
            </div>
        </div>
    );
}