import axios from "axios";
import { EventList } from "../store/useEventListStore";
import { MyEventList } from '../store/useMyevent';
import { auth, database} from './firebase-config';
import { DocumentData, addDoc, collection, deleteDoc, doc, getDocs, query, where} from 'firebase/firestore'

const myEvRef = collection(database, 'myeventList');

export const fetchEventList = async(search: string): Promise<EventList[]> => {
    const response = await axios.get(`https://itunes.apple.com/search?term=${search}`);
    const eventList: EventList[] = response.data.results;
    return eventList;
}

export const fetchMyEventList = async(): Promise<MyEventList[]> => {
    const q = query(myEvRef, where('uid', "==", auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        const data = doc.data() as MyEventList;
        return {...data, id: doc.id}
    })
}

export const addEventToMyEventList = async(event : Omit<MyEventList, 'id'>): Promise<DocumentData> => {
    return await addDoc(myEvRef, event);
}

export const removeFromMyPlaylist = async(id: string): Promise<void> => {
    const useDoc = doc(database, 'myeventList', id);
    await deleteDoc(useDoc);
}