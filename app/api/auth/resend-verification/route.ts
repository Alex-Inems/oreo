import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required." }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findOne({ email: email.toLowerCase().trim() });

        // Always return success to prevent email enumeration
        if (!user || user.emailVerified) {
            return NextResponse.json({ message: "If applicable, a new verification email has been sent." });
        }

        const verificationToken       = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await User.updateOne(
            { _id: user._id },
            { verificationToken, verificationTokenExpiry }
        );

        await sendVerificationEmail(user.email, user.name, verificationToken);

        return NextResponse.json({ message: "Verification email resent. Please check your inbox." });
    } catch (err) {
        console.error("[resend-verification]", err);
        return NextResponse.json({ error: "Failed to resend. Please try again." }, { status: 500 });
    }
}
