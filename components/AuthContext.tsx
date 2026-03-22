"use client";

import { createContext, useContext } from "react";
import { useSession, signOut } from "next-auth/react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AuthUser {
    id?: string;
    name: string;
    email: string;
    image?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
// Wraps NextAuth's useSession into the same interface the rest of the app uses.
// No localStorage logic needed — NextAuth handles session persistence via a
// signed JWT cookie.
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    const user: AuthUser | null = session?.user
        ? {
              id:    (session.user as AuthUser).id,
              name:  session.user.name  ?? "Member",
              email: session.user.email ?? "",
              image: session.user.image ?? undefined,
          }
        : null;

    const logout = () => signOut({ callbackUrl: "/" });

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: status === "authenticated",
                isLoading:       status === "loading",
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
