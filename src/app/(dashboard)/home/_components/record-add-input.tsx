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

export const AssetsInput = ({ assets, error } : { assets: AssetRecordType[], error: string}) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="flex items-center justify-end gap-2">
            <ErrorTooltip error={error} />
            資產
            </Label>
            
            <Select name="asset">
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

export const CategorySelect = ({ isCost, error } : { isCost: boolean, error: string}) => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="flex items-center justify-end gap-2">
            <ErrorTooltip error={error} />
            類別
            </Label>
            
            <Select name="category">
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

export const ValueInput = () => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-end">
            金額
            </Label>
            <Input type="number" name="value" id="value" className="col-span-3" required/>
        </div>
    )
};

export const DescriptionInput = () => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-end">
            備註
            </Label>
            <Textarea name="description" id="description" className="col-span-3" />
        </div>
    )
}

export const DateInput = () => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-end">
            日期
            </Label>
            <Input type="date" name="date" id="date" className="col-span-3" required/>
        </div>
    )
}