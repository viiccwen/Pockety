"use server";

import { db } from "@/lib/db";
import { incomeType } from "@prisma/client";
import { revalidatePath } from "next/cache";

type AddIncomeProps = {
    value: number;
    createdAt: Date;
    assetId: number;
    category: string;
    description: string;
};

export const AddUserIncomeAction = async (UserId: string | null, data: AddIncomeProps) => {
    
    const income = await db.income.create({
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
            category: data.category as incomeType,
            description: data.description,
        }
    })

    if(!income) {
        return Promise.reject("新增失敗，請聯絡管理員");
    }

    const update = await db.asset.update({
        where: {
            id: data.assetId,
        },
        data: {
            value: {
                increment: data.value,
            }
        }
    });

    if(!update) {
        return Promise.reject("新增失敗，請聯絡管理員");
    }
    
    revalidatePath("/home");
    return Promise.resolve("新增成功");
};

export const GetAssetIncomeAction = async (UserId: string | null, AssetId: number) => {
        
    const income = await db.income.findMany({
        where: {
            externalId: UserId as string,
            assetId: AssetId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });
    
    return income;
}


export const GetMonthlyIncomeAction = async (UserId: string | null, year: number, month: number) => {
    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    const income = await db.income.findMany({
        where: {
            user: {
                externalId: UserId as string,
            },
            createdAt: {
                gte: startDate,
                lt: endDate,
            }
        }
    });


    return income;
}