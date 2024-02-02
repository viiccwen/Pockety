import { currentUser } from "@clerk/nextjs";
import { Toaster } from "sonner"

import { AssetsTable } from "./_components/asset-table";
import { AssetsPanel } from "./_components/asset-panel";

import { GetUserAssetAction } from "@/server/action/asset-action";
import { AssetRecordType, CostRecordType, IncomeRecordType } from "@/lib/type";
import { GetMonthlyIncomeAction } from "@/server/action/income-action";
import { GetMonthlyCostAction } from "@/server/action/cost-action";




export default async function AssetsPage() {
    const user = await currentUser();

    if(user === null) return;

    const AssetsResponse: AssetRecordType[] = await GetUserAssetAction(user?.id);
    const IncomeResponse: IncomeRecordType[] = await GetMonthlyIncomeAction(user?.id, (new Date()).getFullYear(), (new Date()).getMonth() + 1); 
    const CostResponse: CostRecordType[] = await GetMonthlyCostAction(user?.id, (new Date()).getFullYear(), (new Date()).getMonth() + 1); 

    return (
        <>
            <Toaster 
                richColors
            />
            
            <div className="ml-[400px] space-y-[50px]">
                <h1 className="text-3xl font-bold">我的資產</h1>
                <AssetsPanel userId={user.id} AssetsArray={AssetsResponse} incomesArray={IncomeResponse} costsArray={CostResponse} />
                <AssetsTable AssetsArray={AssetsResponse} />
            </div>
        </>
    );
};