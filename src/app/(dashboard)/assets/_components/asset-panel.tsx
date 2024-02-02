import { AssetRecordType, CostRecordType, IncomeRecordType } from "@/lib/type";
import { GetUserAssetAction } from "@/server/action/asset-action";
import { GetMonthlyCostAction } from "@/server/action/cost-action";
import { GetMonthlyIncomeAction } from "@/server/action/income-action";
import { currentUser } from "@clerk/nextjs";
import { Panel } from "./panel";

export const AssetsPanel = async () => {
    const user = await currentUser();

    if(!user) return;

    const Assets: AssetRecordType[] = await GetUserAssetAction(user.id);
    const Incomes: IncomeRecordType[] = await GetMonthlyIncomeAction(user.id, (new Date()).getFullYear(), (new Date()).getMonth() + 1); 
    const Costs: CostRecordType[] = await GetMonthlyCostAction(user.id, (new Date()).getFullYear(), (new Date()).getMonth() + 1); 


    return (
        <Panel userId={user.id} Assets={Assets} Incomes={Incomes} Costs={Costs}  />       
    );
}