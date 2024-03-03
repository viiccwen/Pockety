'use client';

import { useEffect, useState } from "react";

import { AssetRecordType, CostMapType, CostRecordType, IncomeMapType, IncomeRecordType } from "@/lib/type";
import { CostAddSchema, IncomeAddSchema } from "@/lib/schema";

import { AddUserCostAction, DeleteUserCostAction, UpdateUserCostAction } from "@/server/action/cost-action";
import { AddUserIncomeAction, DeleteUserIncomeAction, UpdateUserIncomeAction } from "@/server/action/income-action";
import { toast } from "sonner";
import { RecordEditForm } from "@/components/record-edit-form";
import { Button } from "@/components/ui/button";

import { ChevronRight } from "lucide-react";

interface InfoItemProps {
    curType: number;
    userId: string;
    record: CostRecordType | IncomeRecordType;
    assets: AssetRecordType[] | undefined;
}

export const InfoItem = ({
    curType,
    userId,
    record,
    assets
} : InfoItemProps) => {
    const [isOpen, setIsOpen] = useState<boolean> (false);

    const [type, setType] = useState<number>(curType);
    const [categoryError, setCategoryError] = useState<string>("");
    const [assetError, setAssetError] = useState<string>("");

    const HandleSubmit = async (formdata: FormData) => {
        let condition: number = 1;
        {/*
        todo: condition
        1. 種類同 資產同 - done
        2. 種類同 資產不同 - done
        3. 種類不同 資產同 
        3. 種類不同 資產不同 
        */}

        const category = formdata.get("category");
        const assetId = parseInt(formdata.get("asset") as string);
        const description = formdata.get("description");
        const createdAt = new Date(formdata.get("date") as string);
        
        let value: number;

        if(category === record.category && assetId === record.assetId) {        // 種類同 資產同
            condition = 1;
        } else if(category === record.category && assetId !== record.assetId) { // 種類同 資產不同
            condition = 2;
        } else if(category !== record.category && assetId === record.assetId) { // 種類不同 資產同
            condition = 3;
        } else {                                                                // 種類不同 資產不同
            condition = 4;
        }

        if(condition == 1 || condition == 3) value = parseInt(formdata.get("value") as string) - record.value;
        else value = parseInt(formdata.get("value") as string);

        const data = { value, createdAt, assetId, category, description };

        let check: any;
        if(type === 1) {
            check = CostAddSchema.safeParse( data );
        } else {
            check = IncomeAddSchema.safeParse( data );
        }

        if(!check.success) {
            if(check.error.flatten().fieldErrors.category) setCategoryError("請選擇類別！");
            if(check.error.flatten().fieldErrors.assetId) setAssetError("請選擇資產！");
            console.log(check.error.flatten().fieldErrors);
            return;
        } else console.log(check.data);

        type ActionResult = {
            success: boolean;
            message: string;
        };

        let pms: Promise<string>;

        if(condition == 1) {
            type == 1 
            ? pms = UpdateUserCostAction(userId, record.id, check.data)
            : pms = UpdateUserIncomeAction(userId, record.id, check.data);
        }
        else if(condition == 2) {
            if(type == 1) {
                await DeleteUserCostAction(userId, record.id, record.assetId, record.value);
                pms = AddUserCostAction(userId, check.data);
            } else {
                await DeleteUserIncomeAction(userId, record.id, record.assetId, record.value);
                pms = AddUserIncomeAction(userId, check.data);
            }
        } else {
            pms = UpdateUserCostAction(userId, record.id, check.data);
        }

        toast.promise(pms, {
            loading: "更新中...",
            success: (res) => `${res}`,
            error: (err) => `${err}`,
        });

        pms.then(() => setIsOpen(false));

        {/*ISSUE: data won't update automatically */} 
        // setRefresh(true);
    };

    const HandleTypeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setType(parseInt(e.currentTarget.value));
    }

    useEffect(() => {
        setCategoryError("");
        setAssetError("");
    }, [isOpen])

    return (
        <>
            <div>
                <Button onClick={() => setIsOpen(true)} variant="outline" size="sm">
                    <ChevronRight />
                </Button>
            </div>
            
            <RecordEditForm 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                record={record} 
                assets={assets} 
                type={type} 
                categoryError={categoryError}
                assetError={assetError}
                onTypeClick={HandleTypeClick} 
                onSubmit={HandleSubmit}
            />
        </>
    )
}