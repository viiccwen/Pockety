"use server";

import { db } from "@/lib/db";
import { assetType } from "@prisma/client";
import { revalidatePath } from "next/cache";

// GET

export const GetUserAssetAction = async (UserId: string | null) => {
    
    const asset = await db.asset.findMany({
        where: {
            externalId: UserId as string,
        }
    });
    
    return asset;
};

export const GetAssetInfoAction = async (UserId: string | null, AssetId: number) => {

    const asset = await db.asset.findFirst({
        where: {
            id: AssetId,
            externalId: UserId as string,
        }
    });

    if(!asset) {
        return {
            success: false,
            message: "帳戶不存在或伺服器出現問題，請聯絡管理員...",
        };
    }

    return {
        success: true,
        message: "成功取得帳戶資訊",
        data: asset,
    };
}


// CREATE

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
        return Promise.reject("帳戶已存在，請更改名稱");
    
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
        return Promise.reject("帳戶新增失敗，請聯絡管理員");
    }
    
    revalidatePath("/assets");
    
    return Promise.resolve("帳戶新增成功");
}

// DELETE

export const DeleteUserAssetAction = async (UserId: string | null, assetId: number) => {
    
    // delete existed cost
    const delCost = await db.cost.deleteMany({
        where: {
            assetId: assetId,
        }
    });

    // delete existed income
    const delIncome = await db.income.deleteMany({
        where: {
            assetId: assetId,
        }
    });

    const delAsset = await db.asset.delete({
        where: {
            externalId: UserId as string,
            id: assetId,
        }
    });

    if(!delAsset) {
        return Promise.reject("帳戶刪除失敗，請聯絡管理員");
    }

    revalidatePath("/assets");
    
    return Promise.resolve("帳戶刪除成功");
}

// UPDATE

export const UpdateUserAssetAction = async (UserId: string | null, assetId: number, data: AddProps) => {
    
    const update = await db.asset.update({
        where: {
            id: assetId,
            externalId: UserId as string,
        },
        data: {
            name: data.name,
            initial_value: data.initial_value,
            value: data.value,
            category: data.category as assetType,
        }
    });

    if(!update) {
        return Promise.reject("帳戶編輯失敗，請聯絡管理員");
    }

    revalidatePath("/assets");
    
    return Promise.resolve("帳戶編輯成功");
}