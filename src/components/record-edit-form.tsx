'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import { AssetsSelect, CategorySelect, DateInput, DescriptionInput, ValueInput } from "@/components/record-form-input";
import { AssetRecordType } from "@/lib/type";

interface RecordEditFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    record: any;
    assets: any;
    type: number;
    categoryError: string;
    assetError: string;
    onTypeClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onSubmit: (formdata: FormData) => void;
}

export const RecordEditForm = ({
    isOpen,
    setIsOpen,
    record,
    assets,
    type,
    categoryError,
    assetError,
    onTypeClick,
    onSubmit
} : RecordEditFormProps) => {
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>編輯</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" value='1' onClick={(e) => onTypeClick(e)} className={`${ type === 1 ? 'bg-yellow-400 hover:bg-yellow-400' : null}`}>支出</Button>
                    <Button variant="outline" value='2' onClick={(e) => onTypeClick(e)} className={`${ type === 2 ? 'bg-yellow-400 hover:bg-yellow-400' : null}`}>收入</Button>
                </div>

                <form action={onSubmit}>
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