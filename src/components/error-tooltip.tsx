import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    } from "@/components/ui/tooltip"
import { XCircle } from "lucide-react"

export const ErrorTooltip = ({ error } : { error : string }) => {
    if(error === "") return null;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger><XCircle  color="red" size={16} /></TooltipTrigger>
                <TooltipContent>
                <p>{error}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}