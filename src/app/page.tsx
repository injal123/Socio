// children


import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";



export default function Home() {
  return (
    <div>
        <header className="flex items-center p-4 h-16 bg-red-700">
              Welcome to HomePage !!
        </header>
    </div>
  );
}