// children


import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";



export default function Home() {
  return (
    <div>
        <header className="flex justify-end items-center p-4 gap-4 h-16 bg-red-700">
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

            <ModeToggle />
        </header>
    </div>
  );
}