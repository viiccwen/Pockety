import { Logo } from "@/components/logo"



export const Footer = () => {
    return (
        <nav className="fixed w-full bottom-0 flex items-center h-[90px] p-5 bg-amber-300">
            <div className="relative">
                <Logo />
            </div>
            <div className="absolute right-10 flex space-x-5">
            
            </div>
        </nav>
    )
}