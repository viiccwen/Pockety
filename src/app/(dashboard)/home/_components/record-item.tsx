'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import { AssetsSelect, CategorySelect, DateInput, DescriptionInput, ValueInput } from "@/components/record-form-input";

import { AssetRecordType, CostMapType, CostRecordType, IncomeMapType, IncomeRecordType } from "@/lib/type";
import { CostAddSchema, IncomeAddSchema } from "@/lib/schema";

import { AddUserCostAction, DeleteUserCostAction, UpdateUserCostAction } from "@/server/action/cost-action";
import { AddUserIncomeAction, DeleteUserIncomeAction, UpdateUserIncomeAction } from "@/server/action/income-action";
import { toast } from "sonner";

interface RecordCostItemProps {
    curType: number;
    userId: string;
    record: CostRecordType | IncomeRecordType;
    assets: AssetRecordType[] | undefined;
}

export const RecordItem = ({
    curType,
    userId,
    record, 
    assets,
} : RecordCostItemProps) => {
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
            <button onClick={() => setIsOpen(true)} className="w-full duration-200 hover:opacity-75">
                <div className="mb-3 p-2 grid grid-cols-2 grid-rows-2 font-bold bg-yellow-400 rounded-lg dark:text-black">
                    <p className="flex items-center">{CostMapType.has(record.category) ? CostMapType.get(record.category) : IncomeMapType.get(record.category)}</p>
                    <div className="flex justify-end">
                        <div className={`p-1 rounded-lg text-white ${CostMapType.has(record.category) ? 'bg-red-400' : 'bg-green-400'}`}>{record.value}</div>
                    </div>
                    <p className="row-start-2 col-start-2 text-end">{
                        assets?.find((asset) => {
                            return asset.id === record.assetId;
                        })?.name
                    }</p>
                </div>
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>編輯</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" value='1' onClick={(e) => HandleTypeClick(e)} className={`${ type === 1 ? 'bg-yellow-400 hover:bg-yellow-400' : null}`}>支出</Button>
                    <Button variant="outline" value='2' onClick={(e) => HandleTypeClick(e)} className={`${ type === 2 ? 'bg-yellow-400 hover:bg-yellow-400' : null}`}>收入</Button>
                </div>

                <form action={HandleSubmit}>
                        <div className="grid gap-4 py-4">
                            <ValueInput defaultValue={record.value} />
                            <DateInput curDate={record.createdAt} />
                            <AssetsSelect assets={assets as AssetRecordType[]} error={assetError} defaultAssetId={record.assetId} />
                            <CategorySelect isCost={type === 1} error={categoryError} defaultCategory={record.category} />
                            <DescriptionInput defaultDescription={record.description} />    
                        </div>
                        <DialogFooter>
                            <Button type="submit">編輯</Button>
                        </DialogFooter>
                    </form>
                <DialogFooter>
                </DialogFooter>
                </DialogContent>
            </Dialog> 
        </>
    )
}