"use server"

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server"



export async function syncUser() {
  
    try {
        const { userId } = await auth();  // server-component
        const user = await currentUser(); // server-component
        // console.log(user);

        if (!user || !userId) return;

        // Check if user already exist in DB:
        const userExists = await prisma.user.findUnique({
            where: {
                clerkId: userId
            }
        });
        if (userExists) return userExists;



        const dbUser = await prisma.user.create({
            data: {
                clerkId: userId,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
            }
        })
        
        console.log("New user created:", dbUser.username);
        return dbUser;

    } 
    catch (error) {
        console.log("Error in syncUser:", error);
    }


};