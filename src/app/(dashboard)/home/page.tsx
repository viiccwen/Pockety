import { currentUser } from "@clerk/nextjs";
import { RecordAddButton } from "./_components/record-add-button";
import { AssetRecordType } from "@/lib/type";
import { Toaster } from "sonner";
import { Calendar } from './_components/calendar';

import { GetUserAssetAction } from "@/server/action/asset-action";
import { GetMonthlyCostAction } from "@/server/action/cost-action";
import { GetMonthlyIncomeAction } from "@/server/action/income-action";

export default async function HomePage() {
    const user = await currentUser();

    if(!user) return;

    const assets: AssetRecordType[] = await GetUserAssetAction(user.id);
    const date = new Date();

    const monthlyCost = await GetMonthlyCostAction(user.id, date.getFullYear(), date.getMonth()+1);
    const monthlyIncome = await GetMonthlyIncomeAction(user.id, date.getFullYear(), date.getMonth()+1);

    console.log(monthlyCost, monthlyIncome);

    return (
        <>
            <Toaster
                richColors
            />
            <div className="grid grid-cols-2 gap-6">
                <Calendar userId={user.id} cost={monthlyCost} income={monthlyIncome} />
            </div>
            <RecordAddButton userId={user.id} assets={assets} />
        </>
    );
};