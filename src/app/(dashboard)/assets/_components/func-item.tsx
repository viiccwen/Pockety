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

import { AssetMapType } from "@/lib/type";
import { ErrorTooltip } from "@/components/error-tooltip";

export const EditNameInput = ({ name } : { name : string }) => {

    return (
        <>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                名稱
                </Label>
                <Input id="name" name="name" className="col-span-3" value={name} required/>
            </div>
        </>
    );
}

export const EditCategorySelect = ({ error, selected } : { error : string, selected : string }) => {

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="flex items-center justify-end gap-2">
            <ErrorTooltip error={error} />
            類別
            </Label>
            
            <Select name="category" defaultValue={selected}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="選擇一項" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            Array.from(AssetMapType).map(([key, value]) => (
                                <SelectItem 
                                    key={key} 
                                    value={key}
                                >
                                    {value}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export const EditInitialValueInput = ({ value } : { value : number }) => {

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="initial-value" className="text-right">
            初始金額
            </Label>
            <Input type="number" name="initial-value" id="initial-value" className="col-span-3" defaultValue={value} required/>
        </div>
    )
}