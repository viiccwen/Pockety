"use server";

import { db } from "@/lib/db";

export const GetUserAssetAction = async (UserId: string | null) => {
    
    if(UserId === null) {
        return{
            success: false,
            message: "查無此使用者",
        }
    }

    const asset = await db.asset.findMany({
        where: {
            externalId: UserId as string,
        }
    });
    
    return asset;
};

export const CreateUserAssetAction = async (asset: unknown) => {



}