import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { AssetRecordType, CostMapType, IncomeMapType } from "@/lib/type";
import { Textarea } from "@/components/ui/textarea";
import { ErrorTooltip } from "@/components/error-tooltip";

export const AssetsSelect = ({ assets, error, defaultAssetId } : { assets: AssetRecordType[], error: string, defaultAssetId ?: number}) => {
    return (
        
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="flex items-center justify-end gap-2">
            <ErrorTooltip error={error} />
            資產
            </Label>
            <Select name="asset" defaultValue={defaultAssetId?.toString()}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="選擇一項" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            assets.map((asset) => (
                                <SelectItem key={asset.id} value={asset.id.toString()}>{asset.name}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export const CategorySelect = ({ isCost, error, defaultCategory } : { isCost: boolean, error: string, defaultCategory ?: string}) => {

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="flex items-center justify-end gap-2">
                <ErrorTooltip error={error} />類別
            </Label>
            <Select name="category" defaultValue={defaultCategory}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="選擇一項" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            isCost ?
                            Array.from(CostMapType).map(([key, value]) => (
                                <SelectItem key={key} value={key}>{value}</SelectItem>
                                ))
                                :
                                Array.from(IncomeMapType).map(([key, value]) => (
                                    <SelectItem key={key} value={key}>{value}</SelectItem>
                                    ))
                                }
                    </SelectGroup>
                </SelectContent>
            </Select>
            
        </div>
    );
};

export const ValueInput = ({ defaultValue } : { defaultValue ?: number}) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-end">
            金額
            </Label>
            {
                defaultValue == undefined 
                ? <Input type="number" name="value" id="value" className="col-span-3" required/>
                : <Input type="number" name="value" id="value" className="col-span-3" defaultValue={defaultValue} required/>
            }
            
        </div>
    )
};

export const DescriptionInput = ({ defaultDescription } : { defaultDescription ?: string}) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-end">
            備註
            </Label>
            {
                defaultDescription == undefined 
                ? <Textarea name="description" id="description" className="col-span-3" />
                : <Textarea name="description" id="description" className="col-span-3" defaultValue={defaultDescription} />
            }
        </div>
    )
}

export const DateInput = ({ curDate } : { curDate : Date }) => {
    const formateDate = (date: Date) => {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = (date.getDate()).toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    } 

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-end">
            日期
            </Label>
            <Input type="date" name="date" id="date" defaultValue={formateDate(curDate)} className="col-span-3" required/>
        </div>
    )
}