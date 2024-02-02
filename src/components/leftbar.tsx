import Link from "next/link"
import { Button } from "./ui/button"

import { BarChart3, Home, UserRound, Landmark } from "lucide-react"


const LeftBarItem = [
    {
        name: "首頁",
        link: "/home",
        icon: <Home size={17} />,
    },
    {
        name: "資產",
        link: "/assets",
        icon: <Landmark size={17} />,
    },
    {
        name: "統計",
        link: "/statistics",
        icon: <BarChart3 size={17} />,
    },
    {
        name: "關於",
        link: "/about",
        icon: <UserRound size={17} />,
    }
]

export const LeftBar = () => {

    return (
        <div className="absolute left-[100px]">
            <p className=" font-bold text-3xl mb-5">清單</p>
            <div className="flex flex-col space-y-5">
                {LeftBarItem.map((item) => (
                    <>
                    <Button key={item.name} variant="ghost">
                        <div className="flex items-center space-x-4">
                            {item.icon}
                            <Link href={item.link} className="text-base font-bold">{item.name}</Link>    
                        </div>
                    </Button>
                    </>
                ))}
            </div>
        </div>
    )
}