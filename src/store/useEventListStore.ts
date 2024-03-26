import create from 'zustand';

export interface EventList {
    title: string;
    startDate:Date;
    endDate:Date;
}

interface EventListStore {
    eventList: EventList[];
    setEventList: (eventList: EventList[]) => void;
}

export const useEventListStore = create<EventListStore>((set) => ({
    eventList:[],
    setEventList: (eventList) => set({eventList})
}))