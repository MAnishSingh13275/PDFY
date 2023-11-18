import { db } from "@/lib/DB";
import { userSubscriptions } from "@/lib/DB/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const return_url = process.env.NEXT_BASE_URL + '/account'

export async function GET(){
    try{
        const {userId} = await auth()
        const user = await currentUser()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const _userSubscriptions = await db.select().from(userSubscriptions).where(eq(userSubscriptions.userId, userId))

        if(_userSubscriptions[0] && _userSubscriptions[0].stripeSubscriptionId){
           customer: _userSubscriptions[0].stripeCustomerId,
           return_url: return_url
        }


    }
}