import create from 'zustand';

export interface MyEventList {
    id: string;
    endDate: {
        dateString: string;
        day: number;
        month: number;
        timestamp: number;
        year: number;
    };
    startDate: {
        dateString: string;
        day: number;
        month: number;
        timestamp: number;
        year: number;
    };
    title: string;
    uid: string;
}

interface MyEventListStore {
    myeventList: MyEventList[];
    setMyEventList: (eventList: MyEventList[]) => void;
    addEventToEventList: (event: MyEventList) => void;
}

export const useMyevent = create<MyEventListStore>((set) => ({
    myeventList:[],
    setMyEventList: (myeventList) => set({myeventList}),
    addEventToEventList: (event) => set((state) => ({myeventList: [...state.myeventList, event]}))
}))