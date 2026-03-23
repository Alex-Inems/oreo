import { db } from "./firebase";
import { 
  collection, addDoc, updateDoc, 
  deleteDoc, doc, onSnapshot, query, orderBy 
} from "firebase/firestore";

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  carId?: number | string;
  carName?: string;
  status: "new" | "contacted" | "closed";
  date: string;
  createdAt: any;
}

const COLLECTION = "inquiries";

export function subscribeInquiries(callback: (data: Inquiry[]) => void) {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
    callback(list);
  }, (err) => {
    console.error("Failed to subscribe to inquiries:", err);
    callback([]);
  });
}

export async function addInquiry(inquiry: Partial<Inquiry>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...inquiry,
    status: inquiry.status || "new",
    date: new Date().toLocaleDateString(),
    createdAt: new Date()
  });
  return docRef.id;
}

export async function updateInquiry(id: string, status: Inquiry["status"]): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { status });
}

export async function deleteInquiry(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
