"use client";

import { UserButton } from "@clerk/nextjs";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";

const NavItem = [
    {
        name: "首頁",
        href: "/dashboard",
    },
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Contact",
        href: "/contact",
    },
    {
        name: "Blog",
        href: "/blog",
    },
    {
        name: "Dashboard",
        href: "/dashboard",
    },
]

export const Navbar = () => {



    return (
        <nav className="flex items-center h-[90px] p-5 bg-amber-300">
            <div className="relative">
                <Logo />
            </div>
            <div className="absolute right-10 flex space-x-5">
                <ModeToggle />
                <div className="flex items-center">
                    <UserButton />
                </div>
            </div>
        </nav>
    )
}