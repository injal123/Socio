// server component

import ModeToggle from "../ModeToggle";

import { Bell, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";






async function DesktopNavbar() {
  const user = await currentUser();  // get authUserInfo from clerk...from server.

  return (
    <div className="hidden md:flex items-center space-x-4">

      <ModeToggle />

      {/* HOME-btn --> used asChild cz Link's inside of button (also used for a-tag.) */}
      <Button variant="ghost" className="flex items-center gap-2" asChild> 
        <Link href="/">
          <Home className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          {/* NOTIFICATION-btn */}
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <Bell className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>

          {/* PROFILE-btn */}
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>


          {/* USER-btn */}
          <UserButton />
        </> 
      ) 
      : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}

    </div>
  );
}
export default DesktopNavbar;





// Case 1
// user.username = "sanji"

// URL: /profile/sanji  (this is URL if user.username exists, and don't goto case 2.)



// Case 2 (if user.username isn't available then...)
// user.username = null
// email = "hello.world@gmail.com"

// URL: /profile/hello.world