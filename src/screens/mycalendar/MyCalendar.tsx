import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from "../../services/appStyle";
import PopUp from '../../components/PopUp';
import { fetchMyEventList } from '../../services/eventListService';
import { useEventListStore } from '../../store/useEventListStore';
import { useMyevent } from '../../store/useMyevent';

export default function MyCalendar() {
  const [selected, setSelected] = useState('');
  const [events, setEvents] = useState({});
  const setMyEventList = useMyevent((state) => state.setMyEventList);
  const myEventList = useMyevent((state) => state.myeventList);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const myEvents = await fetchMyEventList();
        setMyEventList(myEvents)
        const markedEvents = {};
        myEvents.forEach(event => {
          markedEvents[event.startDate.dateString] = {
            selected: true,
            marked: true,
            selectedColor: 'green',
          };
        });
        setEvents(markedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    //console.log("add event")
    fetchEvents(); // Call the fetchEvents function
  }, [myEventList]);


  const addEvent = () => {
    const newEventDate = '2024-03-25'; // Example new event date
    const newEvent = { selected: true, marked: true, selectedColor: 'green' }; // Example new event properties
    setEvents(prevEvents => ({
      ...prevEvents,
      [newEventDate]: newEvent,
    }));
  };

  return (


    <View style={styles.container_app}>

      <Calendar
        style={{
          height: 400,
          marginTop: 40,
          padding: 30,
        }}
        onDayPress={day => {
          console.log("day press: ", day.dateString)
          setSelected(day.dateString);
        }}
        markedDates={{
          ...events,
          [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'orange' }
        }}
      />


      <PopUp />

    </View>

  );
}