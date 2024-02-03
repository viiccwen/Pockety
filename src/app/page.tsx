import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Navbar } from "./(platform)/_components/navbar";
import { ArrowRightCircle, Link, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default async function Page() {
  const user = await currentUser();
  
  if(user) redirect("/home");

  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center flex-col">
          <div className="flex items-center justify-center flex-col">

            <div className="hover:opacity-75 transition items-center gap-x-2 md:flex">
              <Image
                  src="/logo.png" 
                  alt="Logo"
                  height={300}
                  width={300}
              />
            </div>
              <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                  <Medal className="h-6 w-6 mr-2" />
                  <span>sideproject - 理財APP</span>
              </div>
          </div>

          <div className={cn("text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto")}>
              收入、支出、資產、統計，一站式管理你的財務
          </div>
          
            <SignUpButton afterSignUpUrl="/home" afterSignInUrl="/home">
              <Button className="mt-8" variant="outline" color="" size="lg">
                  <div className="flex items-center">
                    開始使用<ArrowRightCircle className="ml-2" />
                  </div>
              </Button>
            </SignUpButton>
      </div>
    </>
  );
}
