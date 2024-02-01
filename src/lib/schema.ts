import { z } from "zod";
import { CostMapType } from "./type";



export const AssetAddSchema = z.object({
    name: z.string(),
    initial_value: z.number(),
    value: z.number(),
    category: z.enum(["CASH", "STOCKS", "BANK", "CHECK", "OTHER"]),
});

export const CostAddSchema = z.object({
    value: z.number(),
    createdAt: z.date(),
    assetId: z.number(),
    description: z.string(),
    category: z.enum(["FOOD", "TRANSPORT", "HEALTH", "PHONE", "EDUCATION", "CLOTHING", "OTHER"]),
})

export const IncomeAddSchema = z.object({
    value: z.number(),
    createdAt: z.date(),
    assetId: z.number(),
    description: z.string(),
    category: z.enum(["SALARY", "INVESTMENT", "PART_TIME", "OTHER"]),
})

export type AssetAddType = z.infer<typeof AssetAddSchema>;
export type CostAddType = z.infer<typeof CostAddSchema>;
export type IncomeAddType = z.infer<typeof IncomeAddSchema>;