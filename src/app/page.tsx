import { Button } from "@/components/ui/button";
import { SignInButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  
  if(user) redirect("/home");

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <SignInButton afterSignInUrl="/home">
            <Button>Sign in</Button>
        </SignInButton>
      </div>
    </>
  );
}
