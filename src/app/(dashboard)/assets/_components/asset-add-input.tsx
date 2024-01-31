import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { SelectType } from "@/lib/type/enum-type";

export const NameInput = () => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
            名稱
            </Label>
            <Input id="name" name="name" className="col-span-3" required/>
        </div>
    );
};



export const CategorySelect = () => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
            類別
            </Label>
            
            <Select name="category">
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="選擇一項" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            Array.from(SelectType).map(([key, value]) => (
                                <SelectItem key={key} value={key}>{value}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export const InitialValueInput = () => {
    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="initial-value" className="text-right">
            初始金額
            </Label>
            <Input type="number" name="initial-value" id="initial-value" className="col-span-3" required/>
        </div>
    )
};