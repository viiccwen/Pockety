import { AssetRecordType } from "@/lib/type";
import { GetUserAssetAction } from "@/server/action/asset-action";
import { currentUser } from "@clerk/nextjs";
import { List } from "./list";

export const AssetsList = async () => {
    const user = await currentUser();

    if(!user) return;
    
    const Assets: AssetRecordType[] = await GetUserAssetAction(user?.id);

    return (
        <List Assets={Assets} />
    )
};