import { db } from "./firebase";
import { 
  collection, addDoc, updateDoc, 
  deleteDoc, doc, onSnapshot, query, orderBy, getDocs, where 
} from "firebase/firestore";

export interface CustomPage {
  id?: string;
  slug: string;
  title: string;
  content: string; 
  createdAt: any;
}

const COLLECTION = "pages";

export function subscribePages(callback: (data: CustomPage[]) => void) {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CustomPage)));
  }, (err) => {
    console.error(err);
    callback([]);
  });
}

export async function getPageBySlug(slug: string): Promise<CustomPage | null> {
  const q = query(collection(db, COLLECTION), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as CustomPage;
}

export async function addPage(page: Partial<CustomPage>): Promise<string> {
  const slug = page.slug?.toLowerCase().replace(/[^a-z0-9-]/g, '-') || "new-page";
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...page,
    slug,
    content: page.content || "",
    createdAt: new Date()
  });
  return docRef.id;
}

export async function updatePage(id: string, page: Partial<CustomPage>): Promise<void> {
  const data = { ...page };
  if (data.slug) data.slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  await updateDoc(doc(db, COLLECTION, id), data);
}

export async function deletePage(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
