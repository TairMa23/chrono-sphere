import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styles from "../../services/appStyle"
import DropdownComponent from "../../components/DropdownComponent"
import { useMyevent } from "../../store/useMyevent";
import { fetchMyEventListByUid } from "../../services/eventListService";
import { auth } from "../../services/firebase-config";


const Dashboard = () => {
    const [selected, setSelected] = useState('');
    const [events, setEvents] = useState({});
    const setMyEventList = useMyevent((state) => state.setMyEventList);
    const myEventList = useMyevent((state) => state.myeventList);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const myEvents = await fetchMyEventListByUid(auth.currentUser?.uid);
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
            <DropdownComponent />

        </View>
    )
}
export const screenOptions = (navData) => {
    return {
        headerTitle: 'Dashboard',
        headerRight: () => (
            <Ionicons
                onPress={() => { navData.navigation.navigate('settings') }}
                name='options'
                size={24} />
        )


    }
}

export default Dashboard;