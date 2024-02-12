import Link from "next/link"
import { Button } from "./ui/button"

import { 
    BarChart3, 
    Home, 
    UserRound, 
    Landmark, 
    HandCoins, 
    CircleDollarSign 
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

const LeftBarItem = [
    {
        name: "首頁",
        link: "/home",
        icon: <Home size={17} />,
        child: null,
    },
    {
        name: "資產",
        link: "/assets",
        icon: <Landmark size={17} />,
        child: null,
    },
    {
        name: "統計",
        link: "/statistics",
        icon: <BarChart3 size={17} />,
        child: [
            {
                name: "支出",
                link: "/statistics?type=cost&method=month",
                icon: <CircleDollarSign size={17} />,
            },
            {
                name: "收入",
                link: "/statistics?type=income&method=month",
                icon: <HandCoins size={17} />,
            }
        ]
    },
    {
        name: "關於",
        link: "/about",
        icon: <UserRound size={17} />,
        child: null,
    }
]

export const LeftBar = ({ active } : { active: string }) => {
    
    return (
        <div className="absolute left-[100px]">
            <p className=" font-bold text-3xl mb-5">清單</p>

            <div className="flex flex-col space-y-5">
                {LeftBarItem.map((item) => (
                    item.child 
                    ? 
                    <div key={item.name}>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" asChild>
                                    <div className={`flex items-center space-x-4 hover:text-amber-500 ${active == item.link ? 'text-amber-500' : null}`}>
                                        {item.icon}
                                        <Link 
                                            href={item.link} 
                                            className={`text-base font-bold ${active == item.link ? 'text-amber-500' : null}`}>
                                                {item.name}
                                        </Link>    
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {item.child.map((child) => (
                                    <DropdownMenuItem key={child.name}>
                                        <div className={`flex items-center space-x-4 hover:text-amber-500 ${active == child.link ? 'text-amber-500' : null}`}>
                                            {child.icon}
                                            <Link 
                                                href={child.link} 
                                                className={`text-base font-bold ${active == child.link ? 'text-amber-500' : null}`}>
                                                    {child.name}
                                            </Link>    
                                        </div>
                                    </DropdownMenuItem>
                                
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div> 
                    : 
                    <div key={item.name}>
                        <Button variant="ghost" asChild>
                            <div className={`flex items-center space-x-4 hover:text-amber-500 ${active == item.link ? 'text-amber-500' : null}`}>
                                {item.icon}
                                <Link 
                                    href={item.link} 
                                    className={`text-base font-bold ${active == item.link ? 'text-amber-500' : null}`}>
                                        {item.name}
                                </Link>    
                            </div>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}