import Image from "next/image"
import Link from "next/link"



export const Logo = () => {
    return (
        <Link href={"/home"}>
            <div className="hover:opacity-75 transition items-center gap-x-2 md:flex">
                <Image
                    src="/pockety.png" 
                    alt="Logo"
                    height={150}
                    width={150}
                />
            </div>
        </Link>
    )
}