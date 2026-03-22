import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        // ── Validation ────────────────────────────────────────────────────────
        if (!name?.trim() || !email?.trim() || !password) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }
        if (name.trim().length < 2) {
            return NextResponse.json(
                { error: "Name must be at least 2 characters." },
                { status: 400 }
            );
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }
        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters." },
                { status: 400 }
            );
        }

        await dbConnect();

        // ── Duplicate check ───────────────────────────────────────────────────
        const existing = await User.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return NextResponse.json(
                { error: "An account with this email already exists." },
                { status: 409 }
            );
        }

        // ── Create user ───────────────────────────────────────────────────────
        const hashedPassword        = await bcrypt.hash(password, 12);
        const verificationToken     = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 h

        await User.create({
            name:    name.trim(),
            email:   email.toLowerCase().trim(),
            password: hashedPassword,
            provider: "credentials",
            verificationToken,
            verificationTokenExpiry,
        });

        // ── Send verification email ───────────────────────────────────────────
        await sendVerificationEmail(email.toLowerCase().trim(), name.trim(), verificationToken);

        return NextResponse.json({
            message: "Account created! Please check your inbox and verify your email before signing in.",
        });
    } catch (err) {
        console.error("[register]", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
