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
export const fetchMyEventList = async (): Promise<MyEventList[]> => {
    const q = query(myEvRef, where('uid', '==', auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        const data = doc.data() as MyEventList;

        // Convert startDate and endDate to the desired format
        const formattedStartDate = convertToDateObject(data.startDate);
        const formattedEndDate = convertToDateObject(data.endDate);

        return { ...data, id: doc.id, startDate: formattedStartDate, endDate: formattedEndDate };
    });
};

// Helper function to convert Firestore timestamp to Date object
const convertToDateObject = (timestamp: { seconds: number; nanoseconds: number }) => {
    const dateObj = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return {
        dateString: formatDate(dateObj),
        day: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        timestamp: dateObj.getTime(),
        year: dateObj.getFullYear(),
    };
};

// Helper function to format date to 'YYYY-MM-DD'
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
export const addEventToMyEventList = async(event : Omit<MyEventList, 'id'>): Promise<DocumentData> => {
    return await addDoc(myEvRef, event);
}

export const removeFromMyPlaylist = async(id: string): Promise<void> => {
    const useDoc = doc(database, 'myeventList', id);
    await deleteDoc(useDoc);
}