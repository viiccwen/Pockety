import { z } from "zod";

export const AssetAddSchema = z.object({
    name: z.string(),
    initial_value: z.number(),
    value: z.number(),
    category: z.enum(["CASH", "STOCKS", "BANK", "CHECK", "OTHER"]),
});

export type AssetAddType = z.infer<typeof AssetAddSchema>;