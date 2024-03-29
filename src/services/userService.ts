import { database } from '../services/firebase-config';
import {
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import { User } from '../store/useUserStore';

const accountsCollectionRef = collection(database, 'accounts');

export const getUsersByFirstNameAndLastName = async (firstName: string, lastName: string): Promise<User[]> => {
    const q = query(accountsCollectionRef, where('firstName', '==', firstName), where('lastName', '==', lastName));
    const querySnapshot = await getDocs(q);
    const users: User[] = [];

    
    querySnapshot.forEach((doc) => {
        const data = doc.data() as User;
        users.push({ ...data, uid: data.uid });
    });

    return users;
};
