import axios from "axios";
import { Group, GroupMember } from "../store/useGroups";
import { auth, database } from './firebase-config';
import { DocumentData, addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'

const groupRef = collection(database, 'groups');

export const fetchGroupList = async (search: string): Promise<Group[]> => {
    // Example fetch from an API
    const response = await axios.get(`https://api.example.com/groups?search=${search}`);
    const groupList: Group[] = response.data.groups;
    return groupList;
}


export const fetchMyGroups = async (): Promise<Group[]> => {
    const q = query(groupRef, where('members', 'array-contains', auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data() as Group;
        return { ...data, id: doc.id, members: data.members as GroupMember[] };
    });
};

export const addGroup = async (group: Omit<Group, 'id'>): Promise<DocumentData> => {
    return await addDoc(groupRef, group);
}

export const deleteGroup = async (id: string): Promise<void> => {
    const groupDoc = doc(database, 'groups', id);
    await deleteDoc(groupDoc);
}
