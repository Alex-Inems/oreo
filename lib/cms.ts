import { db } from "./firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

// ─── Default Content ──────────────────────────────────────────────────────────
// This is used as a fallback and as the initial data if Firestore is empty.
export const DEFAULT_CONTENT = {
    hero: {
        title:    "REDEFINE THE EXTRAORDINARY",
        subtitle: "Experience Velocity",
        cta:      "View Collection",
    },
    mission: {
        heading: "BEYOND PERFORMANCE",
        text:    "At Velocity, we believe a car is more than just transportation. It's an expression of your soul, a masterpiece of engineering, and a portal to pure adrenaline.",
    },
    footer_tagline: "VELOCITY CARS26",
    contact_email:  "sales@cars26.com",
    contact_phone:  "+1 (555) 012-3456",
};

export type SiteContent = typeof DEFAULT_CONTENT;

// ─── CMS Helpers ─────────────────────────────────────────────────────────────
export async function getSiteContent(): Promise<SiteContent> {
    try {
        const docRef = doc(db, "site", "content");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as SiteContent;
        }
        return DEFAULT_CONTENT;
    } catch (err) {
        console.error("CMS: Failed to fetch content", err);
        return DEFAULT_CONTENT;
    }
}

export function subscribeSiteContent(callback: (data: SiteContent) => void): () => void {
    const docRef = doc(db, "site", "content");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data() as SiteContent);
        } else {
            callback(DEFAULT_CONTENT);
        }
    }, (error) => {
        console.error("CMS: Failed to fetch onSnapshot", error);
        callback(DEFAULT_CONTENT);
    });
    return unsubscribe;
}

export async function updateSiteContent(data: Partial<SiteContent>): Promise<void> {
    const docRef = doc(db, "site", "content");
    // Merge existing data if any
    await setDoc(docRef, data, { merge: true });
}
