import { db } from "./firebase";
import { 
  collection, addDoc, getDocs, updateDoc, 
  deleteDoc, doc, query, orderBy, getDoc, onSnapshot
} from "firebase/firestore";

export interface CarSpec {
  label: string;
  value: string;
}

export interface Car {
  id?:       string;
  make:      string;
  model:     string;
  year:      number;
  price:     number;
  image:     string;
  images:    string[];
  condition: "New" | "Used" | "Certified";
  bodyType:  string;
  engine:    string;
  mileage:   number;
  description: string;
  specs:     CarSpec[];
  featured:  boolean;
  createdAt?: any;
}

const COLLECTION_NAME = "inventory";

// ─── CRUD Helpers ─────────────────────────────────────────────────────────────

export function subscribeInventory(callback: (data: Car[]) => void) {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car)));
  }, (err) => {
    console.error("Inventory: Failed to subscribe", err);
  });
}

export async function getAllCars(): Promise<Car[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Car));
  } catch (err) {
    console.error("Inventory: Failed to fetch all cars", err);
    return [];
  }
}

export async function getCarById(id: string): Promise<Car | null> {
  try {
    const docSnap = await getDoc(doc(db, COLLECTION_NAME, id));
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() } as Car;
    return null;
  } catch (err) {
    console.error("Inventory: Failed to fetch car by ID", err);
    return null;
  }
}

export async function addCar(car: Partial<Car>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...car,
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function updateCar(id: string, car: Partial<Car>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), car);
}

export async function deleteCar(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
