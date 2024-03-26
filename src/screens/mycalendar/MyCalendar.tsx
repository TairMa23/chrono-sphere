import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from "../../services/appStyle";
import PopUp from '../../components/PopUp';

export default function MyCalendar() {
    const [selected, setSelected] = useState('');
    const [events, setEvents] = useState({
        '2024-03-20': { selected: true, marked: true, selectedColor: 'blue' },
        '2024-03-23': { selected: true, marked: true, selectedColor: 'pink' },
    });

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
              height: 300,
              marginTop: 20,
              padding: 10,
            }}
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            markedDates={{
              ...events,
              [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'orange' }
            }}
          />

          <Button title="Add Event" onPress={addEvent} />
          <PopUp/>
       
       </View>

    );
}
