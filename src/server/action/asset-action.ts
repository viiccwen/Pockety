"use server";

import { db } from "@/lib/db";
import { assetType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const GetUserAssetAction = async (UserId: string | null) => {
    
    const asset = await db.asset.findMany({
        where: {
            externalId: UserId as string,
        }
    });
    
    return asset;
};

type AddProps = {
    name: string;
    initial_value: number;
    value: number;
    category: string;
};

export const CreateUserAssetAction = async (UserId: string | null, data: AddProps) => {

    const isNameExisted = await db.asset.findFirst({
        where: {
            name: data.name,
            externalId: UserId as string,
        }
    });

    if(isNameExisted) {
        return {
            success: false,
            message: "帳戶已存在，請更改名稱",
        }
    }

    const asset = await db.asset.create({
        data: {
            name: data.name,
            initial_value: data.initial_value,
            value: data.value,
            category: data.category as assetType,
            user: {
                connect: {
                    externalId: UserId as string,
                }
            }
        }
    });

    if(!asset) {
        return {
            success: false,
            message: "帳戶新增失敗，請聯絡管理員",
        }
    }

    revalidatePath("/assets");
    return {
        success: true,
        message: "帳戶新增成功",
    }
}