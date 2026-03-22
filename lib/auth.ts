import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "./dbConnect";
import User from "./models/User";

export const authOptions: AuthOptions = {
    // Use JWT sessions — no database adapter needed for session storage
    session: { strategy: "jwt" },

    // Custom pages — we handle login via our own modal, not NextAuth's built-in UI
    pages: {
        signIn:  "/",
        error:   "/?auth_error=1",
    },

    providers: [
        // ── Google OAuth ───────────────────────────────────────────────────────
        GoogleProvider({
            clientId:     process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // ── Email + Password ───────────────────────────────────────────────────
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email:    { label: "Email",    type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required.");
                }

                await dbConnect();

                const user = await User.findOne({
                    email: credentials.email.toLowerCase().trim(),
                }).select("+password");

                if (!user || !user.password) {
                    throw new Error("Invalid email or password.");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Invalid email or password.");
                }

                if (!user.emailVerified) {
                    throw new Error("EMAIL_NOT_VERIFIED");
                }

                return {
                    id:    user._id.toString(),
                    email: user.email,
                    name:  user.name,
                    image: user.image,
                };
            },
        }),
    ],

    callbacks: {
        // Create / update MongoDB user on Google sign-in
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await dbConnect();
                const existing = await User.findOne({ email: user.email!.toLowerCase() });

                if (!existing) {
                    await User.create({
                        name:          user.name,
                        email:         user.email!.toLowerCase(),
                        image:         user.image,
                        emailVerified: new Date(), // Google emails are pre-verified
                        provider:      "google",
                    });
                } else if (!existing.emailVerified) {
                    // If they previously registered by credentials but not verified,
                    // Google proves the email — mark it verified.
                    await User.updateOne({ email: user.email }, { emailVerified: new Date() });
                }
            }
            return true;
        },

        // Attach our DB id to the JWT
        async jwt({ token, user }) {
            if (user?.id) token.id = user.id;
            return token;
        },

        // Expose id on the client-side session object
        async session({ session, token }) {
            if (session.user) {
                (session.user as { id?: string }).id = token.id as string;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};
