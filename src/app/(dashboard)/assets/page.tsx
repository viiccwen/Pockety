import { currentUser } from "@clerk/nextjs";

import { AssetsTable } from "./_components/asset-table";
import { AssetsPanel } from "./_components/asset-panel";

import { GetUserAssetAction } from "@/server/action/asset-action";

import { AssetFailed, AssetSuccess } from "@/lib/type/assets-type";


export default async function AssetsPage() {
    const user = await currentUser();

    if(user === null) return;

    const AssetsResponse: AssetSuccess[] | AssetFailed = await GetUserAssetAction(user?.id);
    
    if('success' in AssetsResponse && !AssetsResponse.success) {
        return <p>{AssetsResponse.message}</p>;
    }

    if(!Array.isArray(AssetsResponse)) {
        return <p>發生錯誤</p>;
    }

    return (
        <div className="ml-[400px] space-y-[75px]">
            <h1 className="text-3xl font-bold">我的資產</h1>
            <AssetsPanel AssetsArray={AssetsResponse} />
            <AssetsTable AssetsArray={AssetsResponse} />
        </div>
    );
};