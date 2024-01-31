import { assetType, costType, incomeType } from "@prisma/client";
import { z } from "zod";

// database types

export type CostRecordType = {
    id: number;
    value: number;
    description: string;
    category: costType;
    externalId: string;
    assetId: number;
    createdAt: Date;
}

export type IncomeRecordType = {
    id: number;
    value: number;
    description: string;
    category: incomeType;
    externalId: string;
    assetId: number;
    createdAt: Date;
}

export type AssetRecordType = {
    id: number;
    name: string;
    initial_value: number;
    value: number;
    category: assetType;
    externalId: string;
    createdAt: Date;
}

// enum type

export const AssetMapType = new Map<string, string>([
    [ 'CASH','現金' ],
    [ 'STOCK','股票' ],
    [ 'BANK','銀行' ],
    [ 'CHECK','支票' ],
    [ 'OTHER','其他' ],
])

export const CostMapType = new Map<string, string>([
    [ 'FOOD','食物' ],
    [ 'TRANSPORT','交通' ],
    [ 'HEALTH','健康' ],
    [ 'PHONE','手機' ],
    [ 'EDUCATION','教育' ],
    [ 'CLOTHING','衣服' ],
    [ 'OTHER','其他' ],
]);

export const IncomeMapType = new Map<string, string>([
    [ 'SALARY','薪水' ],
    [ 'INVESTMENT','投資' ],
    [ 'PART_TIME','打工' ],
    [ 'OTHER','其他' ],
]);


// schema

export const AssetAddSchema = z.object({
    name: z.string(),
    initial_value: z.number(),
    value: z.number(),
    category: z.enum(["CASH", "STOCKS", "BANK", "CHECK", "OTHER"]),
});

export type AssetAddType = z.infer<typeof AssetAddSchema>;