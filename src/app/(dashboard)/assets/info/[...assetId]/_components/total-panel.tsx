import { AssetRecordType } from "@/lib/type";
import { Props } from "next/script";



interface TotalPorps {
    asset_table: AssetRecordType;
}

export const TotalPanel = ({ asset_table } : TotalPorps) => {


    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold">{asset_table.name}</h1>
                <h1 className="text-lg  text-slate-500 dark:text-slate-200">帳戶資訊</h1>
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