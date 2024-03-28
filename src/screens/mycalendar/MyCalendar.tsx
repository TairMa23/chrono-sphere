import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from "../../services/appStyle";
import PopUp from '../../components/PopUp';
import { fetchMyEventList } from '../../services/eventListService';

export default function MyCalendar() {
  const [selected, setSelected] = useState('');
  const [events, setEvents] = useState({

    // '2024-03-20': { selected: true, marked: true, selectedColor: 'blue' },
    // '2024-03-23': { selected: true, marked: true, selectedColor: 'pink' },
  });
  useEffect(() => {
    // Fetch events from Firestore when the component mounts
    const fetchEvents = async () => {
      try {
        const myEvents = await fetchMyEventList();

        const markedEvents = {};
        myEvents.forEach(event => {
          // console.log(".....myevent", JSON.stringify(event, null, 2));
          console.log("event.date", event)
          markedEvents[event.startDate.dateString] = {
            selected: true,
            marked: true,
            selectedColor: 'green',
          };
        });
        console.log("@@@@setevent:", markedEvents)
        setEvents(markedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Call the fetchEvents function
  }, []);


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
          console.log("day press: ",day.dateString)
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
