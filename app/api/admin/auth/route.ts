//   create multiple moderators for the app so there can be uniqueness in it
//  it won't be only one person doing the posting, whoever is in charge can post the necessary things when due


import { NextRequest, NextResponse } from "next/server";
 
const userSchema = [{
    firstName,
    lastName,
    email,
    password,
    confirmpassword,

}]

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = userSchema.safeParse(body);
        
    } catch (error) {
        
    }   
}