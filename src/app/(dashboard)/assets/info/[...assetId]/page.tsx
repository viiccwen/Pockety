import { currentUser } from "@clerk/nextjs";

import { AssetRecordType, CostRecordType, IncomeRecordType } from "@/lib/type";
import { GetAssetCostAction, GetAssetIncomeAction, GetAssetInfoAction } from "@/server/action/asset-action";

import { toast } from "sonner";
import { InfoTable } from "./_components/info-table";
import { TotalPanel } from "./_components/total-panel";
import { assetType } from "@prisma/client";


export default async function AssetInfoPage({ params }: { params: { assetId: string}}) {
    const user = await currentUser();

    if(user === null) return;

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
            <div className="ml-[400px]">
                {/* TODO: Implement cost and income list with date (need to merge) */}
                <TotalPanel asset_table={asset_data} />
                <InfoTable costs={costs} incomes={incomes} />
            </div>
        </>
    )
} 