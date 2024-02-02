import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignInButton } from "@clerk/nextjs"



export const Navbar = () => {
    return (
        <nav className="fixed w-full flex items-center h-[60px] p-5 bg-amber-300">
            <div className="relative">
                <Logo />
            </div>
            <div className="absolute right-10 flex space-x-5">
                <SignInButton>
                    <Button variant="outline" size="lg" className="bg-white text-black">登入</Button>
                </SignInButton>
            </div>
        </nav>
    )
}