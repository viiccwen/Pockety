import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { ChartInterface } from "./_components/chart-interface";

import { GetMonthlyCostAction } from "@/server/action/cost-action";

export default async function StatisticsPage({ 
    searchParams 
} : { 
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const user = await currentUser();
    const type = searchParams.type as string;
    const method = searchParams.method as string;

    if(!user) return;
    if(type == null || method == null) redirect('/statistics?type=cost&calendar=month');

    return (
        <>
            <ChartInterface userId={user.id} type={type} method={method} />
        </>
    );
}