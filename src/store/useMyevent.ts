import create from 'zustand';

export interface MyEventList {
    title: string;
    startDate:Date;
    endDate:Date;
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