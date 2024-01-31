import { User, assetType } from "@prisma/client";

export type AssetSuccess = {
    id: number;
    name: string;
    initial_value: number;
    value: number;
    category: assetType;
    externalId: string;
    createdAt: Date;
}

export type AssetFailed = {
    success: boolean;
    message: string;
}