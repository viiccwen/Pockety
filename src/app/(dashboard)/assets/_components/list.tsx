"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { AssetRecordType } from "@/lib/type";

import { $Enums } from "@prisma/client";
import { CandlestickChart, ChevronRight, CircleDollarSign, Coins, Landmark, Receipt } from "lucide-react";
import Link from "next/link";

export const List = ({ Assets } : { Assets: AssetRecordType[]}) => {

    const Category = (category: $Enums.assetType) => {
        if(category === "CASH") return <div className="flex"><CircleDollarSign size={18} className="mr-2" /> 現金</div>;
        if(category === "STOCK") return <div className="flex"><CandlestickChart size={18} className="mr-2" /> 股票</div>;
        if(category === "BANK") return <div className="flex"><Landmark size={18} className="mr-2" /> 銀行</div>;
        if(category === "CHECK") return <div className="flex"><Receipt  size={18} className="mr-2" /> 支票</div>;
        if(category === "OTHER") return <div className="flex"><Coins  size={18} className="mr-2" /> 其他</div>;
    }

    return (
        <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">名稱</TableHead>
                        <TableHead className="font-bold">類型</TableHead>
                        <TableHead className="font-bold">初始金額</TableHead>
                        <TableHead className="font-bold">總金額</TableHead>
                        <TableHead className="font-bold">前往</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Assets.map((asset, index) => (
                        <TableRow key={index}>
                            <TableCell key={`${index}-${asset.name}`}>{asset.name}</TableCell>
                            <TableCell key={`${index}-${asset.category}`}>{Category(asset.category)}</TableCell>
                            <TableCell 
                                key={`initial_value-${index}-${asset.initial_value}`} 
                                className={asset.initial_value < 0 ? "text-red-500" : "text-green-600"}
                            >
                                {asset.initial_value}
                            </TableCell>
                            <TableCell 
                                key={`value-${index}-${asset.value}`} 
                                className={asset.value < 0 ? "text-red-500" : "text-green-600"}
                            >
                                {asset.value}
                            </TableCell>
                            <TableCell key={`goto-${index}`}>
                                <Button variant="ghost" asChild>
                                    <Link href={`assets/info/${asset.id}`}>
                                        <ChevronRight size={18} />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
        </Table>
    )
}