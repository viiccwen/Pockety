"use server";

import { db } from "@/lib/db";
import { costType } from "@prisma/client";
import { revalidatePath } from "next/cache";

type AddCostProps = {
    value: number;
    assetId: number;
    category: string;
    description: string;
    createdAt: Date;
};

export const AddUserCostAction = async (UserId: string | null, data: AddCostProps) => {
    
    const cost = await db.cost.create({
        data: {
            value: data.value,
            createdAt: data.createdAt,
            asset: {
                connect: {
                    id: data.assetId,
                }
            },
            user: {
                connect: {
                    externalId: UserId as string,
                }
            },
            category: data.category as costType,
            description: data.description,
        }
    })

    if(!cost) {
        return {
            success: false,
            message: "新增失敗，請聯絡管理員",
        }
    }

    const update = await db.asset.update({
        where: {
            id: data.assetId,
        },
        data: {
            value: {
                decrement: data.value,
            }
        }
    });

    if(!update) {
        return {
            success: false,
            message: "新增失敗，請聯絡管理員",
        }
    }
    
    revalidatePath("/home");
    return {
        success: true,
        message: "新增成功",
    };
};

export const GetAssetCostAction = async (UserId: string | null, AssetId: number) => {
    
    const cost = await db.cost.findMany({
        where: {
            externalId: UserId as string,
            assetId: AssetId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });
    
    return cost;
}

export const GetMonthlyCostAction = async (UserId: string | null, year: number, month: number) => {

    const cost = await db.cost.findMany({
        where: {
            user: {
                externalId: UserId as string,
            },
            createdAt: {
                gte: new Date(year, month - 1, 1),
                lt: new Date(year, month, 1),
            }
        }
    });


    return cost;
}