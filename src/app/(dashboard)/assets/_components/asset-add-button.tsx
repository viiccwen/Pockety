"use client";

import React, { useEffect, useState } from "react";

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
    const [categoryError, setCategoryError] = useState<string>("");

    const HandleSubmit = async (formdata: FormData) => {

        const category = formdata.get("category");
        const name = formdata.get("name");
        const initial_value = parseInt(formdata.get("initial-value") as string);
        const value = initial_value;
        const data = { category, name, initial_value, value };

        const check = AssetAddSchema.safeParse( data );

        
        if(!check.success) {
            const errorArray = check.error.flatten();
            errorArray.fieldErrors.category ? setCategoryError("請選擇類別！") : null;
            return;
        } else console.log(check.data);


        {/* TODO: Change success to promise : loading... */}
        {/* ISSUE: Solve the "Error: Error:" string */}
        if(check.success) {

            const pms = CreateUserAssetAction(userId, check.data);
            // const pms = new Promise<a>((resolve, reject) => setTimeout(() => reject({message: "ok"}), 2000));

            toast.promise(pms, {
                loading: "新增中...",
                success: (res) => `${res}`,
                error: (err) => `${err}`,
            });
            
            pms.then(() => setOpen(false));
        }
    };

    useEffect(() => {
        setCategoryError("");
    }, [open]);

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
                            <CategorySelect error={categoryError} />
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

