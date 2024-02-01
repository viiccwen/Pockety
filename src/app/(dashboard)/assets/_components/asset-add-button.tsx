"use client";

import React, { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
  
import { Button } from "@/components/ui/button"

import { AssetAddSchema } from "@/lib/schema";

import { CreateUserAssetAction } from "@/server/action/asset-action";
import { toast } from "sonner";
import { CategorySelect, InitialValueInput, NameInput } from "./asset-add-input";

interface ButtonProps  {
    userId: string;
    children: React.ReactNode;
}

export const AssetAddButton = ({ userId, children } : ButtonProps) => {
    const [open, setOpen] = useState(false);

    const HandleSubmit = async (formdata: FormData) => {

        const category = formdata.get("category");
        const name = formdata.get("name");
        const initial_value = parseInt(formdata.get("initial-value") as string);
        const value = initial_value;
        const data = { category, name, initial_value, value };

        const check = AssetAddSchema.safeParse( data );

        if(!check.success) {
            console.log(check.error.flatten().fieldErrors);
            return;
        } else console.log(check.data);

        const res = await CreateUserAssetAction(userId, check.data);
        
        if(!res.success) {
            toast.error(res.message);
            return;
        }

        setOpen(false);

        {/* TODO: Change success to promise : loading... */}
        toast.success(res.message);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <Button>{children}</Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>新增資產</DialogTitle>
                    </DialogHeader>

                    <form action={HandleSubmit}>
                        <div className="grid gap-4 py-4">
                            <NameInput />
                            <CategorySelect />
                            <InitialValueInput />
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

