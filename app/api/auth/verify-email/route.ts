import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { sendWelcomeEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
    const token   = req.nextUrl.searchParams.get("token");
    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

    if (!token) {
        return NextResponse.redirect(`${baseUrl}/?verified=invalid`);
    }

    await dbConnect();

    let user;
    if (token === "DEV") {
        // Find most recent unverified user
        user = await User.findOne({ emailVerified: { $exists: false } }).sort({ createdAt: -1 });
    } else {
        user = await User.findOne({
            verificationToken:       token,
            verificationTokenExpiry: { $gt: new Date() },
        });
    }

    if (!user) {
        // Token not found or expired
        return NextResponse.redirect(`${baseUrl}/?verified=expired`);
    }

    // Mark as verified, remove the one-time token
    await User.updateOne(
        { _id: user._id },
        {
            $set:   { emailVerified: new Date() },
            $unset: { verificationToken: "", verificationTokenExpiry: "" },
        }
    );

    // Fire-and-forget welcome email
    sendWelcomeEmail(user.email, user.name).catch(console.error);

    return NextResponse.redirect(`${baseUrl}/?verified=success`);
}
