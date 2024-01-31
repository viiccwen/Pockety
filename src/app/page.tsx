import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignInButton afterSignInUrl="/home">
          <Button>Sign in</Button>
      </SignInButton>
    </>
  );
}
