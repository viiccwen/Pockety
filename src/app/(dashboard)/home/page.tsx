import { auth, currentUser } from "@clerk/nextjs";
import { RecordAddButton } from "./_components/record-add-button";
import { GetUserAssetAction } from "@/server/action/asset-action";
import { AssetRecordType } from "@/lib/type";
import { Toaster } from "sonner";

export default async function HomePage() {
    const user = await currentUser();

    if(!user) return;

    const assets: AssetRecordType[] = await GetUserAssetAction(user.id);

    return (
        <>
            <Toaster
                richColors
            />
            <div className="ml-[400px]">
                <RecordAddButton userId={user.id} assets={assets} />
            </div>
        </>
    );
};