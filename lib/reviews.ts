import { db } from "./firebase";
import { 
  collection, addDoc, getDocs, updateDoc, 
  deleteDoc, doc, query, orderBy, onSnapshot 
} from "firebase/firestore";

export interface Review {
  id?:       string;
  name:      string;
  role:      string;
  comment:   string;
  rating:    number;
  avatar:    string;
  status:    "Active" | "Pending" | "Archived";
  location:  string;
  vehicle:   string;
  createdAt: any;
}

const COLLECTION_NAME = "reviews";

// ─── CRUD Helpers ─────────────────────────────────────────────────────────────

export function subscribeReviews(callback: (data: Review[]) => void) {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review)));
  });
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
  } catch (err) {
    console.error("Reviews: Failed to fetch reviews", err);
    return [];
  }
}

export async function addReview(review: Partial<Review>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...review,
    status: review.status || "Active",
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function updateReview(id: string, review: Partial<Review>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), review);
}

export async function deleteReview(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
