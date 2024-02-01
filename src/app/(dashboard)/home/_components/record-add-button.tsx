"use client";

import { useState } from "react";
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

import { AssetRecordType } from "@/lib/type";
import { AssetsInput, CategorySelect, DateInput, DescriptionInput, ValueInput } from "./record-add-input";
import { CostAddSchema, IncomeAddSchema } from "@/lib/schema";
import { AddUserCostAction } from "@/server/action/cost-action";
import { AddUserIncomeAction } from "@/server/action/income-action";


export const RecordAddButton = ({ assets, userId }: {assets: AssetRecordType[], userId: string}) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<number>(1);

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
            console.log(check.error.flatten().fieldErrors);
            return;
        } else console.log(check.data);

        type ActionResult = {
            success: boolean;
            message: string;
        };

        let res: ActionResult;

        if(type === 1) {
            res = await AddUserCostAction(userId, check.data);
        } else if(type === 2) {
            res = await AddUserIncomeAction(userId, check.data);
        } else {
            {/* TODO: Implement transfer mode */}
            res = await AddUserCostAction(userId, check.data);
        }
        
        if(!res.success) {
            toast.error(res.message);
            return;
        }

        setOpen(false);

        {/* TODO: Change success to promise : loading... */}
        toast.success(res.message);
    };

    const HandleTypeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setType(parseInt(e.currentTarget.value));
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <Button>新增</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>新增紀錄</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" value='1' onClick={(e) => HandleTypeClick(e)} className={`${ type === 1 ? 'bg-yellow-400' : null}`}>支出</Button>
                        <Button variant="outline" value='2' onClick={(e) => HandleTypeClick(e)} className={`${ type === 2 ? 'bg-yellow-400' : null}`}>收入</Button>
                        <Button variant="outline" value='3' onClick={(e) => HandleTypeClick(e)} className={`${ type === 3 ? 'bg-yellow-400' : null}`}>轉帳</Button>
                    </div>

                    <form action={HandleSubmit}>
                        <div className="grid gap-4 py-4">
                            {type === 3 ? 
                                null
                            :
                                <>
                                    <ValueInput />
                                    <DateInput />
                                    <AssetsInput assets={assets} />
                                    <CategorySelect isCost={type === 1} />
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