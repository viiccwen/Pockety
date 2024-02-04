"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"

import { useRouter } from "next/navigation";
import { CreateUserAssetAction, DeleteUserAssetAction, UpdateUserAssetAction } from "@/server/action/asset-action";
import { EditCategorySelect, EditInitialValueInput, EditNameInput } from "./func-item";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AssetAddSchema } from "@/lib/schema";
import { AssetRecordType } from "@/lib/type";

interface FuncMenuProps  {
    userId: string;
    asset: AssetRecordType;
}

export const FuncMenu = async ({ 
    userId, 
    asset 
} : FuncMenuProps) => {

    const router = useRouter();
    const [categoryError, setCategoryError] = useState<string>("");

    const HandleView = () => {
        router.push(`/assets/info/${asset.id}`);
    }

    const HandleDelete = async () => {
        const pms = DeleteUserAssetAction(userId, asset.id);

        toast.promise(pms, {
            loading: "新增中...",
            success: (res) => `${res}`,
            error: (err) => `${err}`,
        });
    };

    const HandleEdit = async (formdata: FormData) => {
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

            const pms = UpdateUserAssetAction(userId, asset.id, check.data);
            // const pms = new Promise<a>((resolve, reject) => setTimeout(() => reject({message: "ok"}), 2000));

            toast.promise(pms, {
                loading: "新增中...",
                success: (res) => `${res}`,
                error: (err) => `${err}`,
            });
            
            // pms.then(() => setOpen(false));
        }
    }
    
    return (
        <>
            <AlertDialog>
                <Dialog>
                
                <DropdownMenu>
                    <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={HandleView}>
                            <Eye size={18} className="mr-2" />
                            查看
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Pencil size={18} className="mr-2" />
                            <DialogTrigger>編輯</DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash size={18} className="mr-2" />
                                <AlertDialogTrigger>刪除</AlertDialogTrigger>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>資產編輯</DialogTitle>

                    <form action={HandleEdit}>
                        <div className="grid gap-4 py-4">
                            <EditNameInput name={asset.name} />
                            <EditCategorySelect error={categoryError} selected={asset.category} />
                            <EditInitialValueInput value={asset.initial_value} />
                        </div>
                        <DialogFooter>
                                <Button type="submit">編輯</Button>
                        </DialogFooter>
                    </form>

                    </DialogHeader>
                </DialogContent>
                
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>你確定要刪除嗎？</AlertDialogTitle>
                        <AlertDialogDescription>
                            刪除的動作便無法復原，請謹慎操作。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={HandleDelete}>繼續</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>

                </Dialog>
            </AlertDialog>
        </>
    );
}