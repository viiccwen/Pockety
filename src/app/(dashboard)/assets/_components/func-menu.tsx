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

import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"

import { useState } from "react";

import { useRouter } from "next/navigation";
import { DeleteUserAssetAction } from "@/server/action/asset-action";
import { toast } from "sonner";



export const FuncMenu = async ({ userId, assetId } : {userId: string, assetId: number}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const HandleView = () => {
        router.push(`/assets/info/${assetId}`);
    }

    const HandleDelete = async () => {
        const pms = DeleteUserAssetAction(userId, assetId);

        toast.promise(pms, {
            loading: "新增中...",
            success: (res) => `${res}`,
            error: (err) => `${err}`,
        });
        
        pms.then(() => setIsOpen(false));
    };

    const HandleEdit = () => {

    }
    
    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                
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
                            編輯
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash size={18} className="mr-2" />
                                <AlertDialogTrigger>刪除</AlertDialogTrigger>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
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

            </AlertDialog>
        </>
    );
}