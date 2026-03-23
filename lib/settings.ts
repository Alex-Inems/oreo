import { db } from "./firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export const DEFAULT_SETTINGS = {
    siteName: "Velocity Cars26",
    tagline: "Performance & Luxury — Redefined",
    contactEmail: "contact@cars26.com",
    phone: "+1 (800) 555-0100",
    emailNewInquiry: true,
    emailNewReview: true,
    emailNewUser: false,
    emailDigest: true,
    twoFactor: false,
    accentColor: "#dc2626",
    darkMode: true,
    showSoldBadge: true,
};

export type SiteSettings = typeof DEFAULT_SETTINGS;

export function subscribeSettings(callback: (data: SiteSettings) => void) {
    const docRef = doc(db, "sys", "settings");
    return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback({ ...DEFAULT_SETTINGS, ...(docSnap.data() as Partial<SiteSettings>) });
        } else {
            callback(DEFAULT_SETTINGS);
        }
    });
}

export async function updateSettings(data: Partial<SiteSettings>): Promise<void> {
    await setDoc(doc(db, "sys", "settings"), data, { merge: true });
}
