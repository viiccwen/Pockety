import { Loader2 } from "lucide-react";

export const Loading = () => {
    return (
        <div className="flex items-center gap-2">
            <Loader2 className=" animate-spin" />
            載入中...
        </div>
    );
}