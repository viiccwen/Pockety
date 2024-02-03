"use client";

import { Skeleton } from "@/components/ui/skeleton"

export const PanelLoadingSkeleton = () => {
    return (
        <>
            <div className="flex space-x-[50px] h-[150px]">
                <div className="flex flex-col justify-center">
                    <Skeleton className="h-7 w-[100px]" />
                    <p>總資產</p>
                </div>

                <div className="flex flex-col justify-center">
                    <Skeleton className="h-7 w-[100px]" />
                    <p>負債</p>
                </div>

                <div className="flex flex-col justify-center">
                    <Skeleton className="h-7 w-[100px]" />
                    <p>本月收支</p>
                </div>
                <div className="flex flex-col justify-center">
                <Skeleton className="h-10 w-[100px]" />
                </div>
            </div>
        </>
    )
}

export const ListLoadingSkeleton = () => {
    return (
        <>
           <div className="flex flex-col space-y-6">
                <div className="flex justify-between">
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[100px]" />
                    <Skeleton className="h-7 w-[200px]" />
                </div>
                <div className="flex justify-between">
                    <Skeleton className="h-7 w-[100px]" />
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[100px]" />
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[100px]" />
                    <Skeleton className="h-7 w-[200px]" />
                </div>
                <div className="flex justify-between">
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[100px]" />
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[100px]" />
                    <Skeleton className="h-7 w-[200px]" />
                </div>
                <div className="flex justify-between">
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[200px]" />
                    <Skeleton className="h-7 w-[100px]" />
                    <Skeleton className="h-7 w-[200px]" />
                </div>
            </div>
        </>
    )
}