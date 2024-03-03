import { currentUser } from "@clerk/nextjs";

import { AssetRecordType, CostRecordType, IncomeRecordType } from "@/lib/type";
import { GetAssetInfoAction, GetUserAssetAction } from "@/server/action/asset-action";

import { toast } from "sonner";
import { InfoTable } from "./_components/info-table";
import { TotalPanel } from "./_components/total-panel";

import { GetAssetCostAction } from "@/server/action/cost-action";
import { GetAssetIncomeAction } from "@/server/action/income-action";


export default async function AssetInfoPage({ params }: { params: { assetId: string}}) {
    const user = await currentUser();

    if(user === null) return;

    const assets = await GetUserAssetAction(user.id);
    const AssetRecord = await GetAssetInfoAction(user.id, parseInt(params.assetId));
    const costs: CostRecordType[] = await GetAssetCostAction(user.id, parseInt(params.assetId));
    const incomes: IncomeRecordType[] = await GetAssetIncomeAction(user.id, parseInt(params.assetId));
    const asset_data: AssetRecordType = AssetRecord.data;

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
            <div>
                <TotalPanel asset_table={asset_data} costs={costs} incomes={incomes} />
                <InfoTable 
                    costs={costs} 
                    incomes={incomes} 
                    userId={user.id}
                    assets={assets}
                />
            </div>
        </>
    )
} 