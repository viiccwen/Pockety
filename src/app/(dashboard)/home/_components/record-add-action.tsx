"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { AssetRecordType, CostRecordType, IncomeRecordType } from "@/lib/type";
import { AssetsSelect, CategorySelect, DateInput, DescriptionInput, ValueInput } from "@/components/record-form-input";
import { CostAddSchema, IncomeAddSchema } from "@/lib/schema";
import { AddUserCostAction, GetMonthlyCostAction } from "@/server/action/cost-action";
import { AddUserIncomeAction, GetMonthlyIncomeAction } from "@/server/action/income-action";

interface RecordAddActionProps {
    assets: AssetRecordType[];
    userId: string;
    isOpen: boolean;
    curDate: Date;
    setIsOpen: (open: boolean) => void;
    setRefresh: (refresh: boolean) => void;
};

export const RecordAddAction = ({ 
    assets, 
    userId,
    curDate,
    isOpen, 
    setIsOpen,
    setRefresh
}: RecordAddActionProps) => {
    
    const [type, setType] = useState<number>(1);
    const [categoryError, setCategoryError] = useState<string>("");
    const [assetError, setAssetError] = useState<string>("");

    const HandleSubmit = async (formdata: FormData) => {

        const category = formdata.get("category");
        const assetId = parseInt(formdata.get("asset") as string);
        const value = parseInt(formdata.get("value") as string);
        const description = formdata.get("description");
        const createdAt = new Date(formdata.get("date") as string);
        const data = { value, createdAt, assetId, category, description };

        let check;
        if(type === 1) {
            check = CostAddSchema.safeParse( data );
        } else if(type === 2) {
            check = IncomeAddSchema.safeParse( data );
        } else {
            {/* TODO: Implement transfer mode */}
            check = CostAddSchema.safeParse( data ); 
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

        if(type === 1) {
            pms = AddUserCostAction(userId, check.data);
        } else if(type === 2) {
            pms = AddUserIncomeAction(userId, check.data);
        } else {
            {/* TODO: Implement transfer mode */}
            pms = AddUserCostAction(userId, check.data);
        }

        toast.promise(pms, {
            loading: "新增中...",
            success: (res) => `${res}`,
            error: (err) => `${err}`,
        });
        
        pms.then(() => setIsOpen(false));

        // let my data update!!!
        setRefresh(true);
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
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>新增紀錄</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" value='1' onClick={(e) => HandleTypeClick(e)} className={`${ type === 1 ? 'bg-yellow-400 hover:bg-yellow-400' : null}`}>支出</Button>
                        <Button variant="outline" value='2' onClick={(e) => HandleTypeClick(e)} className={`${ type === 2 ? 'bg-yellow-400 hover:bg-yellow-400' : null}`}>收入</Button>
                    </div>

                    <form action={HandleSubmit}>
                        <div className="grid gap-4 py-4">
                            {type === 3 ? 
                                null
                            :
                                <>
                                    <ValueInput />
                                    <DateInput curDate={curDate} />
                                    <AssetsSelect assets={assets} error={assetError} />
                                    <CategorySelect isCost={type === 1} error={categoryError} />
                                    <DescriptionInput />
                                </>
                            }
                        </div>
                        <DialogFooter>
                            <Button type="submit">新增</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    )
}