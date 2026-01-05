"use client";    // A client-component cz we're using hooks..like useState, useAuth.

import ModeToggle from "../ModeToggle";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, Home, LogOut, Menu, User } from "lucide-react";

import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
// import { useTheme } from "next-themes";
import Link from "next/link";






function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  // const { theme, setTheme } = useTheme();


  return (
    <div className="flex md:hidden items-center space-x-2">

      {/* MODE-TOGGLE */}
      <ModeToggle />
      

      {/* SHEET */}
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>

        <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
        </SheetTrigger>


        <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col space-y-4 mt-6">
              <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </Button>

              {isSignedIn ? (
                <>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                    <Link href="/notifications">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </Link>
                  </Button>

                  <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                    <Link href="/profile">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </Button>

                  <SignOutButton>
                    <Button variant="ghost" className="flex items-center gap-3 justify-start w-full">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </SignOutButton>
                </>
              ) 
              : (
                <SignInButton mode="modal">
                  <Button variant="default" className="w-full">
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </nav>
            
        </SheetContent>

      </Sheet>
    </div>

  );
}

export default MobileNavbar;



// open={showMobileMenu} onOpenChange={setShowMobileMenu} ===>  Initially, the menu is closed (false). When the user clicks the menu button or interacts with the Sheet, onOpenChange is triggered and updates the state using setShowMobileMenu to true.. The open prop then becomes true which reflects this updated state, causing the menu to open or close accordingly.