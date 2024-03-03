import { Suspense } from "react";
import { Toaster } from "sonner"

import { AssetsList } from "./_components/asset-list";
import { AssetsPanel } from "./_components/asset-panel";
import { ListLoadingSkeleton, PanelLoadingSkeleton } from "./_components/asset-loading-skeleton";

export default async function AssetsPage() {

    return (
        <>
            <Toaster 
                richColors
            />
            
            <div className="space-y-[50px] mr-[100px]">
                <h1 className="text-3xl font-bold">我的資產</h1>
                <Suspense fallback={<PanelLoadingSkeleton />}>
                    <AssetsPanel />
                </Suspense>
                <Suspense fallback={<ListLoadingSkeleton />}>
                    <AssetsList />
                </Suspense>
            </div>
        </>
    );
};