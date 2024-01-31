import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignInButton>Sign In</SignInButton>
    </>
  );
}
