import { currentUser } from "@clerk/nextjs";
import { Toaster } from "sonner"

import { AssetsTable } from "./_components/asset-table";
import { AssetsPanel } from "./_components/asset-panel";

import { GetUserAssetAction } from "@/server/action/asset-action";

import { AssetSuccess } from "@/lib/type/assets-type";


export default async function AssetsPage() {
    const user = await currentUser();

    if(user === null) return;

    const AssetsResponse: AssetSuccess[] = await GetUserAssetAction(user?.id);

    return (
        <>
            <Toaster 
                richColors
            />
            <div className="ml-[400px] space-y-[50px]">
                <h1 className="text-3xl font-bold">我的資產</h1>
                <AssetsPanel userId={user.id} AssetsArray={AssetsResponse} />
                <AssetsTable AssetsArray={AssetsResponse} />
            </div>
        </>
    );
};