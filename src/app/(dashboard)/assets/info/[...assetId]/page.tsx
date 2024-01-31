import { currentUser } from "@clerk/nextjs";

import { CostRecordType, IncomeRecordType } from "@/lib/type";
import { GetAssetCostAction, GetAssetIncomeAction, GetAssetInfoAction } from "@/server/action/asset-action";

import { toast } from "sonner";


export default async function AssetInfoPage({ params }: { params: { assetId: string}}) {
    const user = await currentUser();

    if(user === null) return;

    const AssetRecord = await GetAssetInfoAction(user.id, parseInt(params.assetId));
    const costs: CostRecordType[] = await GetAssetCostAction(user.id, parseInt(params.assetId));
    const incomes: IncomeRecordType[] = await GetAssetIncomeAction(user.id, parseInt(params.assetId));

    if(!AssetRecord.success) {
        toast.error(AssetRecord.message);
        return (
            <div>
                <div className="ml-[400px] space-y-[50px]">
                    <h1 className="text-3xl font-bold">{AssetRecord.message}</h1>
                </div>
            </div>
        )
    }
    
    return (
        <>
            <div className="ml-[400px]">
                <h1 className="text-3xl font-bold">{AssetRecord.data.name}</h1>
                <h1 className="text-lg  text-slate-500 dark:text-slate-200">帳戶資訊</h1>
                
                {/* TODO: Implement cost and income list with date (need to merge) */}
            </div>
        </>
    )
} 