import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { fetchEventList } from '../services/eventListService';
import { useEventListStore } from '../store/useEventListStore';

export const eventListConnector = () => {
    const {data: eventList} = useQuery('eventLists', fetchEventList);
    const setEventList = useEventListStore(state => state.setEventList);

    useEffect(() => {
        if(eventList){
            setEventList(eventList);
        }
    },[eventList,setEventList])
}