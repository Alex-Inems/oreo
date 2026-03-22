import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;        // undefined for OAuth-only accounts
    image?: string;
    emailVerified?: Date;
    verificationToken?: string;
    verificationTokenExpiry?: Date;
    provider: "credentials" | "google";
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name:                    { type: String, required: true, trim: true },
        email:                   { type: String, required: true, unique: true, lowercase: true, trim: true },
        password:                { type: String, select: false }, // excluded from queries by default
        image:                   { type: String },
        emailVerified:           { type: Date },
        verificationToken:       { type: String },
        verificationTokenExpiry: { type: Date },
        provider:                { type: String, enum: ["credentials", "google"], default: "credentials" },
    },
    { timestamps: true }
);

// Compound index speeds up auth lookups
UserSchema.index({ email: 1 });
UserSchema.index({ verificationToken: 1 });

const User: Model<IUser> =
    mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
