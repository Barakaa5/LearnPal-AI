import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'src/config/firebase';

interface UserData {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

// Function to add data
export async function createDoc(path: string, data: unknown) {
  try {
    // Reference to your collection, change 'your_collection' to your actual collection name
    const docRef = await addDoc(collection(db, path), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function addUserDocOnSignIn(
  email: string,
  userData: UserData
): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', email);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      await setDoc(userDocRef, userData);
      console.log('New user created successfully');
    }
  } catch (error) {
    console.error('Error creating or updating user: ', error);
  }
}

// Function to update user data
export async function updateUser(email: string, newData: any) {
  try {
    const userDocRef = doc(db, 'users', email);
    await updateDoc(userDocRef, newData);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user: ', error);
  }
}
export async function addPlanToUser(email: string, plan: any) {
  try {
    const userDocRef = doc(db, 'users', email);
    const docSnap = await getDoc(userDocRef);
    const data = docSnap.data();
    if (data?.plans?.length > 0) {
      await updateDoc(userDocRef, { plans: [...data.plans, plan] });
    } else {
      await updateDoc(userDocRef, { plans: [plan] });
    }
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user: ', error);
  }
}
